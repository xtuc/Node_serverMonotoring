var service = function(timer, getData, send) {

	var exec = require('child_process').exec;
	setInterval(function()
	{
		exec("ps -eo pcpu,pid,user,args | sort -k 1 -r", function(error, data, stderr)
		{
			var process = new Array();
			if (error === null)
			{
				var tab = data.split("\n");
				var i = 1;
				while (tab[i] != undefined && tab[i] != "")
				{
					var line = tab[i].split(" ");
					var tmp = new Array();
					var j = 0;
					while (line[j] != undefined)
					{
						if (line[j] != "")
							tmp.push(line[j]);
						j++;
					}
					var proc = {
						"cpu":tmp[0],
						"pid":tmp[1],
						"user":tmp[2],
						"command":tmp[3]
					};
					var params = new Array();
					var k = 4;
					while (tmp[k] != undefined)
					{
						params.push(tmp[k]);
						k++;
					}
					proc.params = params;
					process.push(proc);
					i++;
				}
			}
			send("cpu", process);
			/*console.log("--- PROCESSUS ---");
			var i = 0;
			while (process[i] != undefined && process[i].cpu > 1)
			{
				console.log("User : "+process[i].user);
				console.log("CPU : "+process[i].cpu);
				console.log("PID : "+process[i].pid);
				console.log("Command : "+process[i].command);
				console.log("Params : "+process[i].params.join(' '));
				i++;
			}*/
		});
	}, timer);

	return true;
};

module.exports = service;