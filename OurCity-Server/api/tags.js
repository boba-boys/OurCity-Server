const router = require("express").Router();
const Tag = require("../db/models/Tag");
const Comment = require("../db/models/Comment");
const Group = require("../db/models/Group");
const User = require("../db/models/User");

// /api/tags
router.get("/", async (req, res, next) => {
  try {
    const tags = await Tag.findAll();
    res.send(tags);
  } catch (err) {
    next(err);
  }
});

// /api/tags/:groupId
router.get("/:groupId", async (req, res, next) => {
  try {
    const tags = await Tag.findAll({
      include: [
        {
          model: Comment,
          where: {
            groupId: req.params.groupId,
          },
        },
      ],
    });
    res.send(tags);
  } catch (err) {
    next(err);
  }
});

// /api/tags/comments/:tagId/:groupId
router.post("/comments/:tagId/:groupId", async (req, res, next) => {
  try {
    const description = req.body.description;
    const userId = req.body.userId;
    const tagId = req.params.tagId;
    const groupId = req.params.groupId;
    const comment = await Comment.create({
      description,
      tagId,
      groupId,
      userId,
    });
    res.send(comment);
  } catch (err) {
    next(err);
  }
});

//Get all comments for a tag
// /api/tags/comments/:tagId groupId is in
router.get("/comments/:tagId/:groupId", async (req, res, next) => {
  try {
    const groupId = req.params.groupId;
    const tagId = req.params.tagId;
    const comments = await Comment.findAll({
      where: {
        tagId: tagId,
        groupId: groupId,
      },
      include: [{ model: User }],
    });
    res.send(comments);
  } catch (err) {
    next(err);
  }
});

// /api/tags/details/:tagId
router.get("/details/:tagId", async (req, res, next) => {
  try {
    const singleTag = await Tag.findOne({
      where: {
        id: req.params.tagId,
      },
    });
    res.send(singleTag);
  } catch (err) {
    next(err);
  }
});

router.post("/addTag", async (req, res, next) => {
  const { name, long, lat, groupId, userId, address, phoneNumber, imageUrl } = req.body;
  //  const lat = 40.7191089
  //  const long = -74.0058052
  //  const name = 'mcdonaldss'
  try {
    // let fetchTag = await Tag.findAll({
    //   include: [{
    //     model: Comment,
    //     where: {
    //       userId: userId,
    //       groupId: groupId,
    //     }
    //   }]
    // });

    // if(fetchTag != []){
    //   const comments= Comment.FindAll({
    //     where:{
    //       groupId,
    //     }
    //   })
    //   await Tag.setComments(comments);
    // } else{

    // }
    let findTag = await Tag.findOne({
      where: {
        longitude: long,
        latitude: lat,
      }
    })
    if (!findTag) {
      let tag = await Tag.create({
        name,
        longitude: long,
        latitude: lat,
        address,
        phoneNumber,
        imageUrl,
        include: [{
          model: Comment,
          where: {
            groupId
          }
        }]
      });

      await Comment.create({
        description: "new Tag",
        groupId: groupId,
        tagId: tag.id,
        userId: userId,
      });

    } else {
      await Comment.create({
        description: "new Tag",
        groupId: groupId,
        tagId: findTag.id,
        userId: userId,
      });
    }

    res.send("tag created");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
