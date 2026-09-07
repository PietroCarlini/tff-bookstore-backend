/**
 * Bookstocked builider
 * @param { Sequelize } sequelize 
 */

const {DataTypes} = require('sequelize');

const bookStockedBuilder = (sequelize) => {
    const BookStocked = sequelize.define (
        'bookStocked',
        {
            id: {
                type : DataTypes.BIGINT,
                primaryKey : true,
                autoIncrement : true,
                autoIncrementIdentity: true
            },
            ISBN: {
                type: DataTypes.STRING(13),
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            author: {
                type: DataTypes.STRING(300),
                allowNull: false
            },
            genere: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            price: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
            },
            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cover_url: {
                type: DataTypes.STRING(2000),
                allowNull: true
            },
        },
        {
            tableName: 'bookStocked'
        },
    )
    return BookStocked;
}

module.exports = bookStockedBuilder;