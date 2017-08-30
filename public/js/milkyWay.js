$(document).ready(function() {
 
  var url = window.location.search;
  var userId;  

  if (url.indexOf("?post_id=") !== -1) {
    userId = url.split("=")[1];
    getPostData(userId);
  }

  var nameInput = $("#name-input");
  var usernameInput = $("#username-input");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var registerForm = $("#register-form");
  
  $(registerForm).on("submit", function newuserData(event) {
    event.preventDefault();

    if (!nameInput.val().trim() || !usernameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }

    var newUser = {
      name: nameInput.val().trim(),
      username: usernameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    console.log(newUser);

    newUserCreation(newUser);

  });
  
  function newUserCreation(Post) {
    $.post("/api/users", Post, function() {
      console.log("User added to Database");
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
