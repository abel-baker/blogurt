const router = require('express').Router();
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

module.exports = router;
