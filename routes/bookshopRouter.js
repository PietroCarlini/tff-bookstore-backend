const authentification = require('../middlewares/auth/authentificationMiddleware');
const requireBookshop = require('../middlewares/auth/requireBookshopMiddleware');
const bodyValidator = require('../middlewares/bodyValidatorMiddleware');
const updateBookshopValidator = require('../validators/bookshop/updateBookshopValidator');
const bookshopController = require('../controllers/bookshopController');

const bookshopRouter = require('express').Router();

// GET /api/bookshops -> list all bookshops (any logged-in user, needed for the client order dropdown)
bookshopRouter.get('/',
    authentification(),
    bookshopController.getAll
);

// GET /api/bookshops/me -> data of the logged-in bookshop (bookshop role only)
bookshopRouter.get('/me',
    authentification(),
    requireBookshop(),
    bookshopController.getBookshopDetails
);

// PATCH /api/bookshops/me -> the logged-in bookshop updates its own data (bookshop role only)
bookshopRouter.patch('/me',
    authentification(),
    requireBookshop(),
    bodyValidator(updateBookshopValidator),
    bookshopController.updateBookshop
);

module.exports = bookshopRouter;