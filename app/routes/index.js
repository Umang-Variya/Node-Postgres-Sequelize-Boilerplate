const express = require('express')
const router = express.Router();

const tutorial = require('./tutorials');
const user = require('./user')

router.use('/tutorial', tutorial)
router.use('/users', user)

module.exports = router;