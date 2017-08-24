module.exports = function(sequelize, DataTypes) {
  var todos = sequelize.define('todos', {
    tag: DataTypes.INTEGER,
    item: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todos;
};