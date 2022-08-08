const router = require('express').Router();
const { rest } = require('lodash');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);

  Post.findAll({
    attributes: [
      'id',
      'title',
      'content',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id', 
          'content', 
          'post_id', 
          'user_id', 
          'created_at'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(postData => {
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('homepage', { posts });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login');
});

module.exports = router;
