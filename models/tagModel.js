/**
 * Tag builider
 * @param { Sequelize } sequelize 
 */

const { DataTypes } = require('sequelize');

const tagBuilder = (sequelize) => {
    const Tag = sequelize.define(
        'tag',
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
                autoIncrementIdentity: true
            },
            tagName: {
                type: DataTypes.STRING(120),
                allowNull: false,
            },
        },
        {
            tableName : 'tag'
        }
    )
    return Tag;
}

module.exports = tagBuilder