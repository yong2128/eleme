const express = require("express");
const db = require("../../modules/db");
const common = require("../../modules/common");
const mongodb = require("mongodb");

//获取所有的店铺类别信息
module.exports.getShopTypeList = function (req, res) {
    db.find("shopTypeList", {}, function (err, allInfo) {
        var pageNum = 10;
        var shopTypeInfo = [];
        var sum = Math.ceil(allInfo.length / pageNum);
        for(var i = 0; i < sum;i ++){
            shopTypeInfo[i] = [];
            for(var j = i * pageNum;j < i * pageNum + pageNum && j < allInfo.length;j ++){
                shopTypeInfo[i].push(allInfo[j]);
            }
        }
        res.json({
            ok: 1,
            shopTypeInfo
        })
    })
}

function _insertCodeListInfo(phoneNum,code,res) {
    db.insertOne("codeShowList", {
        phoneNum,
        code,
        createTime: Date.now()
    }, function (err, results) {
        if (results.result.ok && results.result.n) {
            res.json({
                ok: 1,
                code
            });
        }
    });
}

//根据手机号获取验证码
module.exports.sendCode = function (req, res) {
    var code = common.getRandom(100000, 999999);
    var phoneNum = req.query.phoneNum;
    db.findOne("codeShowList", { phoneNum }, function (err, codeInfo) {
        if (codeInfo) {   //说明存在该手机号，验证验证码有没有过期
            if (codeInfo.createTime + 1 * 60 * 1000 > Date.now()) {   //说明验证码还没有过期
                var time = ((codeInfo.createTime + 1 * 60 * 1000 - Date.now()) / 1000).toFixed(2);
                res.json({
                    ok: 1,
                    msg: "您距离下一次发送验证码的时间还有" + time + "秒！"
                })
            } else {   //验证啊已过期
                _insertCodeListInfo(phoneNum, code,res);
            }
        } else {    //不存在该手机号，则将手机号及生成的验证码添加到codeList表中
            _insertCodeListInfo(phoneNum,code,res);
        }
    })
}

//登录或者注册
module.exports.loginAndRegister = function (req, res) {
    var phoneNum = req.body.phoneNum;
    var code = req.body.valiCode / 1;
    db.findOne("codeShowList", {
        phoneNum,
        code
    }, function (err, codeInfo) {
        if (codeInfo) {    //说明该手机号和验证码存在
            if((codeInfo.createTime + 1 * 60 * 1000) > Date.now()){   //说明验证码未过期
                db.findOne("userList", {
                    phoneNum
                }, function (err, userInfo) {
                    if (userInfo) {
                        res.json({
                            ok: 1,
                            phoneNum,
                            goldNum : userInfo.goldNum
                        })
                    } else {        //说明用户表中不存在该手机号码
                         db.insertOne("userList", {
                             phoneNum,
                             goldNum : 1000,
                             createTime: Date.now()
                         }, function (err, info) {
                             res.json({
                                 ok: 1,
                                 phoneNum,
                                 goldNum: 1000
                             });
                         })
                    }
                })
            } else {
                res.json({
                    ok: 0,
                    msg : "验证码过期！"
                });
            }
        } else {    //手机号或者密码不存在
            res.json({
                ok: 0,
                msg : "验证码错误！"
           })
        }
    })
}

//获取店铺列表
module.exports.getShopList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;     //当前页
    var pageNum = 10;        //每一页的条数

    db.count("shopList",{},function(count){
        var pageSum = Math.ceil(count.length / pageNum);    //总页数

        db.showGetShopAllInfo((pageIndex - 1) * pageNum , pageNum ,function(err,info){
            setTimeout(() => {
                res.json({
                    ok : 1,
                    info
                })
            }, 1000);
        })
    })
}

//通过店铺类别id获取店铺信息
module.exports.getShopInfo = function(req,res){
    db.getShopInfo(req.query.id,function(err,oneInfo){
        res.json({
            ok : 1,
            oneInfo
        })
    })
}

//根据店铺id获取店铺信息和商品类别信息
module.exports.getShopAndGoodsType = function(req,res){
    db.getShopAndGoodsType(req.query.id,function(err,info){
        res.json({
            ok : 1,
            info
        })
    })
}

//根据商品类别id获取商品信息
module.exports.getInfoByGoodsId = function(req,res){
    db.find("goodsList",{
        whereObj : {goodsTypeId : mongodb.ObjectId(req.query.id)}
    },function(err,info){
        res.json({
            ok : 1,
            info
        });
    })
}

//通过店铺id获取商品信息
module.exports.getAllInfoByShopId = function(req,res){
    db.getAllInfoByShopId(req.query.shopId,function(err,allInfo){
        res.json({
            ok : 1,
            allInfo
        });
    })
}

//更改用户金币
module.exports.upGold = function(req,res){
    var phoneNum = req.body.phoneNum;
    db.findOne("userList",{
        phoneNum
    },function(err,info){
        if(info){
            var money = info.goldNum / 1 - req.body.goldNum / 1;
            db.updateOne("userList",{
                phoneNum
            },{
                $set : {goldNum : money}
            },function(err,results){
                res.json({
                    ok : 1,
                    goldNum : money
                });
            })
        }
    })  
}

//根据商品的id获取商品的信息
module.exports.getGoodsInfoById = function(req,res){
    db.findOneById("goodsList",req.query.goodsId,function(err,info){
        res.json({
            ok : 1,
            info
        })
    })
}
