const db = require("../../modules/db");
const mongodb = require("mongodb");

//根据商品id加入购物车
module.exports.addCar = function(req,res){
    var phoneNum = req.body.phoneNum;
    var goodsId = req.body.id;
    db.findOne("carList",{
        phoneNum,
        goodsId : mongodb.ObjectId(goodsId)
    },function(err,info){
        if(info){   //商品存在，修改数量
            db.updateOne("carList",{
                phoneNum,
                goodsId : mongodb.ObjectId(goodsId)
            },{$inc : {num : 1}},function(err,results){
                if(results.result.ok && results.result.n){
                    res.json({
                        ok : 1,
                        msg : "加入购物车成功！"
                    })
                }else{
                    res.json({
                        ok : 0,
                        msg : "加入购物车失败！"
                    })
                }
            });
        }else{   //不存在则添加
            var goodsnum = 0;
            db.insertOne("carList",{
                goodsId : mongodb.ObjectId(req.body.id),
                phoneNum : req.body.phoneNum,
                num : ++goodsnum,
                addTime : Date.now()
            },function(err,info){
                if(info.result.ok && info.result.n){
                    res.json({
                        ok : 1,
                        msg : "加入购物车成功！"
                    })
                }else{
                    res.json({
                        ok :2,
                        msg : "家u购物车失败！"
                    })
                }
            });
        }
    })
}

//根据商品的 id获取购物车中的信息
module.exports.getCarByGoodsId = function(req,res){
    db.findOne("carList",{
        goodsId : mongodb.ObjectId(req.query.id),
        phoneNum : req.query.phoneNum
    },function(err,info){
        res.json({
            ok : 1,
            info
        });
    });
}

//获取购物车中的所有信息
module.exports.getCarListAllInfo = function(req,res){
    db.getCarListAllInfo(req.query.phoneNum,function(err,allInfo){
        res.json({
            ok : 1,
            allInfo
        })
    })
}

//通过商品的id增减购买的数量
module.exports.create = function(req,res){
    var type = req.query.type / 1;
    var phoneNum = req.query.phoneNum;
    var obj = {};
    if(type === 1){
        obj.num = -1;
    }else{
        obj.num = 1;
    }
    db.findOne("carList",{
        goodsId : mongodb.ObjectId(req.query.goodsId),
        phoneNum
    },function(err,info){
        if(info.num > 0){
            db.updateOne("carList",{
                goodsId : mongodb.ObjectId(req.query.goodsId)
            },{
                $inc : obj
            },function(err,upInfo){
                if(upInfo.result.ok && upInfo.result.n){
                    res.json({
                        ok : 1,
                        msg : "操作成功！"
                    })
                }else{
                    res.json({
                        ok : 0,
                        msg : "操作失败！"
                    });
                }
            })
        }else{
            db.deleteOneById("carList",info._id,function(err,{result}){
                if(result.ok && result.n){
                    res.json({
                        ok : 1,
                        msg : "删除成功！"
                    })
                }
            })
        }
    })
    
}

//通过手机号码清空购物车
module.exports.clearCar = function(req,res){
    db.deleteMore("carList",{
        phoneNum : req.query.phoneNum
    },function(err,results){
        if(results.result.ok && results.result.n){
            res.json({
                ok : 1,
                msg : "删除成功！"
            })
        }else{
            res.json({
                ok : 0,
                msg : "删除失败！"
            });
        }
    })
}