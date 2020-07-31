const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 引入路由子模块
const Users = require('./routes/Users');
// 使用子路由，当访问 /api/v1 时就会由 Users 文件控制
app.use("/api/v1", Users);



app.get('/', async (req, res) => {
    console.log(req.query);
    res.send({ msg: "server is works" });
});


const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server is running on http://localhost:' + port));




















































