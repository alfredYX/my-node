let express = require('express');
let router = express.Router();

let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/';
let ObjectId = require('mongodb').ObjectId; 


router.get('/', function (req, res) {
    res.send('This is shop message!');
})

router.get('/get', function (req, res) { //查询
    MongoClient.connect(url, {useNewUrlParser:true},function (err, db) {
        if (err) throw err;
        let dbo = db.db("data");
        let whereStr = null
        if(req.query.name){
            whereStr = {"name": {$regex: '.*' + req.query.name + '.*'}}
        }
        dbo.collection("data").find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
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

router.post('/add',function (req, res) { //添加
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

router.post('/edit',function (req, res) { //编辑
    MongoClient.connect(url, { useNewUrlParser: true },function (err, db) {
        if (err) throw err;
        let dbo = db.db("data");
        let whereStr = {"_id":ObjectId(req.body._id)}
        let {_id,...params} = req.body
        let updateStr = {$set: {...params}}
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

router.post('/delete',function (req, res) { //删除
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

module.exports = router; 
