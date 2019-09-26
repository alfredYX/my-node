let express = require('express');
let bodyParser = require("body-parser");  
let route = require('./routes/index.js')
 
let app = express();   
 
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");  // 与前端请求头一直
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(route); // 路由引入

let server = app.listen(8081, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})