/**
 * Wishlist builider
 * @param { Sequelize } sequelize 
 */

const {DataTypes} = require('sequelize');


const wishlistBuilder = (sequelize) => {
    const Wishlist = sequelize.define (
        'wishlist',
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
            cover_url: {
                type: DataTypes.STRING(2000),
                allowNull: true
            },
        },
        {
            tableName: 'wishlist'
        },
    )
    return Wishlist;
}

module.exports = wishlistBuilder;