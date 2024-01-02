import express from 'express';
const router = express.Router();
import { Post } from '../models';
import { requireAuth } from '../middleware';

router.get('/', async (req, res) => {
  const populateQuery = [
    { path: 'author', select: ['username', 'profile_image'] },
    {
      path: 'comments',
      populate: { path: 'author', select: ['username', 'profile_image'] },
    },
    'likes',
  ];
  const posts = await Post.find({})
    .sort({ created: -1 })
    .populate(populateQuery)
    .exec();

  res.json(posts.map(post => post.toJSON()));
});

router.post('/', requireAuth, async (req, res, next) => {
  const { text, imgUrl } = req.body;
  const { user } = req;

  const post = new Post({
    text: text,
    author: user._id,
    image: imgUrl,
  });

  try {
    const savedPost = await post.save();
    user.posts = user.posts.concat(savedPost._id);

    await user.save();

    res.json(savedPost.toJSON());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res) => {
  const populateQuery = [
    { path: 'author', select: ['username', 'profile_image'] },
    {
      path: 'comments',
      populate: { path: 'author', select: ['username', 'profile_image'] },
    },
  ];
  const post = await Post.findById(req.params.id)
    .populate(populateQuery)
    .exec();
  if (post) {
    res.json(post.toJSON());
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.sendStatus(404);
    }
    res.json(deletedPost);
  } catch (error) {
    next(error);
  }
});

//! Previous .all Code works but only sends a success status
// router.all('/like/:postId', requireAuth, async (req, res) => {
//   const { postId } = req.params;
//   const { user } = req;
//   const post = await Post.findOne({ _id: postId });
//
//   if (!post) {
//     return res.status(422).json({ error: 'Cannot find post' });
//   }
//   try {
//     if (post.likes.includes(user.id)) {
//       const result = await post.updateOne({
//         $pull: { likes: user.id },
//       });
//
//       res.json(result);
//     } else {
//       const result = await post.updateOne({
//         $push: { likes: user.id },
//       });
//
//       res.json(result);
//     }
//   } catch (err) {
//     return res.status(422).json({ error: err });
//   }
// });

router.all('/like/:postId', requireAuth, async (req, res) => {
  const { postId } = req.params;
  const { user } = req;
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(422).json({ error: 'Cannot find post' });
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      post.likes.includes(user.id)
        ? { $pull: { likes: user.id } }
        : { $push: { likes: user.id } },
      { new: true }
    ).populate('author', 'comments');

    res.json(updatedPost);
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

router.put('/comments', async (req, res, next) => {
  const { text, userId, postId } = req.body;
  const comment = {
    text: text,
    author: userId,
  };
  const populateQuery = [
    { path: 'comments.author', select: ['username', 'profile_image'] },
  ];

  const post = await Post.findByIdAndUpdate(
    postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  ).populate(populateQuery);
  res.json(post);
});

//do i need to add requireAuth?
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedPost) {
      return res.sendStatus(404);
    }
    res.json(updatedPost);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
