const Sequelize = require('sequelize');

class Teacher extends Sequelize.Model {
    static initiate(sequelize) {
        Teacher.init({
            teach_name: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            introduce: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            class: {
                type: Sequelize.ENUM("ent","hob"),
                allowNull: false
            },
            level: {
                type: Sequelize.ENUM("Basic","Advanced"),
                allowNull: false
            },
            week: {
                type: Sequelize.ENUM("mon","tue","wed","thu","fri","sat","sun"),
                allowNull: false
            },
            list: {
                type: Sequelize.ENUM("vocal","piano","drum","guitar"),
                allowNull: false
            },
            time: {
                type: Sequelize.ENUM("morning","afternoon","evening"),
                allowNull: false
            },
            regional: {
                type: Sequelize.ENUM("se","gy","gw","ch","gs","jr","je","online"),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            teach_id: {
                type: Sequelize.STRING(10),
                allowNull: false,
                primaryKey: true
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Teacher',
            tableName: 'teacher',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

};

module.exports = Teacher;
