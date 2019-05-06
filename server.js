const fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'task-1.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        console.log('received data: ' + data);
        
    } else {
        console.log(err);
    }
});