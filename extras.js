

Filter which could give us 4/5 more answers from set#1:
but we still need to redo the testCaseNumber calculation:

	configs = configs.filter((config)=>config.N<=1000)


---------

// Attempt #1:

logResults = (grid, testCaseNumber) => {
	let testResults = ``;
	if(grid == -1){
		testResults.concat(`Case #${testCaseNumber}: -1\n`);	
	} else {
		let testResult = grid.filter((seat)=>!seat.glued && seat.weight>0).length;
		testResults.concat(`Case #${testCaseNumber}: ${testResult}\n`);		
	}
	if(testCaseNumber == 130){
		fs.writeFile(resultsFilePath, testResults, function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		}); 
	}
}


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