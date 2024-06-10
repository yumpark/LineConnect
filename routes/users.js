const express = require('express');
const bcrypt = require('bcrypt')
const User = require('../models/user');

const { logout } = require('./helpers');


const router = express.Router();

router.route('/join')
    .post(async (req, res, next) => {
        console.log(req.body);
        // const { name, id, password, _class, level, week, list, time, regional } = req.body;
        const { id : id, password : password} = req.body;

        const user = await User.findOne({ where: { id } });
        if (user) {
            next('이미 등록된 사용자 아이디입니다.');
            return;
        }

        const hash = await bcrypt.hash(password, 12);
        try{
            await User.create({
                name: req.body.name,
                id: req.body.id,
                password: hash,
                class : req.body._class,
                level: req.body.level,
                week: req.body.week,
                list: req.body.list,
                time: req.body.time,
                regional: req.body.regional
            });
            res.redirect('/');
        } catch (err) {
            console.error(err);
            next(err);
        }
});

router.route('/login')
    .post(async (req, res, next) => {
        const {id, password} = req.body
        
        try {
            const users = await User.findOne({
                where:{id:id}
            });
            const hash = await bcrypt.hash(password, 12);
            const isCorrect = await bcrypt.compare(password, users.password);
            if(isCorrect){
                console.log(users.name,'님, login되셨습니다.');
            } else {
                console.log('로그인 실패!');
                res.redirect('/login');
            }
            console.log(users.name, users.class);
            res.redirect('/user');
        } catch (err) {
            console.error(err);
            next(err);
        }
});
module.exports = router;