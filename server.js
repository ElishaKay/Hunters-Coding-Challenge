const fs = require('fs'),
    path = require('path'),
    util = require('util'),    
    filePath = path.join(__dirname, 'task-1.txt');

inspect = (note, elem) => {
	console.log(note, util.inspect(elem, {showHidden: false, depth: null}))
}

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        parseInput(data);
        
    } else {
        console.log(err);
    }
});

parseInput=(string)=>{
	let arr = string.split("\n");
	let numOfTestCases = arr.slice(0,1);
	data = arr.slice(1);
	let configs = [];
	// let configs = data.split("\n");

	// inspect('data:', data)
	inspect('numOfTestCases:', numOfTestCases)
	
	for (let i = 0; configs.length < numOfTestCases;) {
		data[i] = data[i].split(" ");
		N = data[i][0];
		B = data[i][1];
		H = data[i][2];
		console.log(N, B, H)
		configs.push(`${N} ${B} ${H}`)
		i+=(Number(B)+Number(H)+1);
		console.log('i=', i)	
	}

	console.log('configs',configs)
	console.log('configs.length: ',configs.length)
	// inspect('configs:', configs)

}