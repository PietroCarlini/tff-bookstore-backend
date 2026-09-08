const bodyValidator = require('../middlewares/bodyValidatorMiddleware');
const authUserValidator = require('../validators/auth/authUserValidator');
const authController = require('../controllers/authController')

const authRouter = require('express').Router();

authRouter.post('/register',
    bodyValidator(authUserValidator),
    authController.register
)

// authRouter.post('/login',
//     bodyValidator(authUserValidator),
//     authController.login
// )

module.exports = authRouter