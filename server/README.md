testing to see if feature branch edits go directly to develop or create a new pull request.




for posts.js

import express from "express";
import { Post } from "../models";

const router = express.Router();

//POST - create a new post
router.post("/", async (req, res) => {
  try {
    const { text, author, comments } = req.body;
    const newPost = new Post({
      text,
      author,
      comments,
    });
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET /posts - retrieve all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author")
      .populate("comments.author");
    res.status(200).json(posts);
  } catch {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;


for users.js

import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { requireAuth } from "../middleware";

const router = express.Router();

//POST /users/signup - creat new user
router.post("/signup", async, async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//GET /users/:userId - get user details
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate("posts")
      .populate("postLikes");
    if (!user) {
      return res.status(404).json({ error: "Usre not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server Error" });
  }
});

//PUT /users/:userID - update user profile
router.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Where are you User?" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//GET /search - search for users based on zip code, pet breed, username, petsize
router.get("/search", async (req, res) => {
  try {
    const { zipcode, breed, username, size } = req.query;
    const users = await User.find({ zipcode, breed, username, size });
    req.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST /signin - authenticate a user
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, passwordHash: password });

    if (user) {
      res.status(200).json({ message: "Successful Authentication" });
    } else {
      res.status(200).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
