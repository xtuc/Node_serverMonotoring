var service = function(timer, getData, send) {
	
	getData("/proc/swaps", 512, timer, function(data)
	{
		var swaps = new Array();
		var tab = data.split("\n");
		var i = 1;
		while (tab[i] != undefined && tab[i][0] == '/')
		{
			var tmp = tab[i].split(" ");
			var filename = tmp[0];
			var j = 1;
			while (tmp[j] != undefined && tmp[j] == "")
				j++;
			if (tmp[j] != undefined)
			{
				tmp = tmp[j].split("\t");
				swap = {
					"filename":filename,
					"type":tmp[0],
					"size":tmp[1],
					"used":tmp[2],
					"priority":tmp[3],
				};
				swaps.push(swap);
			}
			i++;
		}
		
		send("swaps", swaps);
		/*console.log("--- SWAPS ---");
		var i = 0;
		while (swaps[i] != undefined)
		{
			console.log("Filename : "+swaps[i].filename);
			console.log("Used : "+(swaps[i].used * 100 / swaps[i].size).toFixed(2)+"%");
			i++;
		}*/
	});

	return true;
};

module.exports = service;