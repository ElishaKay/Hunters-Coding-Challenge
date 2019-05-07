const fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'results.txt');

fs.writeFile(filePath, "Hey there!", function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 