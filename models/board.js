const Sequelize = require('sequelize');

class Board extends Sequelize.Model {
    static initiate(sequelize) {
        Board.init({
            id: {
                type: Sequelize.STRING(20),
                allowNull: false,
                primaryKey : true
            },
            writer: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            title: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            contents: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            date: {
                type: Sequelize.DATE,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Board',
            tableName: 'board',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Board.belongsTo(db.User, { foreignKey: 'writer', targetKey: 'id', onDelete: 'cascade' });
    }
};

module.exports = Board;
