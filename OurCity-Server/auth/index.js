const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
     const { email, password } = req.body;
    // prevents data injection
    let token = { token: await User.authenticate({ email, password }) }

    if(token){
    res.send(token)
  }else{
    res.send('incorrect password')
  }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {


     const { email, password, firstName, lastName } = req.body;
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });

    const user1 = await User.findOne({
      where:{email: email}
    })
    res.send(user1)
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.send("User already exists");
    } else {
      res.send('Cant make account')
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
