import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { requireAuth } from "../middleware";

const router = express.Router();

// GET /users/:username - get user details including posts
// PUT /users/:username - update user details
router.route("/:username")
  .get(async (req, res) => {
    const { username } = req.params;
    const populateQuery = {
      path: "posts",
      populate: { path: "author", select: ["username", "profile_image"] },
    };
    const user = await User.findOne({ username }).populate(populateQuery);
    res.json(user.toJSON());
  })
  .put(requireAuth, async (req, res) => {
    const { password, currentPassword, confirmPassword, ...userData } = req.body;
    const { username } = req.params;

    if (password) {
      if (password.length < 8 || password.length > 20 || confirmPassword.length < 8 || confirmPassword.length > 20) {
        return res.status(422).json({
          error: "Password must be 8-20 characters",
        });
      }

      if (password !== confirmPassword) {
        return res.status(422).json({
          error: "Passwords do not match",
        });
      }
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (password) {
      const passwordCorrect = await bcrypt.compare(currentPassword, user.passwordHash);

      if (!passwordCorrect) {
        return res.status(401).json({
          error: "Invalid username or password",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      user.passwordHash = hashedPassword;
    }

    // Update other user details
    Object.assign(user, userData);

    try {
      const updatedUser = await user.save();
      res.status(200).json(updatedUser.toJSON());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// PUT /users/:username/avatar - update user avatar
router.put("/:username/avatar", requireAuth, async (req, res) => {
  const { username } = req.params;
  const { profile_image } = req.body;

  if (req.user.username.toLowerCase() !== username.toLowerCase()) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  user.profile_image = profile_image;

  try {
    await user.save();
    res.json(user.toJSON());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /users/search - search for users based on zip code, pet breed, username, pet size
router.get("/search", async (req, res) => {
  try {
    const { zipcode, breed, username, size } = req.query;

    if (!zipcode && !breed && !username && !size) {
      return res.status(400).json({ error: "At least one search parameter is required." });
    }

    const users = await User.find({ zipcode, breed, username, size });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
