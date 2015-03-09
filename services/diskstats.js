var service = function(timer, getData, send) {

	getData("/proc/diskstats", 2048, timer, function(data)
	{
		var disk = {};
		var tab = data.split("\n");
		var i = 0;
		while (tab[i] != undefined && tab[i][0] != "\u0000" && tab[i][0] == " ")
		{
			if (tab[i].indexOf('ram') == -1 && tab[i].indexOf('loop') == -1)
			{
				var tmp2 = new Array();
				var tmp = tab[i].split(" ");
				var j = 0;
				while (tmp[j] != undefined)
				{
					if (tmp[j] != "")
						tmp2.push(tmp[j]);
					j++;
				}
				var tmpdisk =
				{
					"major":tmp2[0],
					"minor":tmp2[1],
					"device":tmp2[2],
					"success_read":tmp2[3],
					"merged_read":tmp2[4],
					"sector_read":tmp2[5],
					"time_read":tmp2[6],
					"success_write":tmp2[7],
					"merged_write":tmp2[8],
					"sector_write":tmp2[9],
					"time_write":tmp2[10],
					"current_io":tmp2[11],
					"time_io":tmp2[12],
					"weighted_io":tmp2[13]
				};
				disk[tmpdisk['device']] = tmpdisk;
			}
			i++;
		}
		send("diskstats", disk);
		/*console.log("--- Disk Info ---");
		for (var device in disk)
		{
			console.log("Disk : "+device);
			console.log("Read : "+disk[device]['success_read']);
			console.log("Time : "+disk[device]['time_read']);
			console.log("Write : "+disk[device]['success_write']);
			console.log("Time : "+disk[device]['time_write']);
			console.log("Current IO : "+disk[device]['current_io']);
		}*/
	});

	return true;
};

module.exports = service;