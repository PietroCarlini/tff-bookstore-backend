/**
 * User builider
 * @param { Sequelize} sequelize 
 */

const { DataTypes } = require("sequelize");

const userBuilder = (sequelize) => {

    const User = sequelize.define(
        //ER table
        'user',
        //Obj defining attributes
        {
            id: {
                type : DataTypes.BIGINT,
                primaryKey : true,
                autoIncrement : true,
                autoIncrementIdentity : true
            },
            email: {
                type : DataTypes.STRING(320),
                allowNull: false,
                unique : 'UK_user_email'
            },
            password : {
                type : DataTypes.STRING(120),
                allowNull : false,
            },
            role : {
                type: DataTypes.ENUM('User', 'Admin'),
                allowNull : false,
                defaultValue : 'User'
            },
            is_active: {
                type : DataTypes.BOOLEAN,
                allowNull : false,
                defaultValue : true
            }
        },
        
        //DB table name
        {
            tableName : 'user'
        }
    )
    return User;
}

module.exports = userBuilder;