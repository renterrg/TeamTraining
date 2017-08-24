module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: 
    }
  });
  return Post;
};