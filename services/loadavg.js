var service = function(timer, getData, send) {

	getData("/proc/loadavg", 32, timer, function(data)
	{
		var tab = data.split(" ");
		var load = {};
		load['1min'] = tab[0];
		load['5min'] = tab[1];
		load['15min'] = tab[2];
		var tmp = tab[3].split('/');
		load['runnable_kernel'] = tmp[0];
		load['entities_number'] = tmp[1];
		load['last_pid'] = parseInt(tab[4]);
		send("loadavg", load);
		/*console.log("--- Load Average ---");
		console.log("1min : "+load['1min']);
		console.log("5min : "+load['5min']);
		console.log("15min : "+load['15min']);
		console.log("Entities : "+load['entities_number']);
		console.log("Last PID : "+load['last_pid']);*/
	});

	return true;
};

module.exports = service;