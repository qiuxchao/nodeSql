// 登录 注册
const express = require('express');
// 使用 express 的路由
const users = express.Router();
// 引入 bcrypt 加密模块
const bcrypt = require('bcryptjs');
// 引入 jsonwebtoken，用于登录成功后返回 token
const jwt = require('jsonwebtoken');

// 引入模型
const User = require('../models/User');

// 定义环境变量
process.env.SECRET_KEY = "secret";

// 测试接口 localhost:5000/api/v1/test
users.get('/test', async (req, res) => {
    res.send({ msg: 'test is works' });
});

// 注册接口 localhost:5000/api/v1/register
users.post('/register', async (req, res) => {
    console.log(req.body);
    const result1 = await User.findOne({
        where: {
            email: req.body.email
        }
    }); // 查不到返回 null
    // console.log(result1);
    if (result1) {
        // 查到了
        res.status(200).json({ msg: req.body.email + ' 已经注册过了' });
    } else {
        // 没有查到，注册
        // 加密密码
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            // 第一个参数是要加密的字符串
            // 第二个参数是加密的长度
            // 第三个参数是回调，1: 报错，2: 加密结果
            let password = hash;
            const userData = {
                name: req.body.name,
                email: req.body.email,
                password: password
            };
            User.create(userData).then(result => {
                if (result) res.status(200).json({ msg: req.body.email + ' 注册成功' });
            }).catch(err => res.status(400).josn('msg: ', err));

        });

    }
});

// 登录接口 localhost:5000/api/v1/login
users.post('/login', async (req, res) => {
    console.log(req.body);
    let result = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (result) {
        // 注册过了
        // console.log(result);
        // 使用 bcrypt.compare 查询密码是否匹配
        // 参数1：加密前的密码
        // 参数2：加密后的密码
        // 参数3：回调，1: 报错信息，2: 查询结果 是一个布尔值 
        // 也可以直接 if(bcrypt.compareSync(req.body.password, result.password))
        bcrypt.compare(req.body.password, result.password, (err, success) => {
            console.log('success: ', success);
            if (success) {
                // 登录成功
                // 生成 token
                let token = jwt.sign(result.dataValues, process.env.SECRET_KEY, {expiresIn: 1440});
                res.status(200).json({ msg: `用户 ${result.name} 登录成功`, data: {token : token} });
            } else {
                // 密码错误
                res.status(400).json({ msg: `${result.email} 密码错误`});

            }
        });
    } else {
        // 未注册
        res.status(400).json({ msg: req.body.email + ' 未注册'});
    }
});


// 导出路由
module.exports = users;
















