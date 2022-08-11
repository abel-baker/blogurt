const router = require('express').Router();
const { rest } = require('lodash');
const { User, Post, Comment } = require('../../models');

// GET all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: {}
  })
  .then(postData => res.json(postData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create post
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    content: req.body.post_content,
    user_id: req.session.user_id
  })
  .then(postData => res.json(postData))
  .catch(err => {
    console.error(err);
    res.status(500).json(err);
  });
});

module.exports = router;
