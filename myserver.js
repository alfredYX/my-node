let express = require('express');
var bodyParser = require("body-parser");  
let app = express();

let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/';
let ObjectId = require('mongodb').ObjectId; 

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

app.get('/', function (req, res) {
res.send('This is test message!');
})

app.get('/get', function (req, res) { //查询的代码
    MongoClient.connect(url, {useNewUrlParser:true},function (err, db) {
        if (err) throw err;
        let dbo = db.db("data");
        dbo.collection("data").find().toArray(function (err, result) { // 返回集合中所有数据
            if (err) throw err;
            let myjson = {
                code : 200,
                data : result
            }
            res.send(myjson);            
            db.close();
        });
    });

})

app.post('/add',function (req, res) { //添加的代码
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("data");
        dbo.collection("data").insertOne(req.body, function(err, result) {
        if (err) throw err;
        let myjson = {
            code : 200,
            data : true,
            msg:'文档插入成功'
        }
        console.log("文档插入成功");
        res.send(myjson);
        db.close();
    });
    });

})

app.post('/edit',function (req, res) { //添加的代码
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("data");
        let whereStr = {"_id":ObjectId(req.body._id)}
        let updateStr = {$set: {'name': req.body.name,'price':req.body.price}}
        dbo.collection("data").updateOne(whereStr, updateStr, function (err, result) {
            if (err) throw err;
            let myjson = {
                code : 200,
                data : true,
                msg:'文档更新成功'
            }
            console.log("文档更新成功");            
            res.send(myjson);
            db.close();
        });
    });

})

app.post('/delete',function (req, res) { //添加的代码
    MongoClient.connect(url, { useNewUrlParser: true },function (err, db) {
        if (err) throw err;
        let dbo = db.db("data");
        let whereStr = {"_id": ObjectId(req.body._id)};
        dbo.collection('data').deleteOne(whereStr, (err, obj) => {
            if (err) throw err
            let myjson = {
                code : 200,
                data : true,
                msg:'文档删除成功'
            }
            console.info('删除成功')
            res.send(myjson);
            db.close()
        })
    })    
})

let server = app.listen(8081, function () {
let host = server.address().address
let port = server.address().port
console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
