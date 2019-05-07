const fs = require('fs'),
    path = require('path'),    
    filePath = path.join(__dirname, 'results.txt');

let leftSideWeight = 0;
let rightSideWeight = 0;
let frontSideWeight = 0;
let backSideWeight = 0;
let balanceStatus = [];

let string = `4 4 4
1 1
2 1
3 1
4 1
1 4
2 4
3 4
4 4`

let arr = string.split("\n");

let config = arr.slice(0,1);
data = arr.slice(1);

let N = config[0][0];
let B = config[0][2];
let H = config[0][4];

// create 4-by-4 array of objects
let grid = [];
for (let x = 1; x <= N; x++) { 
	for (let y = 1; y <= N; y++) { 
 		grid.push({x, y, weight:0, empty: true, glued: false});
	}
}

//create master array with filled Spaces
for (let i = 0; i < data.length; i++) { 
  let x=data[i][0];
  let y=data[i][2];
  let weight = i < B ? 0 : 1;
  data[i] = {x, y, weight, empty: false, glued: true};

  //replace the relevant element within the grid:
  const seatIndex = grid.findIndex((seat) => seat.x == x && seat.y == y)
  grid[seatIndex] = data[i];
}

// Step 1: map through the grid object
// and put hunters in all the empty seats
grid = grid.map((seat)=> {
	if(seat.empty){
		seat.empty =  false; 
	    seat.weight = 1;
	} 
	return seat;
})

console.log('grid after empty seats have been taken by hunters:',grid);
//compare filled spaces with grid.

//function to calculate weight by quadrants
const weightCalc = () => {
	//reset weight vars
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
	
	console.log('leftSideWeight: ',leftSideWeight);
	console.log('rightSideWeight: ',rightSideWeight);
	console.log('frontSideWeight: ',frontSideWeight);
	console.log('backSideWeight: ',backSideWeight);
}

weightCalc();

const searchForImbalance = () => {
	let leftRightBalance = leftSideWeight - rightSideWeight;
	let frontBackBalance = frontSideWeight - backSideWeight;
	let status = [];

	//check left right-balance
	if(leftRightBalance != 0){
		status.push({heavierSide: leftRightBalance > 0 ? 'left side' : 'right side',
					 byHowMany: Math.abs(leftRightBalance)});
	} 

	if(frontBackBalance != 0){
		status.push({heavierSide: frontBackBalance > 0 ? 'front side' : 'back side',
					 byHowMany: Math.abs(frontBackBalance)});
	}

	return status;
}

balanceStatus = searchForImbalance();

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


removeLoad(balanceStatus[0].heavierSide);

