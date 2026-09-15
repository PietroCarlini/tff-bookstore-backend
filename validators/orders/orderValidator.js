const z = require('zod');

const orderValidator = z.object({
    bookshopId: z.number(
        {
            error: (issue) => issue.input === undefined ? 'A bookshop is required' : 'BookshopId needs to be a number'
        }
    ).int().positive(),
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
    cover_url: z.string().max(2000, 'Cover URL cannot exceed 2000 characters').trim().optional(),
    message: z.string().max(1000, 'Message cannot exceed 1000 characters').trim().optional()
});

module.exports = orderValidator;