const authentification = require('../middlewares/auth/authentificationMiddleware');
const requireClient = require('../middlewares/auth/requireClientMiddleware');
const bodyValidator = require('../middlewares/bodyValidatorMiddleware');
const wishlistContoller = require('../controllers/wishlistContoller')
const wishlistValidator = require('../validators/user/wishlistValidator')


const wishlistRouter = require('express').Router();

wishlistRouter.post('/',
    authentification(),
    requireClient(),
    bodyValidator(wishlistValidator),
    wishlistContoller.add
);

wishlistRouter.get('/mine',
    authentification(),
    requireClient(),
    wishlistContoller.getMine
);

wishlistRouter.delete('/:isbn',
    authentification(),
    requireClient(),
    wishlistContoller.remove
);

module.exports = wishlistRouter;