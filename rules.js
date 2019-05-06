Input:

Your input is guaranteed to be valid and you don’t need to implement input validation.

The first line of the input gives the number of test cases.

Each test case: -Starts with 1 line containing three integers -“NBH”, where 

N is the length and width of the magic carpet, 

B is the amount of already placed boxes, 

H is the amount of already seated treasure hunters.
-Continues with B lines containing two integers -“XY”, marking theposition of the box on the magic carpet.
-Ends with Hlines containing two integers -“XY”, marking the position of the hunteron the magic carpet.




Strategy Ideas:

For each test case, take the width and height of the square (N*N), to begin doing calculations.

let squareMeters = ______ ;

let leftSide = 0;
let rightSide = 0;
let frontSide = 0;
let backSide = 0;



Question:

How do we balance the carpet both left to right and front to back?

Note:

Boxes are weightless.

--------------------

Example #1: How do we simulate the logic with code?

a) There are 16 boxes (4*4)








