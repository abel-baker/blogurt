const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Leave a comment
router.post('/', (req, res) => {
  if (req.session) {
    Comment.create({
      content: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.error(err);
      res.status(400).json(err)
    });
  }
});

module.exports = router;
