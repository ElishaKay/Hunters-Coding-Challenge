
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
  console.log('data[i]: ',data[i]);
  data[i] = {x, y, empty: false, weight: i < B ? 0: 1};
  //which quadrant does it belong to?
  //top-left quadrant
 //  if(data[i].x <= N && data[i].y <= N){
	// leftSideWeight++;
	// frontSideWeight++;	  	
 //  } /*top-left quadrant*/ else if(data[i].x <= N && data[i].y <= N){

 //  }else if(){}leftSideWeight = 2
 //  else if(){
 //  	backSideWeight = 2
 //  }
 //  rightSideWeight = 2
 //  frontSideWeight = 0

}

console.log('data after segmentation:',data);
//An array of objects:
//[{x: 1, y: 1, empty: true/false, weight: 0/1}, {...}, ...]

