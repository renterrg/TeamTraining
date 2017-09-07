$(document).ready(function() {

	var userData = [];

	$("#update_btn").on("click", function() {
		getData();
	});

	function getData() {
		$.get("/api/users", function(data) {
      		for (var i = 0; i < data.length; i++) {

	        	userData[i] = {
		          	name: data[i].name,
		         	team: data[i].team,
		         	program: data[i].program,
		         	progress: data[i].progress
		        	};

		        $("#exercise").text(
		        	"Name: " + userData[i].name + "\n" +
		        	" Team: " + userData[i].team + "\n" +
		        	"Program: " + userData[i].program + "\n" +
		        	"Progress: " + userData[i].progress);  
      		};
    	});
	};


	$("#yes_btn").on("click", function(){
		updateProgress();
	});

	function updateProgress() {
		
		$.get("/api/users", function(data) {
			for (var i = 0; i < data.length; i++) {
				userData[i] = {
		         	program: data[i].program
		        	};
		        var trainingType = userData[i].program;
			}
			return trainingType;
		});

		switch(trainingType){

    		case "Training One":
    			updateProgramOne();
    			break;

    		case "Training Two":
    			updateProgramTwo();
    			break;

    		case "Training Three":
    			updateProgramThree();
    			break;
    	} 
	}


	function updateProgramTwo() {

		$.put("/api/users", function(data){

		})
	}
});

