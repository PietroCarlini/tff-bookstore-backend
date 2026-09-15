//? It defines the rules for input data (add a new book to the catalogue).

//? It defines the rules for input data (add a new book to the catalogue).

const z = require('zod');

const bookStockedValidator = z.object({
    ISBN: z.string(
        {
            error: (issue) => issue.input === undefined ? 'ISBN is required' : 'ISBN needs to be a string'
        }
    ).max(13, 'ISBN cannot exceed 13 characters').trim(),

    title: z.string(
        {
            error: (issue) => issue.input === undefined ? 'A title is required' : 'Title needs to be a string'
        }
    ).max(200, 'Title cannot exceed 200 characters').trim(),

    author: z.string(
        {
            error: (issue) => issue.input === undefined ? 'An author is required' : 'Author needs to be a string'
        }
    ).max(300, 'Author cannot exceed 300 characters').trim(),

    genere: z.string(
        {
            error: (issue) => issue.input === undefined ? 'A genre is required' : 'Genre needs to be a string'
        }
    ).max(100, 'Genre cannot exceed 100 characters').trim(),

    publisher: z.string().max(200, 'Publisher cannot exceed 200 characters').trim().optional(),
    
    tag: z.string().max(200, 'Tag cannot exceed 200 characters').trim().optional(),

    price: z.number(
        {
            error: (issue) => issue.input === undefined ? 'A price is required' : 'Price needs to be a number'
        }
    ).positive('Price must be greater than 0'),

    stock: z.number(
        {
            error: (issue) => issue.input === undefined ? 'A stock quantity is required' : 'Stock needs to be a number'
        }
    ).int('Stock must be a whole number').min(0, 'Stock cannot be negative'),
    
    cover_url: z.string().max(2000, 'Cover URL cannot exceed 2000 characters').trim().optional(),
});

module.exports = bookStockedValidator;
