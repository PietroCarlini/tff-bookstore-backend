const authentification = require('../middlewares/auth/authentificationMiddleware');
const requireClient = require('../middlewares/auth/requireClientMiddleware');
const requireBookshop = require('../middlewares/auth/requireBookshopMiddleware');
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

// GET /api/orders/mine -> list all orders for the logged-in client
orderRouter.get('/mine',
    authentification(),
    requireClient(),
    orderController.getMine
)

// GET /api/orders/bookshop -> list all orders for the logged-in bookshop
orderRouter.get('/bookshop',
    authentification(),
    requireBookshop(),
    orderController.getBookshopOrders
)



module.exports = orderRouter;