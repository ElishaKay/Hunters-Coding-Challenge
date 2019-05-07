Intuit Coding Challenge

https://intuit.app.box.com/s/nicki9h5ra2qw0p8f1xzs5vzdlwzw70s

Input:

Your input is guaranteed to be valid and you don’t need to implement input validation.

The first line of the input gives the number of test cases.

Each test case: -Starts with 1 line containing three integers -“NBH”, where 

N is the length and width of the magic carpet, 

B is the amount of already placed boxes, 

H is the amount of already seated treasure hunters.
-Continues with B lines containing two integers -“XY”, marking theposition of the box on the magic carpet.
-Ends with Hlines containing two integers -“XY”, marking the position of the hunteron the magic carpet.

--------------------------

First set (task-1.txt)
- Includes 200 test cases.

- The length and width of the magic carpet (N) is guaranteed to be an even number between 2 and 100000.


-The number of boxes (B) is guaranteed to be a number between 0 and 10000.

-The number of hunters (H) is guaranteed to be a number between 0 and 10000.

-------------------------------

Strategy Ideas:

How do we loop through all different squareMeters to determine whether there is a Hunter / Box there?

How do we determine how filling an emptyPosition will affect the:
---> leftSideWeight, rightSideWeight, frontSideWeight, backSideWeight 

How do we create an algorithm

-----------------

More Strategy Ideas:

For each test case, take the width and height of the square (N*N), to begin doing calculations.

let squareMeters = ______ ;

let leftSideTiles = 0;
let rightSideTiles = 0;
let frontSideTiles = 0;
let backSideTiles = 0;

leftSideWeight, 
rightSideWeight, 
frontSideWeight, 
backSideWeight

let numOfAvailablePositions = 0;



Question:

How do we balance the carpet both left to right and front to back?



Note:

Boxes are weightless.

--------------------

Example #1: How do we simulate the logic with code?

a) There are 16 boxes (4*4)
b) 
leftSideWeight = 2
rightSideWeight = 2
frontSideWeight = 0
backSideWeight = 2

Once we calculate the weight of each quadrant, how do we know whether we can add weight to one of the quarants?
----> And then how much weight we need to add.

Implementation:

Maybe an array of objects:

[{x: 1, y: 1, empty: true/false, weight: 0/1}, {...}, ...]

---------------------

Ideas:

Create for loop

i<N*N

