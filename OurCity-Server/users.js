const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Comment = require("../db/models/Comment");
const User = require("../db/models/User");

// /api/users/:groupId
router.get("/:groupId", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Comment,
          where: {
            groupId: req.params.groupId,
          },
        },
      ],
    });

    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      res.send(user);
    } else {
      res.send("User not found");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/comment/:id", async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.id,
      },
    });

    await comment.destroy();

    res.send(comment);
  } catch (err) {
    next(err);
  }
});

// /api/users/:groupId/userId
// groupId and userId in params
router.delete("/:groupId/:userId", async (req, res, next) => {
  try {
    const { groupId, userId } = req.params;
    //console.log("userId: ", userId, "| groupId: ", groupId);
    const comments = await Comment.findAll({
      where: {
        groupId: groupId,
        userId: userId,
      },
    });
    console.log(comments);
    await comments.map(
      async (comment) => await comment.update({ userId: null })
    );
    res.send(comments);
  } catch (error) {
    next(error);
  }
});

//to add user give groupId and email of new user to req.body
// /api/groups/adduser
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
