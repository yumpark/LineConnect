const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init({
            id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            class: {
                type: Sequelize.ENUM("ent","hob"),
                defaultValue: 'ent',
                allowNull: false
            },
            level: {
                type: Sequelize.ENUM("Basic","Advanced"),
                defaultValue: 'Basic',
                allowNull: false
            },
            week: {
                type: Sequelize.ENUM("mon","tue","wed","thu","fri","sat","sun"),
                defaultValue: 'mon',
                allowNull: false
            },
            list: {
                type: Sequelize.ENUM("vocal","piano","drum","guitar"),
                defaultValue: 'vocal',
                allowNull: false
            },
            time: {
                type: Sequelize.ENUM("morning","afternoon","evening"),
                defaultValue: 'morning',
                allowNull: false
            },
            regional: {
                type: Sequelize.ENUM("se","gy","gw","ch","gs","jr","je","online"),
                defaultValue: 'se',
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Board, { foreignKey: 'writer', sourceKey: 'id', onDelete: 'cascade' });
    }
};

module.exports = User;
