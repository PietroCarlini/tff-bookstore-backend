const bodyValidator = require('../middlewares/bodyValidatorMiddleware');
const authUserValidator = require('../validators/auth/authUserValidator');
const authController = require('../controllers/authController')
const authLoginValidator = require('../validators/auth/authLoginValidator')
const authentification = require('../middlewares/auth/authentifictionMiddleware')

const authRouter = require('express').Router();

authRouter.post('/register',
    bodyValidator(authUserValidator),
    authController.register
)

authRouter.post('/login',
    bodyValidator(authLoginValidator),
    authController.login
)

authRouter.get('/me',
    authentification(),
    authController.me
)

module.exports = authRouter