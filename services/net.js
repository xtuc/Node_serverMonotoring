var service = function(timer, getData, send) {
	
	getData("/proc/net/dev", 512, timer, function(data)
	{
		var netdev = {};
		var tab = data.split("\n");
		var i = 0;
		while (tab[i] != undefined)
		{
			if (tab[i].indexOf('eth') != -1)
			{
				var nettmp = new Array();
				var tmp = tab[i].split(' ');
				var j = 0;
				while (tmp[j] != undefined)
				{
					if (tmp[j] != "")
					{
						nettmp.push(tmp[j]);
					}
					j++;
				}
				netdev[nettmp[0].replace(':', '')] = {
					"receive":{
						"bytes":nettmp[1],
						"packets":nettmp[2],
						"errs":nettmp[3],
						"drop":nettmp[4],
						"fifo":nettmp[5],
						"frame":nettmp[6],
						"compressed":nettmp[7],
						"multicast":nettmp[8]
					},
					"transmit":{
						"bytes":nettmp[9],
						"packets":nettmp[10],
						"errs":nettmp[11],
						"drop":nettmp[12],
						"fifo":nettmp[13],
						"colls":nettmp[14],
						"carrier":nettmp[15],
						"compressed":nettmp[16]
					}
				};
			}
			i++;
		}
		send("net", netdev);
		/*console.log("--- Network Status ---");
		for (var interf in netdev)
		{
			console.log("Interface : "+interf);
			console.log(">>> Bytes : "+netdev[interf]['receive']['bytes']);
			console.log(">>> Packets : "+netdev[interf]['receive']['packets']);
			console.log(">>> Errors : "+netdev[interf]['receive']['errs']);
			console.log(">>> Drop : "+netdev[interf]['receive']['drop']);
			console.log("<<< Bytes : "+netdev[interf]['transmit']['bytes']);
			console.log("<<< Packets : "+netdev[interf]['transmit']['packets']);
			console.log("<<< Errors : "+netdev[interf]['transmit']['errs']);
			console.log("<<< Drop : "+netdev[interf]['transmit']['drop']);
		}*/
	});

	return true;
};

module.exports = service;