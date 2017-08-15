var router = require('express').Router()

router.use('/api', require('./api'));
router.use('/webhooks', require('./webhooks'));

module.exports = router;
