var fs = require("fs");
var io = require('socket.io')(4321);

const TIMER = 1000;

var getData = function (path, size, timer, callback)
{
	log.debug("Set listener " + path + " ("+(1000/timer)+"/sec)");

	fs.open(path, "r", function(err, fd)
	{
		var buff = new Buffer(size);
		setInterval(function()
		{
			fs.read(fd, buff, 0, size, 0, function(err, bytes, buffer)
			{
				callback(buffer.toString());
			});
		}, timer);
	});
}

var log = {};
log.error = function(message)
{
	console.log("\u001b[31m[ERROR]", message, "\u001b[39m");
}

log.notice = function(message)
{
	console.log("\u001b[34m[NOTICE]",message, "\u001b[39m");
}

log.debug = function(message)
{
	console.log("\u001b[34m[DEBUG]", message, "\u001b[39m");
}

log.success = function(message)
{
	console.log("\u001b[32m[OK]", message, "\u001b[39m");
}

var send = function(channel, val)
{
	var data = {
		date : Date.now(),
		service : val,
		timer: TIMER
	}

	io.to(channel).emit(channel, data);
}


/**
 * Load services
 */
fs.readdir("./services", function(err, files) {
	if(err) throw err;

	var channels = [];

	var i = 0;
	while(files[i] != undefined)
	{
		if(!require("./services/" + files[i])(TIMER, getData, send, log))
		{
			log.error(files[i] + " error");

			process.exit(1);
		}

		channels.push(files[i].replace(".js", ""));
		log.success(files[i] + " successfully loaded");

		i++;
	}

	io.on('connection', function(socket)
	{
		socket.on('info', function()
		{
			channels = ["meminfo"];

			socket.emit("info", channels);
		});
		socket.on('join', function(room)
		{
			socket.join(room);
		});
		socket.on('leave', function(room)
		{
			socket.leave(room);
		});
	});
})