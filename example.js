
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

//create array with filled Spaces
for (let i = 0; i < data.length; i++) { 
  let x=data[i][0];
  let y=data[i][2];
  let weight = i < B ? 0 : 1;
  data[i] = {x, y, weight, empty: false, glued: true};

  //replace the relevant element within the grid:
  const seatIndex = grid.findIndex((seat) => seat.x == x && seat.y == y)
  grid[seatIndex] = data[i];
}

// console.log('data after segmentation:',data);
console.log('grid before adding hunters to empty seats:',grid);

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
//compare filled spaces with grid.

const findHeaviestSection = () => {
	let leftRightBalance = leftSideWeight - rightSideWeight;
	let frontBackBalance = frontSideWeight - backSideWeight;
	let status = [];

	//check left right-balance
	if(leftRightBalance === 0){
		status.push({heavierSide: 'none', note:"left-right weight is perfectly balanced"});
	} else {
		status.push({heavierSide: leftRightBalance > 0 ? 'left side' : 'right side',
					 byHowMany: Math.abs(leftRightBalance)});
	}

	if(frontBackBalance === 0){
		status.push({heavierSide: 'none', note: "front-back weight is perfectly balanced"});
	} else {
		status.push({heavierSide: frontBackBalance > 0 ? 'front side' : 'back side',
					 byHowMany: Math.abs(frontBackBalance)});
	}

	return status;
}

balanceStatus = findHeaviestSection();

console.log('balanceStatus: ',balanceStatus)
