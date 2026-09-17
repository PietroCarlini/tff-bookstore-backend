const authentification = require('../middlewares/auth/authentificationMiddleware');
const bookshopController = require('../controllers/bookshopController');

const bookshopRouter = require('express').Router();

// GET /api/bookshops -> list all bookshops (any logged-in user, needed for the client order dropdown)
bookshopRouter.get('/',
    authentification(),
    bookshopController.getAll
);

module.exports = bookshopRouter;