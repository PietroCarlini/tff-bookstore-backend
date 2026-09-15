const db = require('../models/config');
const authService = require('./authService')
const { Op } = require('sequelize');


const bookStockedService = {

    create: async (bookshopId, bookToAdd) => {
        try {
            const book = await db.BookStocked.create({ ...bookToAdd, bookshopId });
            return book;
        }
        catch (err) {
            throw new Error(err.message)
        }
    },

    getAllByBookshop: async (bookshopId, search) => {
        try {
            //TODO1) We chose a Bookshop ('where')
            const bookshop = { bookshopId }
            //If a search term is provided, filter by title/author/ISBN (case-insensitive)
            if (search) {
                //TODO2) Op.or: sequilize method; lwhich is used to say 'one condition OR the other OR yet another' within a WHERE clause.
                bookshop[Op.or] = [
                    //TODO3) Op.iLke: postgreSQL, case-insensitive
                    { title: { [Op.iLike]: `%${search}%` } },
                    { author: { [Op.iLike]: `%${search}%` } },
                    { ISBN: { [Op.iLike]: `%${search}%` } }
                ]
            }
            //TODO4) Obj with all results from search, that we find ina specific booksop
            const books = await db.BookStocked.findAll({ where: bookshop });

            //TODO5) NB: 'inOrder' is not a DB column, it's computed here: for each book, count OrderItem rows linked to it whose Order is not yet Collected/Canceled

            //Promise.all:  we wait all Promise to be returned; 
            const booksWithInOrder = await Promise.all(books.map
            //books.map (async (book)): foe each book in books there's a query
            (async (book) => {
                //db.orderItem.count: count how many order (not 'collected' or 'cancelled') of that book
                const inOrder = await db.OrderItem.count({
                    where: {bookStockedId: book.id},
                    include: {
                        model: db.Order,
                        where: {state: { [Op.notIn]: ['Collected', 'Canceled']}}
                    }
                });
                //Return ammount book + ammount inOrder
                return {...book.toJSON(), inOrder };
            }));
            
            //return same list + number of copy in order for each book
            return booksWithInOrder;
        }
        catch(err){
            throw new Error(err.message);
        }
    },

    //to find a specific book(id) in a specific bookshop(bookshopId)
    getByIdScoped: async (id, bookshopId) => {
        try {
            const book = await db.BookStocked.findOne({where: { id, bookshopId}});
            return book;
        }
        catch(err){
            throw new Error(err.message)
        }
    },

    update: async (id, bookshopId, dataToUpdate) => {
        try{
            //Find right book in right bookshop
            const book = await db.BookStocked.findOne({where: {id, bookshopId}});
            // if not found = null (404 error)
            if(!book) {
                return null;
            }
            //if found update(sequalize method) with dataToUpdate
            await book.update(dataToUpdate);
            return book;
        }
        catch (err) {
            throw new Error(err.message)
        }
    },

    remove: async (id, bookshopId) => {
        try {
            const book = await db.BookStocked.findOne({ where: { id, bookshopId} });
            if(!book) {
                return null;
            }
            //sequalize method to canceled db row
            await book.destroy();
            return book;
        }
        catch(err){
            throw new Error (err.message)
        }
    }
}

module.exports = bookStockedService;