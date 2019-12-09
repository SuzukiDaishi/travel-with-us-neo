'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userid: DataTypes.INTEGER,
    spotid: DataTypes.INTEGER,
    imageurl: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};