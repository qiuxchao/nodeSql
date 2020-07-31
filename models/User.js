// 用户模型

const Sequelize = require('sequelize');
const db = require('../db');
const sequelize = db.sequelize;

const Model = db.Sequelize.Model;
class User extends Model { };
User.init({
    // 属性
    id: {
        type: Sequelize.INTEGER,     // 类型 int
        primaryKey: true,            // 是否主键
        autoIncrement: true,         // 是否自增
        allowNull: false             // 是否允许为空
    },
    name: {
        type: Sequelize.STRING(255)
    },
    email: {
        type: Sequelize.STRING(255)
    },
    password: {
        type: Sequelize.STRING(255)
    },
    created: {
        type: Sequelize.DATE,   // TIME 类型只显示时分秒， DATE 类型显示完整时间
        defaultValue: Sequelize.NOW
    }
}, {
    sequelize,  // 定义该模型指向哪个数据库实例
    modelName: 'user'
});

// 将表与模型同步，该操作会覆盖数据库中的表
// User.sync({ force: true });


// 导出模型
module.exports = User;


























