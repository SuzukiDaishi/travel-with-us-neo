'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    imageurl: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};