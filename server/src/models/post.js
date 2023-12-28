import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 500,
    },

    author: {
      type: ObjectId,
      ref: "User",
    },

    created: {
      type: Date,
      default: Date.now,
    },

    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    //path set up for static file serving
    image: { type: String, default: "/images/default-post.jpg" },

    comments: [
      {
        text: {
          type: String,
          required: true,
          maxlength: 500,
        },

        author: {
          type: ObjectId,
          ref: "User",
        },

        created: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
