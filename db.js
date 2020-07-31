// 使用 Sequelize 创建数据库连接
const Sequelize = require('sequelize');
const db = {};

// 实例化 Sequelize
const sequelize = new Sequelize("nodesql_login", "root", "", {
    host: "localhost",
    port: "3306",
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {   // 设置编码和禁止自动创建时间戳字段
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: false
    },
    timezone: '+08:00', // 设置时区
});

// 将类和实例绑定到 db 的属性上
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 公开数据库类和实例
module.exports = db;

