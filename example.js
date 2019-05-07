
let string = `4 4 4
1 1
2 1
3 1
4 1
1 4
2 4
3 4
4 4`

console.log('string:',string);

let arr = string.split("\n");

console.log('arr',arr);

let config = arr.slice(0,1);
arr = arr.slice(1);

console.log('arr after slice',arr);
console.log('config',config)

