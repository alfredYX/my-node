let express = require('express');
let router = express.Router();

let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/';
let ObjectId = require('mongodb').ObjectId; 

router.get('/', function (req, res) {
    res.send('This is home message!');
})

module.exports = router; 