const express = require('express');
const router = express.Router();
const commen = require('../commen.js');
const path = require('path');
const fs = require('fs');

//判断用户和密码是否正确的接口,正确返回'true'，不正确返回'false';
router.get('/login', (req, res) => {
    const uname = req.query.uname;
    const upwd = req.query.upwd;
   
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    if (!commen.testAccount(uname)) {  
        res.end('false');
        return;
    }
    if (!commen.testPassword(upwd)) {
        res.end('false');
        return;
    }
    let queryAccount = `select * from user where account='${uname}' and password='${upwd}'`
    req.db.driver.execQuery(queryAccount, (err, arry) => {
        if (err) throw err;
        if (arry.length) {
            res.end('true');
        } else {
            res.end('false');
        }
    })
});
//用户名查询接口，存在返回true不存在返回false;
router.get('/hasregist', (req, res) => {
    const account = req.query.account;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    if (!commen.testAccount(account)) {
        res.end('true');
        return;
    }
    let hasAccount = `select * from user where account='${account}'`;
    req.db.driver.execQuery(hasAccount, (err, arry) => {
        if (err) throw err;
        if (arry.length != 0) {
            res.end('true');
        } else {
            res.end('false');
        }
    })
});
//用户注册接口,注册成功返回'true',注册失败返回'false';
router.get('/regist', (req, res) => {
    // console.log(req.query);
    const account = req.query.account;
    const password = req.query.password;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    if (!commen.testAccount(account)) {
        res.end('false');
        return;
    }
    if (!commen.testPassword(password)) {
        res.end('false');
        return;
    }
    let hasAccount = `select * from user where account='${account}'`;
    req.db.driver.execQuery(hasAccount, (err, arry) => {
        if (err) throw err;
        if (arry.length != 0) {
            res.end('false');
        } else {
            let regist =`insert into user (account,password) value ('${account}','${password}')`;
            req.db.driver.execQuery(regist, (err, data) => {
                if (err) throw err;
                // console.log(data);
                res.end('true');
            })
        }
    })
});
//密码修改接口，修改成功返回'true',修改失败返回'false';
router.get('/updatapwd', (req, res) => {
    const account = req.query.account;
    const password = req.query.password;
    const updatapwd = req.query.updatapwd;
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    if (!commen.testAccount(account)) {
        res.end('false');
        return;
    }
    if (!commen.testPassword(password)) {
        res.end('false');
        return;
    }
    if (!commen.testPassword(updatapwd)) {
        res.end('false');
        return;
    }
    let updata = `select * from user where account='${account}' and password='${password}'`;
    req.db.driver.execQuery(updata, (err, arry) => {
        if (err) throw err;
        if (arry.length != 0) {
            let changepwd = `update user set password='${updatapwd}' where account='${account}'`;
            req.db.driver.execQuery(changepwd, (err, data) => {
                if (err) throw err;
                res.end('true');
            });
        } else {
            res.end('false');
        }
    });
});
//图片上传接口
// router.post('/upload', (req, res) => {
//     // console.log(req)
//     var imgsays = [];
//     var num = 0;
//     var isStart = false;
//     var ws;
//     var filename;
//     var paths;
//     req.on('data', function (chunk) {
//         var start = 0;
//         var end = chunk.length;
//         var rems = [];

//         for (var i = 0; i < chunk.length; i++) {
//             if (chunk[i] == 13 && chunk[i + 1] == 10) {
//                 num++;
//                 rems.push(i);

//                 if (num == 4) {
//                     start = i + 2;
//                     isStart = true;

//                     var str = (new Buffer(imgsays)).toString();
//                     // console.log(str);
//                     // filename = str.match(/filename=".*"/g)[0].split('"')[1];
//                     filename = 'admin'+str.match(/filename=".*"/g)[0].split('"')[1];
//                     paths = './static/' + filename;
//                     ws = fs.createWriteStream(paths);

//                 } else if (i == chunk.length - 2) { //说明到了数据尾部的\r\n
//                     end = rems[rems.length - 2];
//                     break;
//                 }
//             }

//             if (num < 4) {
//                 imgsays.push(chunk[i])
//             }
//         }

//         if (isStart) {
//             ws.write(chunk.slice(start, end));
//         }
//     });

//     req.on("end", function () {
//         ws.end();
//         console.log("保存" + filename + "成功");
//         res.writeHead(200, {
//             'Content-Type': 'text/html;charset=utf-8'
//         });
//         res.end('<div id="path">' + paths + '</div>');
//     });
// });
//添加新闻接口
router.post('/addnews',(req,res)=>{
   
    const title = req.body.title;
    const describes = req.body.describes;
    const content = req.body.content;
    const uname = req.body.uname;
    const categorys =req.body.categorys
    const imgArr = req.body.imgArr
    const date = +new Date();
  

            let regist =`insert into newsinfo (title,describes,content,uname,date,imgArr,categorys) values('${title}','${describes}','${content}','${uname}','${date}','${imgArr}','${categorys}');`;
            // let s = `select * from news where title="测试1"`;
            // console.log(regist);
            
            req.db.driver.execQuery(regist, (err, data) => {
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                if (err) {
                     res.end('false');
                };
                // console.log(data);
                res.end('true');
            })
  
    
})

//用户所有新闻查询接口
router.get('/getnews',(req,res)=>{
     const uname = req.query.uname;
     const page  = req.query.page||1;
     const checkSql =`select title,describes,date from newsinfo where uname='${uname}'`;
     req.db.driver.execQuery(checkSql,(err,newsArry)=>{
           if(err) throw err;
           var obj = {};
           obj.totalLength = newsArry.length;
           const count = (page-1)*5;
           const pageSql =`select title,describes,date from newsinfo where uname='${uname}' limit ${count},5`;
           req.db.driver.execQuery(pageSql,(errs,pageNewsArry)=>{
                obj.datas = pageNewsArry;
                res.setHeader('Content-Type', 'text/html;charset=utf-8');
                res.end(JSON.stringify(obj));
           })
           
     });
});
//用户关键字新闻查询
router.get('/getkeynews',(req,res)=>{
   
        const page  = req.query.page||1;
        const keys =  req.query.keys;
        const uname = req.query.uname;
        const searchSql =`select title,describes,date from newsinfo where uname='${uname}' and title like '%${keys}%'`;
        req.db.driver.execQuery(searchSql,(err,newsArry)=>{
            if(err) throw err;
            var obj = {};
            obj.totalLength = newsArry.length;
            const count = (page-1)*5;
            const pageSql =`select title,describes,date from newsinfo where uname='${uname}' and title like '%${keys}%' limit ${count},5`;
            req.db.driver.execQuery(pageSql,(errs,pageNewsArry)=>{
                    obj.datas = pageNewsArry;
                    res.setHeader('Content-Type', 'text/html;charset=utf-8');
                    res.end(JSON.stringify(obj));
            })
            
        });
})
//用户传来时间戳和用户名修改某项新闻,返回这条新闻
router.get('/getchangenews',(req,res)=>{

     const timestamp = req.query.timestamp;
     const uname = req.query.uname;
     const sqlStr =`select * from newsinfo where date='${timestamp}' and uname='${uname}'`;
     req.db.driver.execQuery(sqlStr,(err,oneArray)=>{
          if(err) throw err;
          res.setHeader('Content-Type', 'text/html;charset=utf-8');
          res.end(JSON.stringify(oneArray)); 
     })
})
//根据用户传来的时间戳和用户名以及要修改的数据，修改某项新闻，修改成功返回true,修改失败返回false
router.post('/changenews',(req,res)=>{
    const timestamp = req.body.timestamp;
    const uname =req.body.uname;
    const title = req.body.title;
    const describes = req.body.describe;
    const content = req.body.content;
    const categorys = req.body.category;
    const sqlStr = `update newsinfo set title='${title}',content='${content}',describes='${describes}',categorys='${categorys}' where date='${timestamp}' and uname='${uname}'`;
    // console.log(sqlStr);
    req.db.driver.execQuery(sqlStr,(err,changeResult)=>{
         if(err) throw err;
        //  console.log(changeResult);
         res.setHeader('Content-Type', 'text/html;charset=utf-8');
         if(changeResult){
            res.end('true');
            return;
         }
         res.end('false');
         
    })
})
//根据用户传来的用户名和时间戳，删除这条数据
router.get('/deletenews',(req,res)=>{
     const timestamp = req.query.timestamp;
     const uname =req.query.uname;
     const deleteSql = `delete from newsinfo where uname='${uname}' and date='${timestamp}'`;
    //  console.log(deleteSql);
     req.db.driver.execQuery(deleteSql,(err,result)=>{
          if(err) throw err;
        //   console.log(result);
          res.setHeader('Content-Type', 'text/html;charset=utf-8');
          res.end('true'); 
     })
})
//-------------------------------前台显示页面的api---------------------------------------
// 首页类别每类6张消息
// router.get('/webgetnews',(req,res)=>{
//     const category = req.query.category;
//     // console.log(category);
//     const sqlStr = `select title,imgArr,categorys from newsinfo where categorys='${category}' limit 0,6`;
//     req.db.driver.execQuery(sqlStr,(err,datas)=>{
//         if(err) throw err;
//         res.setHeader('Content-Type', 'text/html;charset=utf-8');
//         // console.log(datas);
//         res.end(JSON.stringify(datas));
//     }) 
// })
// 类别查询
router.get('/webgetkeynews',(req,res)=>{
   
        const page  = req.query.page||1;
        const category =  req.query.category;
        const count = (page-1)*20;
        const searchSql =`select title,describes,uname,date,imgArr,categorys from newsinfo where categorys='${category}' limit ${count},20`;
        req.db.driver.execQuery(searchSql,(err,newsArry)=>{
            if(err) throw err;
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(JSON.stringify(newsArry));
        });
})
// 根据时间戳获取单个新闻信息
router.get('/webgetsinglenews',(req,res)=>{
       const timestamp = req.query.timestamp;
    //    console.log(timestamp);
       const searchSql =`select * from newsinfo where date='${timestamp}'`;
       req.db.driver.execQuery(searchSql,(err,newsArry)=>{
            if(err) throw err;
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(JSON.stringify(newsArry));
       })
});

// 随机获取数据库的10条数据
router.get('/webgetrandnews',(req,res)=>{
    const sqlStr = `SELECT title,date FROM newsinfo WHERE id>=((SELECT MAX(id) FROM newsinfo)-(SELECT MIN(id) FROM newsinfo)) * RAND() + (SELECT MIN(id) FROM newsinfo)  LIMIT 10`;
    req.db.driver.execQuery(sqlStr,(err,newsArry)=>{
         res.setHeader('Content-Type', 'text/html;charset=utf-8');
         res.end(JSON.stringify(newsArry));
    })
})

exports.router = router;