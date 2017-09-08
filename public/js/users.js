$(document).ready(function() {

	var userData = [];
	var trainingType;

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

      		$.ajax({
		      method: "PUT",
		      url: "/api/users",
		      data: ""
		    }).then(function(){
		    	userData[i].progress + 0.2;
		    });
    	});
	};


// 	$("#yes_btn").on("click", function(){
// 		updateProgress();
// 	});

// 	function updateProgress() {
		
// 		$.get("/api/users", function(data) {
// 			for (var i = 0; i < data.length; i++) {
// 				userData[i] = {
// 		         	program: data[i].program,
// 		         	progress: data[i].progress
// 		        	};
// 			};
// 			return userData;
// 		});

// 		switch(userData.program){

//     		case "Training One":
//     			updateProgramOne(userData.program, userData.progress);
//     			break;

//     		case "Training Two":
//     			updateProgramTwo(userData.program, userData.progress);
//     			break;

//     		case "Training Three":
//     			updateProgramThree(userData.program, userData.progress);
//     			break;
//     	}; 
// 	};


// 	function updateProgramTwo(user) {

	

// 		$.ajax({
// 	      method: "PUT",
// 	      url: "/api/users",
// 	      data: user
// 	    }).then(function(){
// 	    	for (var i = 0; i < data.length; i++) {
// 				userData[i] = {
// 		         	progress: data[i].progress
// 		        	};
// 			var newProgress = userData.progress + 0.2;
// 			};
// 			return newProgress;
// 	    });
// 	};
});
