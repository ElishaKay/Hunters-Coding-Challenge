const fs = require('fs'),
    path = require('path'),
    util = require('util'),
    testCasesFilePath = path.join(__dirname, 'task-1.txt'),
    resultsFilePath = path.join(__dirname, 'results.txt');

inspect = (note, elem) => {
	console.log(note, util.inspect(elem, {showHidden: false, depth: null}))
}

let balanceStatus = [];

fs.readFile(testCasesFilePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
        parseInput(data);
    } else {
        console.log(err);
    }
});


parseInput=(string)=>{
	let arr = string.split("\n");
	let numOfTestCases = arr.slice(0,1);

	// let config = 'NBH'

	// inspect('arr:', arr)
	inspect('numOfTestCases:', numOfTestCases)
	data = arr.slice(1);

	inspect('data:', data)

	N = config[0][0];
	B = config[0][2];
	H = config[0][4];
}

calculateMaxHunters=(N,B,H)=>{
	let grid = createEmptyGrid(N);
	grid = addDefaultBoxesAndHunters(grid, B, H);
	grid = fillAllEmptySpaces(grid);
	let weightPerSide = calculateWeightPerSide(grid, N);
	let balanceReport = searchForImbalance(weightPerSide);
}

createEmptyGrid=(N)=>{
	// create array of objects based on the N of the test-case
	let grid = [];
	for (let x = 1; x <= N; x++) { 
		for (let y = 1; y <= N; y++) { 
	 		grid.push({x, y, weight:0, empty: true, glued: false});
		}
	}
	return grid;
}


addDefaultBoxesAndHunters=(grid, B, H)=>{
	//edit the previously created template grid - include the Boxes and Hunters of the given test case
	for (let i = 0; i < data.length; i++) { 
	  let x=data[i][0];
	  let y=data[i][2];
	  let weight = i < B ? 0 : 1;
	  data[i] = {x, y, weight, empty: false, glued: true};

	  //replace the relevant element within the grid:
	  const seatIndex = grid.findIndex((seat) => seat.x == x && seat.y == y)
	  grid[seatIndex] = data[i];
	}
	return grid;
}



fillAllEmptySpaces=(grid)=>{
	// map through the grid object
	// and put hunters in all the empty seats
	grid = grid.map((seat)=> {
		if(seat.empty){
			seat.empty =  false; 
		    seat.weight = 1;
		} 
		return seat;
	})

	return grid;
	inspect('grid after empty seats have been taken by hunters:',grid);
}


const calculateWeightPerSide = (grid, N) => {
	//reset weight vars
	weightPerSide = {};
	leftSideWeight = 0;
	rightSideWeight = 0;
	frontSideWeight = 0;
	backSideWeight = 0;
	// calculate the weight balance
	for (let i = 0; i < grid.length; i++) { 
		let {weight, x, y} = grid[i]; 
		if(weight > 0){
		  //which quadrant does it belong to?
		  //top-left quadrant
		  if(x <= N/2 && y <= N/2){
			leftSideWeight++;
			frontSideWeight++;	  	
		  } /*bottom-left quadrant*/ else if(x <= N/2 && y > N/2){
		  	leftSideWeight++;
		  	backSideWeight++;
		  } /*top-right quadrant*/ else if(x > N/2 && y <= N/2){
		  	rightSideWeight++;
		  	frontSideWeight++;	
		  } else /*bottom-right quadrant*/ {
		    rightSideWeight++;
		  	backSideWeight++;
		  }
		}
	}
	
	// console.log('leftSideWeight: ',leftSideWeight);
	// console.log('rightSideWeight: ',rightSideWeight);
	// console.log('frontSideWeight: ',frontSideWeight);
	// console.log('backSideWeight: ',backSideWeight);
	weightPerSide = {leftSideWeight, rightSideWeight, frontSideWeight, backSideWeight};
	return weightPerSide;
}


const searchForImbalance = (weightPerSide) => {
	let {leftSideWeight, rightSideWeight, frontSideWeight, backSideWeight} = weightPerSide;
	let leftRightBalance = leftSideWeight - rightSideWeight;
	let frontBackBalance = frontSideWeight - backSideWeight;

	//check left right-balance
	if(leftRightBalance != 0){
		status.push({heavierSide: leftRightBalance > 0 ? 'left side' : 'right side',
					 byHowMany: Math.abs(leftRightBalance)});
	} 

	if(frontBackBalance != 0){
		status.push({heavierSide: frontBackBalance > 0 ? 'front side' : 'back side',
					 byHowMany: Math.abs(frontBackBalance)});
	}


	removeLoad(balanceStatus.heavierSide);
}

console.log('balanceStatus: ',balanceStatus)

const removeLoad = (section) => {
	if(balanceStatus[0].byHowMany){	
		for (let i = 0; i < balanceStatus[0].byHowMany;) {
			const seatIndex = grid.findIndex((seat) => !seat.glued && updateRelevantSeats(seat, section) && seat.weight > 0);
			console.log('ran hunter removal process on: ', grid[seatIndex]);
				if(seatIndex){
					grid[seatIndex] = {...grid[seatIndex], empty: true, weight: 0}
					i++;
				}
		}
	}

	weightCalc();
}

updateRelevantSeats = (seat, section) => {
	if(section==='left side'){
		return seat.x <= N/2
	} else if(section==='right side'){
		return seat.x > N/2
	} else if(section==='front side'){
		return seat.y <= N/2
	} else if(section==='back side'){
		return seat.y > N/2
	}
}



logResults = (grid) => {
	let testResult = grid.filter((seat)=>!seat.glued && seat.weight>0).length;
	fs.writeFile(resultsFilePath, testResult, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("The file was saved!");
	}); 
}

logResults(grid);