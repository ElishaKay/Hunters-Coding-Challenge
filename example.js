
let leftSideWeight = 0;
let rightSideWeight = 0;
let frontSideWeight = 0;
let backSideWeight = 0;


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
 		grid.push({x, y, weight:0, empty: true});
	}
}

//create array with filled Spaces
//calculate weight by quadrants
for (let i = 0; i < data.length; i++) { 
  let x=data[i][0];
  let y=data[i][2];
  let weight = i < B ? 0 : 1;
  data[i] = {x, y, weight, empty: false};

  //replace the relevant element within the grid:
  const seatIndex = grid.findIndex((seat) => seat.x == x && seat.y == y)
  grid[seatIndex] = data[i];

  // calculate the weight balance
  //is it a hunter?
  if(i >= B){
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

// console.log('data after segmentation:',data);
console.log('grid before adding hunters to empty seats:',grid);

console.log('leftSideWeight: ',leftSideWeight);
console.log('rightSideWeight: ',rightSideWeight);
console.log('frontSideWeight: ',frontSideWeight);
console.log('backSideWeight: ',backSideWeight);

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


