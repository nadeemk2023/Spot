import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import keys from "../config/keys";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/").get((req, res, next) => {
  res.send("auth endpoint");
});

router.post("/signup", async (req, res) => {
  const {
    username,
    password,
    confirmPassword,
    email,
    zipcode,
    profile_image,
  } = req.body;

  if (!password || !username || !email) {
    return res.status(422).json({ error: "please add all the fields" });
  }

  if (
    password.length < 8 ||
    password.length > 20 ||
    confirmPassword.length < 8 ||
    confirmPassword.length > 20
  ) {
    return res.status(422).json({
      error: "must be 8-20 characters",
    });
  }

  if (password !== confirmPassword) {
    return res.status(422).json({
      error: " passwords do not match",
    });
  }

  User.findOne({ $or: [{ username: username }, { email: email }] })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "user already exists with that name" });
      }
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          username,
          email,
          dog: req.body.dog || [],
          zipcode,
          passwordHash: hashedpassword,
          profile_image: profile_image,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(422).json({ error: "missing username or password" });
  }

  const user = await User.findOne({ username: username });
  const passwordCorrect =
    user === null ? false : bcrypt.compareSync(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, keys.jwt.secret);
  res
    .status(200)
    .send({ token, username, uid: user.id, profile_image: user.profile_image });
});

module.exports = router;
