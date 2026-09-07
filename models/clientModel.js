/**
 * Client builider
 * @param { Sequelize} sequelize 
 */

const { DataTypes } = require ('sequelize');

const clientBuilder = (sequelize) => {
    
    const client = sequelize.define(

        //ER Table,
        'client',
        //Obj defining attributes
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey : true,
                autoIncrement : true,
                autoIncrementIdentity : true
            },
            
            firstname: {
                type: DataTypes.STRING(120),
                allowNull: false,
            },
            
            lastname: {
                type: DataTypes.STRING(120),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(320),
                allowNull: false
            },
        },
        //DB table name
        {
            tableName: 'client'
        }
    )
    return client;
}

module.exports = clientBuilder;
