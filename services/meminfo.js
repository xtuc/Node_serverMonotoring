var service = function(timer, getData, send) {

	getData("/proc/meminfo", 2048, timer, function(data)
	{
		var memory = {};
		var tab = data.split("\n");
		var i = 0;
		while (tab[i] != undefined && tab[i][0] != "\u0000")
		{
			var tmp = tab[i].split(":");
			if (tmp[1] != undefined)
				memory[tmp[0]] = parseInt(tmp[1]);
			i++;
		}
		memory['MemUsed'] = memory['MemTotal'] - memory['MemFree'];
		send("meminfo", memory);
		/*console.log("--- Memory ---");
		console.log("Total : "+memory['MemTotal']);
		console.log("Free : "+memory['MemFree']);
		console.log("Used : "+memory['MemUsed']);*/
	});

	return true;
};

module.exports = service;