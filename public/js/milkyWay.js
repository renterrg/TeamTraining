$(document).ready(function() {
 
  var url = window.location.search;
  var userId;  

  if (url.indexOf("?post_id=") !== -1) {
    userId = url.split("=")[1];
    getPostData(userId);
  }

  var nameInput = $("#userName");
  var emailInput = $("#userEmail");
  var passwordInput = $("#userPassword");
  
  $(signupForm).on("submit", function newuserData(event) {
    event.preventDefault();
    if (!nameInput.val().trim() || !emailInput.val().trim() || !passwordInput.val().trim()) {
      return;
    }
   
    var newUser = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    console.log(newUser);

    newuserCreation(newUser);

  });
  
  function newUserCreation(Post) {
    $.post("/api/users/", Post, function() {
      window.location.href = "/users";
    });
  }

  function getUserData(id) {
    $.get("/api/users/" + id, function(data) {
      if (data) {
       
        nameInput.val(data.name);
        emailInput.val(data.email);
        passwordInput.val(data.password);
       
      }
    });
  }  
});