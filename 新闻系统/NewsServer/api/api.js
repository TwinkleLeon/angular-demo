const express = require('express');
const orm = require('orm');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');  
const localip = '127.0.0.1';
const app = express();
// app.use(busboy());  
// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.post('/upload', urlencodedParser, function (req, res) {
//   if (!req.body) return res.sendStatus(400)
//   res.send('welcome, ' + req.body.username)
// })

app.use(orm.express("mysql://leon:leon123@127.0.0.1/runoob", {
    define: function (db, models, next) {
        console.log('数据库连接成功！');
        next();
    }   

}));

//允许跨域
app.all('*', function(req, res, next) {
    //消除中文乱码
	res.set('Content-Type','appli  cation/json;charset=utf-8');
    //设置跨域
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// 设置路由
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//文件上传的路径设置
// app.use(bodyParser({ uploadDir: "../src/public/upload" }));  



const routesAPI = require('./router/apiRouter.js')
app.use('/api',routesAPI.router);
//监听端口
app.listen(9090,localip,(err)=>{
      if(err) throw err;
      console.log('服务器已经开启！'+ localip + ':9090');
});