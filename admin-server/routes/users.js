var express = require('express');
var router = express.Router();
var respTool = require('../resp_desc')
var mongodb = require('../mongodbTool')
var crypto = require('crypto'); // 加密模块
const jwt = require('jsonwebtoken');


/* GET users listing. */
router.post('/login', function (req, res) {
  let username = req.body.username;
  let pwd = req.body.password;

  let md5 = crypto.createHash('md5'); // 创建一个MD5加密方法
  // 对用户名进行加密处理
  let password = md5.update(pwd).digest('hex');

  mongodb.queryCollectionData('adminReact', 'user', { username, password }).then((data, err) => {
    if (err) {
      res.send(respTool.respneseDateFormatter(-1, null, respTool.STATE_DB_ERROR));
    } else {
      if (data.length == 0) { //没找到数据
        res.send(respTool.respneseDateFormatter(-1, null, "账号或密码错误"));
      } else {

        if (data[0].password === password) {
          jwt.sign(data[0], 'abcdef', function (err, token) {
            if (err) {
              res.send(respTool.respneseDateFormatter(-1, null, "登录失败"));
              return;
            }
            res.cookie('token', token);
            res.send(respTool.respneseDateFormatter(1, {
              user: { username: data[0].username, userid: data[0]._id }
            }));
          });
        } else {
          res.send(respTool.respneseDateFormatter(-1, null, "账号或密码错误"));
        }
      }
    }
  }).catch((err) => {
    console.error(err);
    res.send(respTool.respneseDateFormatter(-1, null, respTool.STATE_DB_ERROR));
  })
});



module.exports = router;
