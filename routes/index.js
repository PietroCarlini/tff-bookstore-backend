// creation of app main "Router"
const express = require('express');
const router = express.Router();

const authRouter = require('./authRouter');
router.use('/auth', authRouter);

const bookStockedRouter = require('./bookStockedRouter');
router.use('/catalogue', bookStockedRouter)




module.exports = router;