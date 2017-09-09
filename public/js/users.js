$(document).ready(function() {

	var exerciseData = $("#exercise");
	var repetitionsData = $("#repetitions");
	var challengeComplete = $("#complete");
	var url = window.location.search;  
	var routineData = $("#routine");	
	var usersData = [];
	var usersTeamarray;
	var trainingType;
	var userProgress;
	var userId;

	$("#team_btn").hide();
	
	$("#update_btn").on("click", function() {		

		if (url.indexOf("?name_id=") !== -1) {
	        userId = url.split("=")[1];
	        getUserdata(userId);	       
		} else {
		    getUserdata();		  
		} 

	});

	$("#yes_btn").on("click", function(){
		$("#team_btn").show();		
		updateProgress();		
	});

	$("#no_btn").on("click", function(){
		$("#team_btn").show();				
	});

	$("#team_btn").on("click", function(){	
		getEveryone();		
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

		if (numProgress === 100) {
			challengeComplete.modal("toggle");
			exerciseData.text("\n Name: " + userProgress.name + "\n Team: " + userProgress.team + 
			"\n Program: " + userProgress.program + "\n Progress: 100%"); 		
		} else {
			exerciseData.text("\n Name: " + userProgress.name + "\n Team: " + userProgress.team + 
			"\n Program: " + userProgress.program + "\n Progress: " + numProgress + "%"); 		
		}
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
			
		if (parseFloat(newProgress) > 0.95) {			
			produceInfo("1.00");
			$.ajax({
				method: "PUT",
				url: "/api/users",			
				data: {
					id: userProgress.id,
					progress: 1.00
		  		}
		    }).done(getEveryone);

		} else {
			$.ajax({
				method: "PUT",
				url: "/api/users",			
				data: {
					id: userProgress.id,
					progress: newProgress
		  		}
		    }).done(getEveryone);
		}
	};

	function updateProgramTwo(user) {
		
		var newProgress = (0.20 + parseFloat(user)).toFixed(2);

		if (newProgress === "1.20") {			
			produceInfo("1.00");
		} else {
			$.ajax({
				method: "PUT",
				url: "/api/users",			
				data: {
					id: userProgress.id,
					progress: newProgress
		  		}
		    }).done(getEveryone);
		}
	};

	function updateProgramThree(user) {	
		
		var newProgress = (0.20 + parseFloat(user)).toFixed(2);

		if (newProgress === "1.20") {			
			produceInfo("1.00");
		} else {
			$.ajax({
				method: "PUT",
				url: "/api/users",			
				data: {
					id: userProgress.id,
					progress: newProgress
		  		}
		    }).done(getEveryone);
		}
	};

	function getEveryone() {		

		$.get("/api/users", function(data) {
			for (var i = 0; i < data.length; i++) {
				usersData[i] = {
					id: data[i].id,
		          	name: data[i].name,	
		          	team: data[i].team,		         	
		         	progress: data[i].progress
		        };
			}			
			var progressFinder = usersData.find(function(i) {
				return i.id === userProgress.id;
			});

			usersTeamarray = usersData.filter(function(j) {
				return j.team === userProgress.team;
			});
			
			produceInfo(progressFinder.progress);	
			loadTeamsprogress();
		});		
	};

	function loadTeamsprogress() {
		
		$("ul.list-group").empty();

		for (var i = 0; i < usersTeamarray.length; i++) {
			var teamSpreadProgress = parseFloat(usersTeamarray[i].progress) * 100;
			var createDisplayList = $("<li>");
			createDisplayList.addClass("list-group-item");
			createDisplayList.append(usersTeamarray[i].name);
			var createDisplayProgress = $("<div>");
			createDisplayProgress.addClass("progress");
			var createDisplayContent = $("<div>");
			createDisplayContent.addClass("progress-bar");
			createDisplayProgress.append(createDisplayContent);
			createDisplayContent.attr("role", "progressbar");
			createDisplayContent.attr("aria-valuenow", "80");
			createDisplayContent.attr("aria-valuemin", "0");
			createDisplayContent.attr("aria-valuemmax", "100");
			createDisplayContent.text(teamSpreadProgress + "%");
			createDisplayContent.css("width", teamSpreadProgress + "%");
			$("ul.list-group").append(createDisplayList);
			$("ul.list-group").append(createDisplayProgress);

		}			
	
	};

});
