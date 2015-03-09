var service = function(timer, getData, send) {

	getData("/proc/uptime", 32, timer, function(data)
	{
		var tab = data.split(" ");
		var run = parseFloat(tab[0]);
		var idle = parseFloat(tab[1]);
		send("uptime", {"run":run,"idle":idle});
		/*console.log("--- Processor ---");
		console.log("Running : "+run);
		console.log("Idle : "+idle);*/
	});

	return true;
};

module.exports = service;