const Sequelize = require("sequelize");
const db = require("../database");

const Tag = db.define("tag", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  latitude: {
    type: Sequelize.FLOAT,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    unique: true,
  },
  phoneNumber: {
    type: Sequelize.STRING,
    unique: true,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://i.etsystatic.com/12759209/r/il/a457ce/949620372/il_794xN.949620372_6hml.jpg",
  },
});

module.exports = Tag;
