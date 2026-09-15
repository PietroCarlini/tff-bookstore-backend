const authentification = require('../middlewares/auth/authentificationMiddleware');
const requireClient = require('../middlewares/auth/requireClientMiddleware');
const bodyValidator = require('../middlewares/bodyValidatorMiddleware');
const bookTrackingController = require('../controllers/bookTrackingController');
const bookTrackingValidator = require('../validators/user/bookTrackingValidator');

const bookTrackingRouter = require('express').Router();

bookTrackingRouter.post('/',
    authentification(),
    requireClient(),
    bodyValidator(bookTrackingValidator),
    bookTrackingController.add
);

bookTrackingRouter.get('/mine',
    authentification(),
    requireClient(),
    bookTrackingController.getMine
);

bookTrackingRouter.delete('/:isbn',
    authentification(),
    requireClient(),
    bookTrackingController.remove
);

module.exports = bookTrackingRouter;