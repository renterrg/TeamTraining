$(document).ready(function() {
 
  var url = window.location.search;
  var userId;  

  if (url.indexOf("?post_id=") !== -1) {
    userId = url.split("=")[1];
    getPostData(userId);
  }

  var teamMate1 = $("#teamMate-1");
  var teamMate2 = $("#teamMate-2");
  var teamMate3 = $("#teamMate-3");
  var teamMate4 = $("#teamMate-4");
  var teamMate5 = $("#teamMate-5");
  var pLevel = "1";
  var pType = "2";
  var pRoutine = "3";
  var pWeeks = "4";

  $("#leader-form").on("submit", function newteamData(event) {
    event.preventDefault();
    /*if (!nameInput.val().trim() || !usernameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }
*/
    var newTeam = {
      teamMate1: teamMate1.val().trim(),
      teamMate2: teamMate2.val().trim(),
      teamMate3: teamMate3.val().trim(),
      teamMate4: teamMate4.val().trim(),
      teamMate5: teamMate5.val().trim(),
      programLevel: pLevel.val().trim(),
      programType: pType.val().trim(),
      programRoutine: pRoutine.val().trim(),
      programWeeks: pWeeks.val().trim()
    };

    console.log(newTeam);
    newTeamCreation(newTeam);

  });
  
  function newTeamCreation(Team) {
    $.post("/api/registered_teams", Team, function() {
      window.location.href = "/users";
      console.log("Team added to Database");
    });
  };

  /*
  function getUserData(id) {
    $.get("/api/users/" + id, function(data) {
      if (data) {
       
        nameInput.val(data.name);
        emailInput.val(data.email);
        passwordInput.val(data.password);
       
      }
    });
  }  
  */
});