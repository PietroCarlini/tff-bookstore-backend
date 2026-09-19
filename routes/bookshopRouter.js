const authentification = require('../middlewares/auth/authentificationMiddleware');
const requireBookshop = require('../middlewares/auth/requireBookshopMiddleware');
const bodyValidator = require('../middlewares/bodyValidatorMiddleware');
const bookshopUpdateValidator = require('../validators/bookshop/bookshopUpdateValidator');
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

// PATCH /api/bookshops/me -> update the data of the logged-in bookshop
bookshopRouter.patch('/me',
    authentification(),
    requireBookshop(),
    bodyValidator(bookshopUpdateValidator),
    bookshopController.updateBookshopDetails
);

module.exports = bookshopRouter;