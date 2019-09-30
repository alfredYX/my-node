const express = require('express');
const router = express.Router();
const fs = require("fs");
const image = require("imageinfo"); //引用imageinfo模块
const multer = require("multer");
const path = require('path')

const os=require('os');
let upload = multer({ dest: 'uploads/imgs/' })

let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/';

router.get('/', function (req, res) {
    res.send('This is home message!');
})

router.post('/uploads', upload.single('avatar'), function (req, res, next) { 

    let myjson = {
        code : 200,
        data : null
    }
    res.send(myjson)
 })

 function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
     var stat = fs.statSync(path + itm);
     if (stat.isDirectory()) {
      //递归读取文件
      readFileList(path + itm + "/", filesList)
     } else {
      var obj = {};//定义一个对象存放文件的路径和名字
      obj.path = path;//路径
      obj.filename = itm//名字
      filesList.push(obj);
     }
    })
 }

 var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
     var filesList = [];
     readFileList(path, filesList);
     return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {
     var imageList = [];
     this.getFileList(path).forEach((item) => {
      var ms = image(fs.readFileSync(item.path + item.filename));
      ms.mimeType && (imageList.push(item.filename))
     });
     return imageList;
    }
};

router.get('/getImg', function(req, res, next) {
    //获取文件夹下的所有图片
    let srclist = getFiles.getImageFiles(path.join(__dirname,'../../uploads/imgs/'));
    let srcNewList = srclist.reduce ( (rt, item) => {
        rt.push({'imsrc':item})
        return rt
    },[])

    let filePath = path.join(__dirname,'../../uploads/imgs/' + '1a84e05848df3743d70f7c0729de3efc'); //访问的本地图片路径
    // let myjson = {
    //     code : 200,
    //     data : {imgUrl:filePath}
    // }
    // res.send(myjson)
    res.download(filePath)
})

module.exports = router; 