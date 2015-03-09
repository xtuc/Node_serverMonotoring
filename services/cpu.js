var service = function(timer, getData, send) {

	getData("/proc/cpuinfo", 2048, timer, function(data)
	{
		var cpuinfo = {};
		var tab = data.split("\n");
		var i = 0;
		var proc = 0;
		while (tab[i] != undefined && tab[i].indexOf("\u0000") == -1)
		{
			var tmp = tab[i].split(":");
			if (tmp[1] != undefined)
			{
				var key = tmp[0].trim();
				var value = tmp[1].trim();
				if (key == 'processor')
					proc = value;
				if (cpuinfo[proc] == undefined)
					cpuinfo[proc] = {};
				cpuinfo[proc][key] = value;
			}
			i++;
		}

		send("cpuinfo", cpuinfo);
		/*console.log("--- CPU Info ---");
		for (var core in cpuinfo)
		{
			console.log("Processor : "+core);
			console.log("Model : "+cpuinfo[core]["model name"]);
			console.log("CPU MHz : "+cpuinfo[core]["cpu MHz"]);
			console.log("Cores : "+cpuinfo[core]["cpu cores"]);
			console.log("Physical id : "+cpuinfo[core]["physical id"]);
		}*/
	});

	return true;

};

module.exports = service;