/**
 * OrderItem builider
 * @param { Sequelize } sequelize 
 */

const { DataTypes } = require('sequelize');

const orderItemBuilder = (sequelize) => {
    const OrderItem = sequelize.define (
        'orderItem',
        {
            id: {
                type : DataTypes.BIGINT,
                primaryKey : true,
                autoIncrement : true,
                autoIncrementIdentity : true
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
            price: {
                type: DataTypes.DECIMAL(10,2),
                allowNull: false,
            },
        },
        {
            tableName: 'orderItem'
        }
    )
    return OrderItem;
}

module.exports = orderItemBuilder;
