const authentification = require('../middlewares/auth/authentificationMiddleware');
const requireBookshop = require('../middlewares/auth/requireBookshopMiddleware');
const bodyValidator = require('../middlewares/bodyValidatorMiddleware');
const bookStockedValidator = require('../validators/bookStocked/bookStockedValidator');
const bookStockedUpdateValidator = require('../validators/bookStocked/bookStockedUpdateValidator');
const bookStockedController = require('../controllers/bookStockedController')

const bookStockedRouter = require('express').Router();

// POST /api/catalogue -> create a new book 
bookStockedRouter.post('/',
    authentification(), //middleware (auth?)
    requireBookshop(), // middleware (bookshop?)
    bodyValidator(bookStockedValidator), // middleware (data ok? Using validator)
    bookStockedController.add //controller (HTTP req)
)

// PATCH /api/catalogue/:id -> update a single book
bookStockedRouter.patch('/:id',
    authentification(),
    requireBookshop(),
    bodyValidator(bookStockedUpdateValidator),
    bookStockedController.updateOne
)

// GET /api/catalogue -> list all books (with optional ?search=)
bookStockedRouter.get('/',
    authentification(),
    requireBookshop(),
    bookStockedController.getAll
)

// GET /api/catalogue/:id -> get a single book
bookStockedRouter.get('/:id',
    authentification(),
    requireBookshop(),
    bookStockedController.getOne
)

// DELETE /api/catalogue/:id -> delete a single book
bookStockedRouter.delete('/:id',
    authentification(),
    requireBookshop(),
    bookStockedController.delete
)

module.exports = bookStockedRouter;