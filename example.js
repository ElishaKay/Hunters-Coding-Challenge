const fs = require('fs'),
    path = require('path'),
    util = require('util'),
    testCasesFilePath = path.join(__dirname, 'task-1.txt'),
    resultsFilePath = path.join(__dirname, 'results.txt');

inspect = (note, elem) => {
	console.log(note, util.inspect(elem, {showHidden: false, depth: null}))
}

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
	data = arr.slice(1);
	let configs = [];
	
	for (let i = 0; configs.length < numOfTestCases;) {
		data[i] = data[i].split(" ");
		N = data[i][0];
		B = Number(data[i][1]);
		H = Number(data[i][2]);
		let end = i+B+H+1;
		let coordinates = data.slice(i+1, end);
		configs.push({N, B, H, coordinates});
		i=end;
	}

	for (let i = 0; i< 20; i++) {
		calculateMaxHunters(i+1, configs[i]);
	}
}


calculateMaxHunters=(testCaseNumber, config)=>{
	console.log(`ran calculateMaxHunters() func with testCaseNumber ${testCaseNumber}`)
	let {N,B,H,coordinates} = config;
	let grid = createEmptyGrid(N);
	grid = addDefaultBoxesAndHunters(grid, B, H, coordinates);
	console.log('grid after addDefaultBoxesAndHunters func: ', grid);

	grid = fillAllEmptySpaces(grid);
	
	console.log('grid after fillAllEmptySpaces func: ', grid);

	let weightPerSide = calculateWeightPerSide(grid, N);
	console.log('weightPerSide: ',weightPerSide)

	let balanceReport = generateBalanceReport(weightPerSide);
	console.log('balanceReport: ',balanceReport)

	grid = removeLoad(grid, balanceReport, N);
	

	logResults(grid, testCaseNumber);
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


addDefaultBoxesAndHunters=(grid, B, H, coordinates)=>{
	//edit the previously created template grid - include the Boxes and Hunters of the given test case
	for (let i = 0; i < coordinates.length; i++) { 
	  let x=coordinates[i][0];
	  let y=coordinates[i][2];
	  let weight = i < B ? 0 : 1;
	  coordinates[i] = {x, y, weight, empty: false, glued: true};

	  //replace the relevant element within the grid:
	  const seatIndex = grid.findIndex((seat) => seat.x == x && seat.y == y)
	  grid[seatIndex] = coordinates[i];
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


const generateBalanceReport = (weightPerSide) => {
	let balanceReport = [];
	let {leftSideWeight, rightSideWeight, frontSideWeight, backSideWeight} = weightPerSide;
	let leftRightBalance = leftSideWeight - rightSideWeight;
	let frontBackBalance = frontSideWeight - backSideWeight;

	//check left right-balance
	if(leftRightBalance != 0){
		balanceReport.push({heavierSide: leftRightBalance > 0 ? 'left side' : 'right side',
					 byHowMany: Math.abs(leftRightBalance)});
	} 

	if(frontBackBalance != 0){
		balanceReport.push({heavierSide: frontBackBalance > 0 ? 'front side' : 'back side',
					 byHowMany: Math.abs(frontBackBalance)});
	}

	return balanceReport;
}


const removeLoad = (grid, balanceReport, N) => {
	if(balanceReport.length>0){
		let filterFunc;

		let heavySides = balanceReport.map(a => a.heavierSide);
		console.log('heavySides', heavySides);
		console.log('balanceReport in removeLoad func',balanceReport)
	
		/*top-left quadrant*/
		if(heavySides.includes('left side') && heavySides.includes('front side')) {
			filterFunc = ({x,y}, N)=> x <= N/2 && y <= N/2  	
		} /*bottom-left quadrant*/ else if(heavySides.includes('left side') && heavySides.includes('back side')){
			filterFunc = ({x,y}, N)=> x <= N/2 && y > N/2
		} /*top-right quadrant*/ else if(heavySides.includes('right side') && heavySides.includes('front side') ){
			filterFunc = ({x,y}, N)=> x > N/2 && y <= N/2
		} /*bottom-right quadrant*/ else if(heavySides.includes('right side') && heavySides.includes('back side') ){
			filterFunc = ({x,y}, N)=>  x > N/2 && y > N/2
		} else if(heavySides.includes('left side')){
			filterFunc = ({x,y}, N)=> x <= N/2
		} else if(heavySides.includes('right side')){
			filterFunc = ({x,y}, N)=> x > N/2
		} else if(heavySides.includes('front side')){
			filterFunc = ({x,y}, N)=> y <= N/2
		} else if(heavySides.includes('back side')){
			filterFunc = ({x,y}, N)=> y > N/2
		}

		for (let i = 0; i < balanceReport[0].byHowMany;) {
			const seatIndex = grid.findIndex((seat) => !seat.glued && filterFunc(seat, N) && seat.weight > 0);
				// console.log('ran hunter removal process on: ', grid[seatIndex]);
				
				if(seatIndex){
					grid[seatIndex] = {...grid[seatIndex], empty: true, weight: 0}
					i++;
				}
		}
	}

	return grid;
}

updateRelevantSeats = (seat, section, N) => {
	
	console.log(`ran updateRelevantSeats func with params seat: ${seat}  section: ${section}  N: ${N}`)	 


	// if(section==='left side'){
	// 	return seat.x <= N/2
	// } else if(section==='right side'){
	// 	return seat.x > N/2
	// } else if(section==='front side'){
	// 	return seat.y <= N/2
	// } else if(section==='back side'){
	// 	return seat.y > N/2
	// }
}



logResults = (grid, testCaseNumber) => {
	let testResult = grid.filter((seat)=>!seat.glued && seat.weight>0).length;
	console.log(`Case #${testCaseNumber}: ${testResult}`);
	// fs.writeFile(resultsFilePath, testResult, function(err) {
	//     if(err) {
	//         return console.log(err);
	//     }

	//     console.log("The file was saved!");
	// }); 
}

