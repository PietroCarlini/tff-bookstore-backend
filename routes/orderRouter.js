const authentification = require('../middlewares/auth/authentificationMiddleware');
const requireClient = require('../middlewares/auth/requireClientMiddleware');
const bodyValidator = require('../middlewares/bodyValidatorMiddleware');
const orderValidator = require('../validators/orders/orderValidator');
const orderController = require('../controllers/order/orderController');

const orderRouter = require('express').Router();

// POST /api/orders -> create a new order
orderRouter.post('/',
    authentification(),
    requireClient(),
    bodyValidator(orderValidator),
    orderController.create
)

module.exports = orderRouter;