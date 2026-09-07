/**
 * BookTracking builider
 * @param { Sequelize } sequelize 
 */

const {DataTypes} = require('sequelize');


const bookTrackingBuilder = (sequelize) => {
    const BookTracking = sequelize.define (
        'bookTracking',
        {
            id : {
                type : DataTypes.BIGINT,
                primaryKey : true,
                autoIncrement : true,
                autoIncrementIdentity: true
            },
            ISBN : {
                type: DataTypes.STRING(13),
                allowNull: false,
            },
            title : {
                type: DataTypes.STRING(200),
                allowNull: false
            },
            author : {
                type: DataTypes.STRING(300),
                allowNull: false
            },
            cover_url : {
                type: DataTypes.STRING(2000),
                allowNull: true
            },
            feedback : {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            tableName: 'bookTracking'
        },
    )
    return BookTracking;
}

module.exports = bookTrackingBuilder;