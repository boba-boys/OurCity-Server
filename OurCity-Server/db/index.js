const db = require("./database");
// const { User, Group, Tag, Comment } = require("./models"); // Why this doesnt work?
const User = require("./models/User");
const Group = require("./models/Group");
const Tag = require("./models/Tag");
const Comment = require("./models/Comment");

User.hasMany(Comment);
Group.hasMany(Comment);

Comment.belongsTo(User);
Comment.belongsTo(Group);

Tag.hasMany(Comment);
Comment.belongsTo(Tag);

module.exports = {
  db,
  models: {
    Group,
    Tag,
    User,
    Comment,
  },
};
