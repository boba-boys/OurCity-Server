const Sequelize = require("sequelize");
const db = require("../database");

const Group = db.define("group", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  body: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://i.etsystatic.com/12759209/r/il/a457ce/949620372/il_794xN.949620372_6hml.jpg",
  },
});

module.exports = Group;
