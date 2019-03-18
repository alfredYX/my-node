let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/';
// 因为mongoDB的id主键是objectId的类型的，需要用到mongodb的ObjectId
var ObjectId = require('mongodb').ObjectId; 
// 增加
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("data");
//     var myobj = [
//         {_id: 1, name: "firstData", detail: null},
//         {_id: 2,name: "secondData", detail: '第二条数据'},
//         {_id: 3,name: "thirdData", detail: null}
//     ]
//     dbo.collection("data").insertMany(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("文档插入成功");
//         db.close();
//     });
// });

// 查询
// MongoClient.connect(url, { useNewUrlParser: true },function (err, db) {
//     if (err) throw err;
//     let dbo = db.db("data");
//     let whereStr = {"_id": ObjectId('5c8dea6b1b790b6a2658f53c')};
//     dbo.collection("data").find(whereStr).toArray(function (err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });

// 更新
// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     let dbo = db.db("data");
//     let whereStr = {_id: 1};
//     let updateStr = {$set: {'detail': '第一条数据更新'}}
//     dbo.collection("data").updateOne(whereStr, updateStr, function (err, res) {
//         if (err) throw err;
//         console.log("文档更新成功");
//         db.close();
//     });
// });

//删除
// MongoClient.connect(url, { useNewUrlParser: true },function (err, db) {
//     if (err) throw err
//     let dbo = db.db('data')
//     let whereStr = {"_id": '5c8dea6b1b790b6a2658f53c'}
//     dbo.collection('data').deleteOne(whereStr, (err, obj) => {
//         if (err) throw err
//         console.info('删除成功')
//         db.close()
//     })
// })

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("data");
//     dbo.collection("data").find().limit(1).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });