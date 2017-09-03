$(document).ready(function() {

  var nameInput = $("#name-input");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var memberRegistration = $("#teamMember-registration");
  var url = window.location.search;  
  var teamsPrograms = [];

  $("#registration-menu").on("click", function() {
    getTeamData();
  });  
  
  $(memberRegistration).on("click", function newUser(event) {
    event.preventDefault();

    if (!nameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }

    var programData = teamsPrograms.find(function(i) {
        return i.team === $("#team-selection").val();
      });

    var newUser = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      team: $("#team-selection").val().trim(),
      program: programData.program
    };

    console.log(newUser);

    teamMateRegistration(newUser);

  });

  function teamMateRegistration(User) {
    $.post("/api/users", User, function() {
      window.location.href = "/users";
      console.log("Teammate has been added to Database");
    });
  };
  
  function getTeamData() {
    $.get("/api/users", function(data) {
      var teamsArray = [];
      for (var i = 0; i < data.length; i++) {
        teamsArray[i] = data[i].team; 
        teamsPrograms[i] = {
          team: data[i].team,
          program: data[i].program
        };    
      };
      console.log(teamsPrograms);
      teamsListgenerator(teamsArray);
    });
  };

  function teamsListgenerator(teamsArr) {    
    var teamsList = teamsArr.reduce(function(allTeams, team) {
      if (allTeams.indexOf(team) < 0) {
        allTeams.push(team);        
      }     
      return allTeams;       
    }, []);   

    for (var i = 0; i < teamsList.length; i++) {
      var count = i + 1;
      $("#team-selection").append("<option value='" + teamsList[i] + "'>" + teamsList[i] + "</option>");      
    }
  };

});
