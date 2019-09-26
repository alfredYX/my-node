let express = require('express');
let router = express.Router();

let home = require('./home/home.js');
let shop = require('./shop/shop.js');

router.use('/', home);
router.use('/home', home);
router.use('/shop', shop);

module.exports = router;