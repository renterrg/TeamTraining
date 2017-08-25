var db = require("../models");

module.exports = function(app) {
  
  app.get("/api/users", function(req, res) {   
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", function(req, res) {    
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  
  app.post("/api/users", function(req, res) {    
    console.log(req.body);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });  
};
