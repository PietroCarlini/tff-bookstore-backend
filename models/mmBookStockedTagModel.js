/**
 * MM_BookStocked_Tag builider
 * @param { Sequelize } sequelize 
 */

const { DataTypes } = require('sequelize');

const bookStockedTagBuilder = (sequelize) => {
    const MM_BookStocked_Tag = sequelize.define(
        'mm_bookStocked_tag',
        {
            bookId: {
                type: DataTypes.BIGINT,
                primaryKey: true,
            },
            tagId: {
                type: DataTypes.BIGINT,
                primaryKey: true,
            }
        },
        {
            tableName : 'mm_bookStocked_tag'
        }
    )
    return MM_BookStocked_Tag;
}

module.exports = bookStockedTagBuilder;