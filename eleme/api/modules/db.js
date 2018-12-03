// 对数据库操作的方法
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
function _connect(cb){
    mongoClient.connect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true },function(err,client) {
        cb(client.db("eleme")) ;
    });
}
/*增加一条记录
* coll:指定集合
* obj:添加的内容
* cb：回调函数*/

//根据店铺id获取商品信息
module.exports.getAllInfoByShopId = function(shopId,cb){
    _connect(function(db){
        db.collection("goodsList").aggregate([
            {$match : {shopId : mongodb.ObjectId(shopId)}},
            {
                $lookup : {
                    from : "shopList",
                    localField : "shopId",
                    foreignField : "_id",
                    as : "info"
                }
            },
            {
                $lookup : {
                    from : "carList",
                    localField : "_id",
                    foreignField : "goodsId",
                    as : "carInfo"
                }
            }
        ]).toArray(cb);
    })
}

//查找购物车中的所有信息已经相关的商品信息，同一个手机号码
module.exports.getCarListAllInfo = function(phoneNum,cb){
    _connect(function(db){
        db.collection("carList").aggregate([
            {$match : {phoneNum}},
            {
                $lookup : {
                    from : "goodsList",
                    localField : "goodsId",
                    foreignField : "_id",
                    as : "info"
                }
            }
        ]).toArray(cb);
    })
}

//通过店铺id获取商品类别信息以及店铺信息
module.exports.getShopAndGoodsType = function(id,cb){
    _connect(function(db){
        db.collection("goodsTypeList").aggregate([
            {$match : {shopId : mongodb.ObjectId(id)}},
            {
                $lookup : {
                    from : "shopList",
                    localField : "shopId",
                    foreignField : "_id",
                    as : "shopGoodsTypeInfo"
                }
            }
        ]).toArray(cb);
    })
}

//通过店铺类别id查找店铺信息和店铺类别信息
module.exports.getShopInfo = function(id,cb){
    _connect(function(db){
        db.collection("shopList").aggregate([
            {$match : {shopTypeId : mongodb.ObjectId(id)}},
            {
                $lookup : {
                    from : "shopTypeList",
                    localField : "shopTypeId",
                    foreignField : "_id",
                    as : "shopTypeInfo"
                }
            }
        ]).toArray(cb);
    })
}

//查找店铺信息和店铺类别
module.exports.showGetShopAllInfo = function(skipNum,limitNum,cb){
    _connect(function(db){
        db.collection("shopList").aggregate([
            {$skip : skipNum},
            {$limit : limitNum},
            {
                $lookup : {
                    from : "shopTypeList",
                    localField : "shopTypeId",
                    foreignField : "_id",
                    as : "shopTypeInfo"
                }
            }
        ]).toArray(cb);
    })
}

//根据店铺id获取店铺和店铺类别的信息
module.exports.getAll = function(id,cb){
    _connect(function(db){
        db.collection("shopList").aggregate([
            {$match : {_id : mongodb.ObjectId(id)}},
            {
                $lookup : {
                    from : "shopTypeList",
                    localField : "shopTypeId",
                    foreignField : "_id",
                    as : "shopTypeInfo"
                }
            }
        ]).toArray(cb);
    })
}

//查找商品信息
module.exports.getGoodsList = function(whereObj,sortObj,skipNum,limitNum,cb){
    _connect(function(db){
        db.collection("goodsList").aggregate([
            {$match : whereObj},
            {$sort : sortObj},
            {$skip : skipNum},
            {$limit : limitNum},
            {
                $lookup : {
                    from : "goodsTypeList",
                    localField : "goodsTypeId",
                    foreignField : "_id",
                    as : "goodsTypeInfo"
                }
            },
            {
                $lookup : {
                    from : "shopList",
                    localField : "shopId",
                    foreignField : "_id",
                    as : "shopInfo"
                }
            }
        ]).toArray(cb);
    })
}

module.exports.getShopByGoodsTypeId = function(id,cb){
    _connect(function(db){
        db.collection("goodsTypeList").aggregate([
            {$match : {_id : mongodb.ObjectId(id)}},
            {
                $lookup : {
                    from : "shopList",    //要和哪个集合进行合并
                    localField : "shopId",   //本集合中连接的依据字段
                    foreignField : "_id",    //外部集合中连接的依据字段
                    as : "shopInfo"     //将查找到的字段存在该字段中（外表中）
                }
            }
        ]).toArray(cb);
    })
}

//根据商品类别id查询店铺信息和店铺类别信息
module.exports.getGoodsTypeList = function(whereObj,sortObj,skipNum,limitNum,cb){
    _connect(function(db){
        db.collection("goodsTypeList").aggregate([
            {$match : whereObj},
            {$sort : sortObj},
            {$skip : skipNum},
            {$limit : limitNum},
            {
                $lookup : {
                    from : "shopList",    //要和哪个集合进行合并
                    localField : "shopId",   //本集合中连接的依据字段
                    foreignField : "_id",    //外部集合中连接的依据字段
                    as : "shopInfo"     //将查找到的字段存在该字段中（外表中）
                }
            },
            {
                $lookup : {
                    from : "shopTypeList",    //要和哪个集合进行合并
                    localField : "shopTypeId",   //本集合中连接的依据字段
                    foreignField : "_id",    //外部集合中连接的依据字段
                    as : "typeInfo"     //将查找到的字段存在该字段中（外表中）
                }
            }
        ]).toArray(cb);
    })
}

//根据商品类别id查找店铺信息和店铺类别信息
module.exports.getGoodsTypeAllInfo = function(id,cb){
    _connect(function(db){
        db.collection("goodsTypeList").aggregate([
            {$match : {_id : mongodb.ObjectId(id)}},
            {
                $lookup : {
                    from : "shopList",
                    localField : "shopId",
                    foreignField : "_id",
                    as : "shopInfo"
                }
            },
            {
                $lookup : {
                    from : "shopTypeList",
                    localField : "shopTypeId",
                    foreignField : "_id",
                    as : "typeInfo"
                }
            }
        ]).toArray(cb);
    })
}

module.exports.getShopList = function(where,sortObj,limitNum,skipNum,cb){
    _connect(function(db){
        db.collection("shopList").aggregate([
            {$match : where},
            {$sort : sortObj},
            {$skip : skipNum},
            {$limit : limitNum},
            {
                $lookup : {
                    from : "shopTypeList",    //要和哪个集合进行合并
                    localField : "shopTypeId",   //本集合中连接的依据字段
                    foreignField : "_id",    //外部集合中连接的依据字段
                    as : "typeInfo"     //将查找到的字段存在该字段中（外表中）
                }
            }
        ]).toArray(cb);
    })
}

module.exports.getAllShopType = function(cb){
    _connect(function(db){
        db.collection("shopList").aggregate([
            {$sort : {addTime : -1}},
            {
                $lookup : {
                    from : "shopTypeList",    //要和哪个集合进行合并
                    localField : "shopTypeId",   //本集合中连接的依据字段
                    foreignField : "_id",    //外部集合中连接的依据字段
                    as : "typeInfo"     //将查找到的字段存在该字段中（外表中）
                }
            }
        ]).toArray(cb);
    })
}

module.exports.insertOne = function(coll,obj,cb){
    _connect(function(db){
        db.collection(coll).insertOne(obj,cb)
    })
}
/*获取文档信息*/
module.exports.find = function(coll,obj,cb){
    obj.whereObj = obj.whereObj || {};
    obj.sortObj = obj.sortObj || {};
    obj.limitNum = obj.limitNum || 0;
    obj.skipNum = obj.skipNum || 0;

    _connect(function(db){
        db.collection(coll).find(obj.whereObj).sort(obj.sortObj).limit(obj.limitNum).skip(obj.skipNum).toArray(cb);
    })
}
/* 根据条件获得一条记录 */
module.exports.findOne = function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).findOne(whereObj,cb);
    })
}
/* 根据ID获得一条记录 */
module.exports.findOneById = function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).findOne({
            _id : mongodb.ObjectId(id)
        },cb);
    })
}

/*根据条件求总文档数*/
module.exports.count = function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).countDocuments(whereObj).then(cb)
    })
}

/*根据ID删除文档*/
module.exports.deleteOneById = function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).deleteOne({
            _id : mongodb.ObjectId(id)
        },cb);
    })
}

module.exports.deleteMany = function(coll,adminId,cb){
    _connect(function(db){
        db.collection(coll).deleteMany({
            adminId : mongodb.ObjectId(adminId)
        },cb);
    })
}

module.exports.deleteMore = function(coll,obj,cb){
    _connect(function(db){
        db.collection(coll).deleteMany(obj,cb);
    })
}

/*根据ID进行更新*/
module.exports.updateOneById = function(coll,id,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateOne({
            _id : mongodb.ObjectId(id)
        },upObj,cb);
    })
}

module.exports.updateOne = function(coll,whereObj,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateOne(whereObj,upObj,cb);
    })
}

module.exports.updateMany = function(coll,whereObj,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateMany(whereObj,upObj,cb);
    })
}

//多表联查
module.exports.findAdminLogList = function(coll,limit,skip,cb){
    _connect(function(db){
        db.collection(coll).aggregate([
            {$sort : {addTime : -1}},
            {$skip : skip},
            {$limit : limit},
            {
                $lookup : {
                    from : "adminList",    //要和哪个集合进行合并
                    localField : "adminId",   //本集合中连接的依据字段
                    foreignField : "_id",    //外部集合中连接的依据字段
                    as : "adminInfo"     //将查找到的字段存在该字段中（外表中）
                }
            }
        ]).toArray(cb);
    })
}




