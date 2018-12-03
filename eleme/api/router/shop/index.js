const db = require("../../modules/db");
const common = require("../../modules/common");
const {upPic} = require("../../modules/upPic");
const mongodb = require("mongodb");
const fs = require("fs");

/***********************店铺管理*****************************/
module.exports.getShopList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var shopName = req.query.shopName;
    var pageSum = 1;
    var pageNum = 4;
    var whereObj = {
        shopName : new RegExp(shopName)
    }
    var order = req.query.order / 1 || 0;
    var sortObj = {};
    if(order){   //表示排序
        sortObj.shopOrder = -1;
    }else{       //默认按照添加时间排序
        sortObj.addTime = -1;
    }
    db.count("shopList",whereObj,function(count){
        if(count > 0){
            pageSum = Math.ceil(count / pageNum);
            if(pageSum < 0){
                pageSum = 1;
            }
            if(pageIndex > pageSum){
                pageIndex = pageSum;
            }
            db.getShopList(whereObj,sortObj,pageNum,(pageIndex - 1) * pageNum,function(err,shopList){
                res.json({
                    ok : 1,
                    shopList,
                    pageIndex,
                    pageSum
                });
            })
        }else{
            common.end(res,0,"无数据！");
        }
    })
}

module.exports.addShop = function(req,res){
    upPic(req,"shopPic",function(obj){
        if(obj.ok === 1){
            db.insertOne("shopList",{
                shopName : obj.params.shopName,
                shopPic : obj.newPicName,
                shopAddress : obj.params.shopAddress,
                shopTel : obj.params.shopTel,
                shopOrder : obj.params.shopOrder,
                shopTypeId : mongodb.ObjectId(obj.params.shopTypeId),
                addTime : Date.now()
            },function(err,results){
                if(results.result.ok && results.result.n){
                    common.end(res,1,"店铺添加成功！");
                }else{
                    common.end(res,0,"店铺添加失败！");
                }
            })
        }else{
            res.json({
                ok:0,
                msg:obj.msg
            })
        }
    })
}

module.exports.getShopType = function(req,res){
    db.find("shopTypeList",{},function(err,typeInfo){
       res.json({
           ok : 1,
           typeInfo
       });
    });
}

//根据Id获取店铺类别
module.exports.getShopInfoById = function(req,res){
    db.findOneById("shopList",req.query.shopId,function(err,shopInfo){
        if(shopInfo){
            res.json({
                ok : 1,
                shopInfo
            });
        }else{
            common.end(res);
        }
    })
}

//修改店铺信息
module.exports.updateShop = function(req,res){
    upPic(req,"shopPic",function(obj){
        if(obj.ok === 2){   //未成功
            common.end(res,0,obj.msg);
        }else{
            var upObj = {
                $set : {
                    shopName : obj.params.shopName,
                    shopAddress : obj.params.shopAddress,
                    shopTel : obj.params.shopTel,
                    shopOrder : obj.params.shopOrder,
                    shopTypeId : mongodb.ObjectId(obj.params.shopTypeId)
                }
            }
            if(obj.newPicName){
                upObj.$set.shopPic = obj.newPicName;
            }
            db.updateOneById("shopList",obj.params.shopId,upObj,function(err,results){
                if(results.result.ok){
                    common.end(res,1,"修改成功！");
                }else{
                    common.end(res,0,"修改失败！");
                }
            })
        }
    });
}

//删除店铺信息
module.exports.deleteShopInfo = function(req,res){
    db.findOneById("shopList",req.query.id,function(err,info){
        fs.unlink("./upload/" + info.shopPic,function(err) {
            db.deleteOneById("shopList",req.query.id,function(err,results){
                if(results.result.ok && results.result.n){
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
            });
        })
    })
}

/***********************店铺类别******************************/
module.exports.deleteShopType = function(req,res){
    db.findOneById("shopTypeList",req.query.id,function(err,info){
        fs.unlink("./upload/" + info.shopTypePic,function(err){
            db.deleteOneById("shopTypeList",req.query.id,function(err,results){
                if(results.result.ok && results.result.n){
                    common.end(res,1,"删除成功！");
                }else{
                    common.end(res,0,"删除失败！");
                }
            })
        });
    })
}

module.exports.addShopType = function(req,res){
    upPic(req,"shopTypePic",function(obj){
        if(obj.ok===1){
            db.insertOne("shopTypeList",{
                shopTypeName:obj.params.shopTypeName,
                shopTypePic:obj.newPicName,
                shopOrder : obj.params.shopOrder,
                addTime:Date.now()
            },function(err,results){
                res.json({
                    ok:1,
                    msg:"上传成功"
                })
            })
        }else{
            res.json({
                ok:0,
                msg:obj.msg
            })
        }
    });
}

module.exports.getShopTypeList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var shopTypeName = req.query.shopTypeName;
    var pageNum = 4;
    var pageSum = 1;
    var order = req.query.order / 1 || 0;    //排序字段
    var whereObj = {
        shopTypeName : new RegExp(shopTypeName)
    }
    var sortObj = {};
    db.count("shopTypeList",whereObj,function(count){
        pageSum = Math.ceil(count / pageNum);
        if(pageSum < 0){
            pageSum = 1;
        }
        if(pageIndex > pageSum){
            pageIndex = pageSum;
        }
        if(order){   //表示排序
            sortObj.shopOrder = -1;
        }else{       //默认按照添加时间排序
            sortObj.addTime = -1;
        }
        db.find("shopTypeList",{
            whereObj,
            limitNum : pageNum ,
            skipNum : (pageIndex - 1) * pageNum,
            sortObj
        },function(err,shopTypeList){
            if(!err && shopTypeList.length >= 0){
                res.json({
                    ok : 1,
                    shopTypeList,
                    pageIndex,
                    pageSum
                });
            }else{
                common.end(res);
            }
        })
    })
}

//根据shopTypeId获取店铺类别信息
module.exports.getShopTypeInfoById = function(req,res){
    db.findOneById("shopTypeList",req.query.shopTypeId,function(err,shopTypeInfo){
        res.json({
            ok : 1,
            shopTypeInfo
        })
    })
}

//根据id修改店铺类别信息
module.exports.upShopType = function(req,res){
    upPic(req,"shopTypePic",function(obj){
        if(obj.ok === 2){   //未成功
            common.end(res,0,obj.msg);
        }else{
            var upObj = {
                $set : {
                    shopTypeName : obj.params.shopTypeName,
                    shopOrder : obj.params.shopOrder
                }
            }
            if(obj.newPicName){
                upObj.$set.shopTypePic = obj.newPicName;
            }
            db.updateOneById("shopTypeList",obj.params.shopTypeId,upObj,function(err,results){
                if(results.result.ok){
                    common.end(res,1,"修改成功！");
                }else{
                    common.end(res,0,"修改失败！");
                }
            })
        }
    });
}