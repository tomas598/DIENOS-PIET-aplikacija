const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const Post = require("../models/Post");

// Create a post (Admin only)
router.post("/", [auth, role(["admin"])], async (req, res) => {
  const { name, picture, description, price } = req.body;

  try {
    if (!name || !picture || !description || !price) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const post = new Post({
      name,
      picture,
      description,
      price,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a post
router.post("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if user has already liked the post
    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    // Add user ID to likes
    post.likes.push(req.user.id);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Unlike a post
router.post("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if user has not liked the post
    if (!post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: "Post has not been liked yet" });
    }

    // Remove user ID from likes
    post.likes = post.likes.filter((like) => like.toString() !== req.user.id);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post (Admin only)
router.delete("/:id", [auth, role(["admin"])], async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json({ msg: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
