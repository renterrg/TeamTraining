$(document).ready(function() {
 
  var nameInput = $("#name-input");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var teamnameInput = $("#teamname-input");  
  var teamProgram = $(".list-group .active");
  var url = window.location.search;
  
  $(".list-group .list-group-item").click(function(e) {    
    $(".list-group .list-group-item").removeClass("active");
    $(e.target).addClass("active");
    teamProgram = $(this);
  });

  $("#teamdata-form").on("click", function newteamData(event) {
    event.preventDefault();

    if (!nameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val().trim() 
      || !teamnameInput.val().trim() || !teamProgram.text()) {
      return;
    }

    var newTeam = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      team: teamnameInput.val().trim(),
      program: teamProgram.text()
    };

    teamCreation(newTeam);

  });
  
  function teamCreation(User) {
    $.post("/api/users", User, function() {
      window.location.href = "/users";
      console.log("Team created and Team leader has been added to Database");
    });
  };
    
});
