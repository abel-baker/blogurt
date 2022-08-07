const router = require('express').Router();
const { rest } = require('lodash');
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
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

  // try {
  //   res.render('homepage', dbPostData[0]);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).json(err);
  // };

  // res.render('homepage', {
  //   id: 1,
  //   title: 'Handlebars Rules',
  //   created_at: new Date(),
  //   content: 'This is a lengthy lamentation about not having a handlebar mustache',
  //   comments: [{}, {}],
  //   user: {
  //     username: 'test_user',
  //   }
  // });
});

module.exports = router;
