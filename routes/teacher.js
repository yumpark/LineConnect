const express = require('express');
const bcrypt = require('bcrypt')
const Teacher = require('../models/teacher');



const router = express.Router();

// 로그인 해야만 teacher 넘어가기
//현재는 contact에 있음
router.route('/teacher')

    .post(async (req, res, next) => {


        try{
            await Teacher.create({
                teach_name: req.body.teach_name,
                introduce: req.body.introduce,
                class : req.body._class,
                level: req.body.level,
                week: req.body.week,
                list: req.body.list,
                time: req.body.time,
                regional: req.body.regional,
                email: req.body.email,
                teach_id: req.body.teach_id
            });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
});

module.exports = router;