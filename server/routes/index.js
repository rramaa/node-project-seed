var _ = require('lodash'),
    express = require('express'),
    router = express.Router(),
    logger = require('../logger'),
    controllers = require('../controllers');

router.get('/', function(req, res, next) {
    res.render('index', {
        homeUrl:process.env.HOME_URL+":"+process.env.PORT
    });
});

module.exports = router;
