const bodyValidator = require('../middlewares/bodyValidatorMiddleware');
const authUserValidator = require('../validators/auth/authUserValidator');
const authController = require('../controllers/authController')
const authLoginValidator = require('../validators/auth/authLoginValidator')
const authentification = require('../middlewares/auth/authentificationMiddleware')
const roleAuthorization = require('../middlewares/auth/roleAuthMiddleware')
const updateProfileValidator = require('../validators/user/updateProfileValidator');
const userController = require('../controllers/userContoller');
const authBookshopValidator = require ('../validators/auth/authBookshopValidator')

const authRouter = require('express').Router();

authRouter.post('/register',
    bodyValidator(authUserValidator),
    authController.register
)

authRouter.post('/register-bookshop',
    bodyValidator(authBookshopValidator),
    authController.registerBookshop
)

authRouter.post('/login',
    bodyValidator(authLoginValidator),
    authController.login
)

authRouter.get('/me',
    authentification(),
    authController.me
)

authRouter.patch('/me',
    bodyValidator(updateProfileValidator),
    authentification(),
    userController.updateProfile
)

//NB: test route for 'roleAuthorization' Admin
authRouter.get('/admin/only',
    authentification(),
    roleAuthorization(['Admin']),
    (req,res) => res.status(200).json({ status: 200, message: 'Welcome Admin'})
)

module.exports = authRouter