var service = function(timer, getData, send) {

	var stat = {};
	getData("/proc/stat", 2048, timer, function(data)
	{
		var lines = data.split("\n");
		var i = 0;
		while (lines[i] != undefined)
		{
			if (lines[i].indexOf("cpu") != -1)
			{
				lines[i] = lines[i].replace('  ', ' ');
				var tab = lines[i].split(' ');
				var cpu = {
					"name":tab[0],
					"user":parseInt(tab[1]),
					"nice":parseInt(tab[2]),
					"system":parseInt(tab[3]),
					"idle":parseInt(tab[4]),
					"iowait":parseInt(tab[5]),
					"irq":parseInt(tab[6]),
					"softirq":parseInt(tab[7]),
					"steal":parseInt(tab[8]),
					"guest":parseInt(tab[9]),
					"guest_nice":parseInt(tab[10]),
				};
				cpu.total = cpu.user + cpu.nice + cpu.system + cpu.idle + cpu.iowait + cpu.irq + cpu.softirq;
				var old = stat[cpu.name];
				if (old)
				{
					var diffIdle = cpu.idle - old.idle;
					var diffTotal = cpu.total - old.total;
					cpu.usage = Math.min(100, parseFloat((100 * (diffTotal - diffIdle) / diffTotal)));
				}
				else
					cpu.usage = 0;
				stat[cpu.name] = cpu;
			}
			i++;
		}
		send("stat", stat);
		/*console.log("--- CPU Usage ---");
		for (var cpu in stat)
		{
			console.log("CPU : "+cpu);
			console.log("Usage : "+stat[cpu].usage.toFixed(2)+"%");
		}*/
	});

	return true;
};

module.exports = service;