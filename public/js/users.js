$(document).ready(function() {

	var exerciseData = $("#exercise");
	var repetitionsData = $("#repetitions");
	var url = window.location.search;  
	var routineData = $("#routine");
	var usersData = [];
	var trainingType;
	var userProgress;
	var userId;
	
	$("#update_btn").on("click", function() {

		if (url.indexOf("?name_id=") !== -1) {
	        userId = url.split("=")[1];
	        getUserdata(userId);	       
		} else {
		    getUserdata();		  
		} 

	});

	$("#yes_btn").on("click", function(){		
		updateProgress();
	});

	function getUserdata(user) {

	    userId = user || "";
	    if (userId) {
			userId = "/" + userId;			
	    }
	    $.get("/api/users" + userId, function(data) {
			userProgress = data;
			if (!userProgress) {					
				displayEmpty(user);
			} else {
				produceInfo(userProgress.progress);				
			}
	    });
	};	

	function produceInfo(progress) {	

		var numProgress = parseFloat(progress) * 100;
		exerciseData.text("Name: " + userProgress.name + "\nTeam: " + userProgress.team + 
			"\nProgram: " + userProgress.program + "\nProgress: " + numProgress + "%"); 		
	};	

	function updateProgress() {
		
		switch(userProgress.program){

    		case "Training One":    			
    			updateProgramOne(userProgress.progress);
    			break;
    		case "Training Two":    			
    			updateProgramTwo(userProgress.progress);
    			break;
    		case "Training Three":    			
    			updateProgramThree(userProgress.progress);
    			break;
    	}; 
	};

	function updateProgramOne(user) {
		
		var newProgress = (0.33 + parseFloat(user)).toFixed(2);

		$.ajax({
			method: "PUT",
			url: "/api/users",			
			data: {
				id: userProgress.id,
				progress: newProgress
	  		}
	    }).done(getEveryone);
	};

	function updateProgramTwo(user) {
		
		var newProgress = (0.20 + parseFloat(user)).toFixed(2);
		
		$.ajax({
			method: "PUT",
			url: "/api/users",			
			data: {
				id: userProgress.id,
				progress: newProgress
			}
	    }).done(getEveryone);
	};

	function updateProgramThree(user) {	
		
		var newProgress = (0.20 + parseFloat(user)).toFixed(2);

		$.ajax({
			method: "PUT",
			url: "/api/users",
			data: {
				id: userProgress.id,
				progress: newProgress
	  		}
	    }).done(getEveryone);
	};

	function getEveryone() {		

		$.get("/api/users", function(data) {
			for (var i = 0; i < data.length; i++) {
				usersData[i] = {
					id: data[i].id,
		          	name: data[i].name,		         	
		         	progress: data[i].progress
		        };
			}			
			var progressFinder = usersData.find(function(i) {
				return i.id === userProgress.id;
			});
			produceInfo(progressFinder.progress);		
		});		
	};

});
