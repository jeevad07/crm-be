const express = require('express');
const router = express.Router();
const tokenvalidations =require('../middleware/verifyToken')

router.use('/global', require('./globalRoute'));
router.use('/company',require('./cadmin'));
router.use('/user',require('./users'))

module.exports = router;