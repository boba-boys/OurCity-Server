const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Comment = require("../db/models/Comment");
const Group = require("../db/models/Group");
const User = require("../db/models/User");

// /api/groups/:userId
//we're trying to get ALL groups for a particular userId
//search comments for user id and off the comments you'll get those groups
router.get("/:userId", async (req, res, next) => {
  try {
    const comments = await Group.findAll({
      include: [
        {
          model: Comment,
          where: {
            userId: req.params.userId,
          },
        },
      ],
    });
    console.log("these are the groups for this userId", comments);
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const { name, body, imageUrl, userId } = req.body;
    console.log("this is the req.body", req.body);
    const group = await Group.create({ name, body, imageUrl, userId });
    await Comment.create({ userId: userId, groupId: group.id });
    res.json(group);
  } catch (err) {
    next(err);
  }
});

// /api/groups/adduser
//give userEmail and groupId
router.post("/adduser", async (req, res, next) => {
  try {
    const { userEmail, groupId } = req.body;
    const user = await User.findOne({ where: { email: userEmail } });
    const comment = await Comment.create({ userId: user.id, groupId });

    res.send("user added to group");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
