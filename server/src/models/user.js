import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  role:{
    type: Number,
    min: 1,
    max: 3,
    default: 3,
  }


  dog: {
    name: {
      type: String,
      required: true,
    },

    breed: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },
  },

  email: {
    type: String,
    required: true,
    pattern: "[a-z0-9]+@[a-z]+.[a-z]{2,3}",
  },

  passwordHash: {
    type: String,
    required: true,
  },

  zipcode: {
    type: Number,
    max: 99999,
  },

  profile_image: { type: String, default: "stored photo" },

  posts: [
    {
      type: ObjectId,
      ref: "Post",
    },
  ],
  postLikes: [
    {
      type: ObjectId,
      ref: "Post",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
