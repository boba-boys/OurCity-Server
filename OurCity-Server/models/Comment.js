const Sequelize = require("sequelize");
const db = require("../database");

const Comment = db.define("comment", {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Not Defined",
    validate: {
      notEmpty: true,
    },
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Comment;
