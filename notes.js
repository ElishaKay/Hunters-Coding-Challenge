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


-------------------



balanceStatus = findHeaviestSection();

console.log('balanceStatus: ',balanceStatus)

const removeLoad = (section) => {
	if(balanceStatus[0].byHowMany){
		if(section='left side'){
			grid = grid.map((seat)=> {
				if(!seat.glued && seat.x <= N/2){
					seat.empty =  true; 
				    seat.weight = 0;
				} 
				return seat;
			});
		} else if (section='right side') {
			grid = grid.map((seat)=> {
				if(!seat.glued && seat.x ){
					seat.empty =  true; 
				    seat.weight = 0;
				} 
				return seat;
			});
		} else if (section='front side'){
			grid = grid.map((seat)=> {
				if(!seat.glued && seat.x ){
					seat.empty =  true; 
				    seat.weight = 0;
				} 
				return seat;
			});
		} else if (section='back side'){
			grid = grid.map((seat)=> {
				if(!seat.glued && seat.x ){
					seat.empty =  true; 
				    seat.weight = 0;
				} 
				return seat;
			});
		}
	}	
}



console.log('grid after checking for weight imbalance and removing hunters which cause imbalance:',grid);
