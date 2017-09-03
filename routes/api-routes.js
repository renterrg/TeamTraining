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
      password: req.body.password,
      team: req.body.team,
      program: req.body.program
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });  
/*
  app.post("/api/registered_teams", function(req, res) {    
    console.log(req.body);
    db.Team.create({
      team_Mates: {
                  team_Mate_1: req.body.teamMate1, 
                  team_Mate_2: req.body.teamMate2, 
                  team_Mate_3: req.body.teamMate3, 
                  team_Mate_4: req.body.teamMate4, 
                  team_Mate_5: req.body.teamMate5, 
                  },
      team_Program: {
                    program_Level: req.body.programLevel, 
                    program_Type: req.body.programType, 
                    program_Routine: req.body.programRoutine, 
                    program_Weeks: req.body.programWeeks
                  }
    }).then(function(dbTeam) {
      res.json(dbTeam);
    });
  }); 
*/
};
