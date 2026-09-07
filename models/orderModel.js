/**
 * Order builider
 * @param { Sequelize } sequelize 
 */

const { DataTypes } = require('sequelize');

const orderBuilder = (sequelize) => {
    const Order = sequelize.define(
        'order',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                autoIncrementIdentity: true
            },
            state: {
                type: DataTypes.ENUM('Sent', 'In Progress', 'Ready', 'Collected', 'Canceled'),
                allowNull: false,
                defaultValue: 'Sent'
            },
            message: {
                type: DataTypes.STRING(1000),
                allowNull: true
            },
            //NB: dateCreation ==  sequelize native method 'createdAt'
            dateModify : {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: 'order'
        }
    )
    return Order;
}

module.exports = orderBuilder;
