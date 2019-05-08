//stronger dyno
inspect(`ran calculateMaxHunters() func with testCaseNumber ${testCaseNumber} where the config is`, config);


-------------------

/*top-left quadrant*/
		if(heavySides.includes('left side') && heavySides.includes('front side')) {
			filterFunc = ({x,y}, N)=> x <= N/2 && y <= N/2  	
		} /*bottom-left quadrant*/ else if(heavySides.includes('left side') && heavySides.includes('back side')){
			filterFunc = ({x,y}, N)=> x <= N/2 && y > N/2
		} /*top-right quadrant*/ else if(heavySides.includes('right side') && heavySides.includes('front side') ){
			filterFunc = ({x,y}, N)=> x > N/2 && y <= N/2
		} /*bottom-right quadrant*/ else if(heavySides.includes('right side') && heavySides.includes('back side') ){
			filterFunc = ({x,y}, N)=>  x > N/2 && y > N/2
		}