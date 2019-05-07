// Step 1: put hunters on all the empty seats
// loop through the grid object
grid = grid.map((seat)=> {
	if(seat.empty){
		seat.empty =  false; 
	    seat.weight = 1;
	    console.log('seat:', seat)
	    return seat;
	} 
})

console.log('grid after empty seats have been taken by hunters:',grid);
//compare filled spaces with grid.


