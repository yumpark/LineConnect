const express = require('express');
const Board = require('../models/board');

const { isLoggedIn } = require('./helpers');

const router = express.Router();


router.route('/board')
    .get(isLoggedIn, (req, res) => {
        res.render('board', {
            title: require('../package.json').name,
            userId: req.user.id
        });
    })
    .post(async (req, res, next) => {
        const { comment } = req.body
        
        try {
            await Board.create({ writer, title, comment, date });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }

    });
module.exports = router;
