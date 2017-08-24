module.exports = function(sequelize, DataTypes) {
  var dones = sequelize.define('dones', {
    tag: DataTypes.INTEGER,
    item: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return dones;
};