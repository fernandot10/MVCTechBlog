const router = require('express').Router();
const withAuth = require('../utils/auth')
const sequelize = require('../config/connection');

const { Post, User, Comment } = require('../models');


router.get('/', withAuth, (req, res) => {
    Post.findAll({

        where: {
            user_id: req.session.user_id
        },

        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],

        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
        });
});


router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({

        where: {
            id: req.params.id
        },

        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],

        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'Post Does Not Exist' });
                return;
            }
            const post = dbPostData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
        });
});


router.get('/edituser', withAuth, (req, res) => {
    User.findOne({

        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'User Does Not Exist' });
                return;
            }
            const user = dbUserData.get({ plain: true });
            res.render('edit-user', { user, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;