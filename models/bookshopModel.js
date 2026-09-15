/**
 * Bookshop builider
 * @param { Sequelize } sequelize 
 */

const { DataTypes } = require('sequelize');

const bookshopBuilder = (sequelize) => {
    const Bookshop = sequelize.define (
        'bookshop',
        {
            id: {
                type : DataTypes.BIGINT,
                primaryKey : true,
                autoIncrement : true,
                autoIncrementIdentity : true
            },
            name: {
                type: DataTypes.STRING(120),
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(120),
                allowNull: false,
            },
            openingHours: {
                type: DataTypes.STRING(2000),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(320),
                allowNull: false
            },
            phone: {
                type: DataTypes.STRING(120),
                allowNull: false,
                unique : 'UK_bookshop_phone'
            }
        },
        {
            tableName : 'bookshop' 
        }
    )
    return Bookshop;
}

module.exports = bookshopBuilder;