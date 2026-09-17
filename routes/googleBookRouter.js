const googleBookController = require('../controllers/googleBookController');

const googleBookRouter = require('express').Router();

// It must come before /:volumeId, otherwise “search” would be interpreted as a volumeId ==> express reads route in order!!
googleBookRouter.get('/search', googleBookController.search);

// Generic pattern(use params: see googleBookontroller); goes under specific routes such as /search 
googleBookRouter.get('/:volumeId', googleBookController.getDetails);

module.exports = googleBookRouter;