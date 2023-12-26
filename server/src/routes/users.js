import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models";
import { requireAuth } from "../middleware";

const router = express.Router();

// GET /users/:username - get user details including posts
// PUT /users/:username - update user details
router
  .route("/:username")
  .get(async (req, res) => {
    try {
      const { username } = req.params;
      const populateQuery = {
        path: "posts",
        populate: { path: "author", select: ["username", "profile_image"] },
      };
      const user = await User.findOne({ username }).populate(populateQuery);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user.toJSON());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  })
  .put(requireAuth, async (req, res) => {
    try {
      const { password, currentPassword, confirmPassword, ...userData } =
        req.body;
      const { username } = req.params;
      let user;

      if (password) {
        if (
          password.length < 8 ||
          password.length > 20 ||
          confirmPassword.length < 8 ||
          confirmPassword.length > 20 ||
          password !== confirmPassword
        ) {
          return res.status(422).json({
            error:
              "Password must be 8-20 characters and match the confirmation",
          });
        }

        user = await User.findOne({ username });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }

        const passwordCorrect = await bcrypt.compare(
          currentPassword,
          user.passwordHash
        );
        if (!passwordCorrect) {
          return res
            .status(401)
            .json({ error: "Invalid username or password" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.passwordHash = hashedPassword;
        await user.save();
      } else {
        // Update other user details
        user = await User.findOneAndUpdate(
          { username },
          { $set: { ...userData } },
          { new: true }
        );
      }

      res.status(200).json(user.toJSON());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// PUT /users/:username/avatar - update user avatar
router.put("/:username/avatar", requireAuth, async (req, res) => {
  const { username } = req.params;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No image uploaded.");
  }

  const profileImage = req.files.image;
  const imageName = uuid() + path.extname(profileImage.name);
  const uploadPath = path.join(__dirname, "..", "public", "images", imageName);

  profileImage.mv(uploadPath, async function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    const imagePath = `/images/${imageName}`;
    const user = await User.findOneAndUpdate(
      { username },
      { $set: { profile_image: imagePath } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  });
});

//PUT /users/:username/dog/images - update dog images
router.put("/:username/dog/images", requireAuth, async (req, res) => {
  const { username } = req.params;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No images uploaded");
  }

  const dogImage = req.files.images;
  const imgUrls = await Promise.all(
    dogImage.map(async (image) => {
      const imageName = uuid() + path.extname(image.name);
      const uploadPath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        imageName
      );

      await image.mv(uploadPath);
      return `/images/${imageName}`;
    })
  );

  const user = await User.findOneAndUpdate(
    { username },
    { $push: { "dog.images": { $each: imgUrls } } },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  res.json(user);
});

// GET /users/search - search for users based on zip code, pet breed, username, pet size
router.get("/search", async (req, res) => {
  try {
    const { zipcode, breed, username, size } = req.query;
    console.log("Query Paramenters", { zipcode, breed, username, size });
    if (!zipcode && !breed && !username && !size) {
      return res
        .status(400)
        .json({ error: "At least one search parameter is required" });
    }

    const users = await User.find({
      $or: [
        { zipcode },
        { "dog.breed": breed },
        { username },
        { "dog.size": size },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
