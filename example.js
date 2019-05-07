
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

// console.log('string:',string);

let arr = string.split("\n");

// console.log('arr',arr);

let config = arr.slice(0,1);
data = arr.slice(1);

// console.log('data after slice',data);
// console.log('config',config)

let N = config[0][0];
let B = config[0][2];
let H = config[0][4];

for (let i = 0; i < data.length; i++) { 
  let x=data[i][0];
  let y=data[i][2];
  let weight = i < B ? 0 : 1;
  console.log('data[i]: ',data[i]);
  data[i] = {x, y, weight, empty: false};
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
  	console.log('leftSideWeight: ',leftSideWeight);
	console.log('rightSideWeight: ',rightSideWeight);
	console.log('frontSideWeight: ',frontSideWeight);
	console.log('backSideWeight: ',backSideWeight);
}

console.log('data after segmentation:',data);

console.log('leftSideWeight: ',leftSideWeight);
console.log('rightSideWeight: ',rightSideWeight);
console.log('frontSideWeight: ',frontSideWeight);
console.log('backSideWeight: ',backSideWeight);
//An array of objects:
//[{x: 1, y: 1, empty: true/false, weight: 0/1}, {...}, ...]

