const express = require("express");
const db = require("../../modules/db");
const common = require("../../modules/common");
const mongodb = require("mongodb");
const {upPic} = require("../../modules/upPic");
const fs = require("fs");

/***********************商品类别**************************/
//根据店铺id获取店铺和店铺类别的信息
module.exports.getAll = function(req,res){
    db.getAll(req.query.shopId,function(err,allInfo){
        res.json({
            ok : 1,
            allInfo,
        });
    });
}
//修改商品信息
module.exports.upGoods = function(req,res){
    upPic(req,"goodsPic",function(obj){
        if(obj.ok === 2){  //修改未成功
            common.end(res,0,obj.msg);
        }else{
            var upObj = {
                $set : {
                    goodsName : obj.params.goodsName,
                    shopId : mongodb.ObjectId(obj.params.shopId),
                    isHot : obj.params.isHot,
                    goodsPrice : obj.params.goodsPrice,
                    goodsOrder : obj.params.goodsOrder,
                    goodsTypeId : mongodb.ObjectId(obj.params.goodsTypeId),
                    shopTypeId : mongodb.ObjectId(obj.params.shopTypeId)
                }
            }
            if(obj.newPicName){
                upObj.$set.goodsPic = obj.newPicName;
            }
            db.updateOneById("goodsList",obj.params.goodsId,upObj,function(err,results){
                if(results.result.ok){
                    common.end(res,1,"修改商品信息成功！");
                }else{
                    common.end(res,0,"修改商品信息失败！");
                }
            })
        }
    })
}

//根据商品id获取商品信息
module.exports.getGoodsInfoById = function(req,res){
    db.findOneById("goodsList",req.query.id,function(err,oneInfo){
        res.json({
            ok : 1,
            oneInfo
        });
    })
}

//删除商品
module.exports.deleteGoods = function(req,res){
    db.findOneById("goodsList",req.query.id,function(err,info) {
        fs.unlink("./upload/" + info.goodsPic, function (err) {
            db.deleteOneById("goodsList",req.query.id,function(err,results){
                if(!err && results.result.ok && results.result.n){
                    res.json({
                        ok : 1,
                        msg : "删除商品成功！"
                    });
                }else{
                    res.json({
                        ok : 0,
                        msg : "删除商品失败！"
                    });
                }
            })
        })
    });
}

//根据店铺id查找商品类别信息
module.exports.getGoodsTypeInfo = function(req,res){
    db.find("goodsTypeList",{
        whereObj : {shopId : mongodb.ObjectId(req.query.id)}
    },function(err,goodsTypeList){
        res.json({
            ok : 1,
            goodsTypeList
        });
    })
}

//查找所有店铺信息
module.exports.getInfo = function(req,res){
    db.find("shopList",{},function(err,shopList){
        res.json({
            ok : 1,
            shopList
        });
    })
}

//根据商品类别id删除商品类别信息
module.exports.deleteGoodsTypeInfo = function(req,res){
    db.deleteOneById("goodsTypeList",req.query.goodsTypeId,function(err,results){
        if(!err && results.result.ok && results.result.n){
            res.json({
                ok : 1,
                msg : "删除商品类别成功！"
            });
        }else{
            res.json({
                ok : 0,
                msg : "删除商品类别失败！"
            });
        }
    })
}

//根据商品类别id修改商品类别信息
module.exports.upGoodsTypeList = function(req,res){
    var goodsTypeName = req.body.goodsTypeName;
    var goodsTypeOrder = req.body.goodsTypeOrder / 1;
    var shopId =  req.body.shopId;
    var shopTypeId = req.body.shopTypeId;
    db.updateOneById("goodsTypeList",req.body.goodsTypeId,{
        $set : {goodsTypeName,goodsTypeOrder,shopId : mongodb.ObjectId(shopId),shopTypeId : mongodb.ObjectId(shopTypeId)}
    },function(err,results){
        if(!err && results.result.n && results.result.ok){
            res.json({
                ok : 1,
                msg : "修改成功！"
            });
        }else{
            res.json({
                ok : 0,
                msg : "修改失败！"
            });
        }
    })
}

//根据商品类别id查找店铺信息和店铺类别信息
module.exports.getGoodsTypeAllInfo = function(req,res){
    db.getGoodsTypeAllInfo(req.query.goodsTypeId,function(err,allInfo){
        res.json({
            ok : 1,
            allInfo
        });
    })
}

//根据商品类别id查询店铺信息
module.exports.getShopByGoodsTypeId = function(req,res){
    db.getShopByGoodsTypeId(req.query.goodsTypeId,function(err,shopInfo){
        res.json({
            ok : 1,
            shopInfo
        });
    })
}

//根据店铺类别id查找店铺
module.exports.getShopById = function(req,res){
    db.find("shopList",{
        sortObj : {addTime : -1},
        whereObj : {shopTypeId : mongodb.ObjectId(req.query.shopTypeId)}
    },function(err,shopInfo){
        res.json({
            ok : 1,
            shopInfo
        });
    })
}

//添加商品类别
module.exports.addGoodsTypeList = function(req,res){
    db.insertOne("goodsTypeList",{
        goodsTypeName : req.body.goodsTypeName,
        goodsTypeOrder : req.body.goodsTypeOrder / 1,
        shopId : mongodb.ObjectId(req.body.shopId),
        shopTypeId : mongodb.ObjectId(req.body.shopTypeId),
        addTime : Date.now()
    },function(err,{result}){
        if(!err && result.ok && result.n){
            common.end(res,1,"添加商品类别成功！");
        }else{
            common.end(res,0,"添加商品类别失败！");
        }
    })
}

//获取商品类别列表（多表联查）
module.exports.getGoodsTypeList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var goodsTypeName = req.query.goodsTypeName;
    var goodsTypeOrder = req.query.goodsTypeOrder / 1 || 0;
    var pageSum = 1;
    var pageNum = 6;
    var whereObj = {
        goodsTypeName : new RegExp(goodsTypeName)
    }
    var sortObj = {};
    if(goodsTypeOrder){
        sortObj.goodsTypeOrder = -1;
    }else{
        sortObj.addTime = -1;
    }
    db.count("goodsTypeList",whereObj,function(count){
        pageSum = Math.ceil(count / pageNum);
        if(pageSum < 0){
            pageSum = 1;
        }
        if(pageIndex > pageSum){
            pageIndex = pageSum;
        }
        //查询店铺信息
        db.getGoodsTypeList(whereObj,sortObj,(pageIndex - 1) * pageNum,pageNum,function(err,allInfo){
            res.json({
                ok : 1,
                allInfo,
                pageIndex,
                pageSum
            });
        })
    })
}

//添加商品
module.exports.addGoods = function(req,res){
    upPic(req,"goodsPic",function(obj){
        if(obj.ok === 1){
            db.insertOne("goodsList",{
                goodsName : obj.params.goodsName,
                goodsPic : obj.newPicName,
                isHot : obj.params.isHot,
                goodsPrice : obj.params.goodsPrice,
                goodsOrder : obj.params.goodsOrder,
                goodsTypeId : mongodb.ObjectId(obj.params.goodsTypeId),
                shopId : mongodb.ObjectId(obj.params.shopId),
                addTime : Date.now()
            },function(err,results){
                if(results.result.ok && results.result.n){
                    res.json({
                        ok : 1,
                        msg : "商品添加成功！"
                    });
                }else{
                    common.end(res,0,"商品添加失败！");
                }
            })
        }else{
            common.end(res,0,obj.msg);
        }
    })
}

//获取商品列表
module.exports.getGoodsList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var goodsName = req.query.goodsName;
    var goodsOrder = req.query.order / 1 || 0;
    var pageSum = 1;
    var pageNum = 4;
    var whereObj = {
        goodsName : new RegExp(goodsName)
    }
    var sortObj = {};
    if(goodsOrder){
        sortObj.goodsOrder = -1;
    }else{
        sortObj.addTime = -1;
    }
    db.count("goodsList",whereObj,function(count){
        if(count > 0) {
            pageSum = Math.ceil(count / pageNum);
            if (pageSum < 1) {
                pageSum = 1;
            }
            if (pageIndex > pageSum) {
                pageIndex = pageSum;
            }
            db.getGoodsList(whereObj,sortObj, (pageIndex - 1) * pageNum, pageNum, function (err, allGoodsInfo) {
                res.json({
                    ok: 1,
                    allGoodsInfo,
                    pageIndex,
                    pageSum
                });
            });
        }
    })
}