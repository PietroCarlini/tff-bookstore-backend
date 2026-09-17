// creation of app main "Router"
const express = require('express');
const router = express.Router();

const authRouter = require('./authRouter');
router.use('/auth', authRouter);

const bookStockedRouter = require('./bookStockedRouter');
router.use('/catalogue', bookStockedRouter)

const orderRouter = require('./orderRouter');
router.use('/orders', orderRouter)

const wishlistRouter = require('./wishlistRouter');
router.use('/toread', wishlistRouter)

const bookTrackingRouter = require('./bookTrackingRouter');
router.use('/read', bookTrackingRouter)

const googleBookRouter = require('./googleBookRouter');
router.use('/books', googleBookRouter)

const bookshopRouter = require('./bookshopRouter');
router.use('/bookshops', bookshopRouter)

module.exports = router;