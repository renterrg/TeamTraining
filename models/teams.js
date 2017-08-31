module.exports = function(sequelize, DataTypes) {
  var Team = sequelize.define("Team", {
    team_Mates: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    team_Program: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });
  return Team;
};