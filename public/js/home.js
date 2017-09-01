$(document).ready(function() {
 
  var url = window.location.search;
  var userId;  

  if (url.indexOf("?post_id=") !== -1) {
    userId = url.split("=")[1];
    getPostData(userId);
  }

  var nameInput = $("#name-input");
  var emailInput = $("#email-input");
  var passwordInput = $("#password-input");
  var MemberRegistration = $("#teamMember-registration");
  
  $(MemberRegistration).on("submit", function newuserData(event) {
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

    newUserCreation(newUser);

  });
  
  function newUserCreation(User) {
    $.post("/api/users", User, function() {
      window.location.href = "/users";
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
