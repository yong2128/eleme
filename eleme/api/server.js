const express = require("express");
const bodyParser = require("body-parser");
const admin = require("./router/admin");
const shop = require("./router/shop");
const goods = require("./router/goods");
const app = express();
app.use(bodyParser.json());

app.use(express.static("./upload"));

/**********************************商品相关*****************************************/
app.get("/getShopById",goods.getShopById);
app.post("/addGoodsTypeList",goods.addGoodsTypeList);
app.get("/getGoodsTypeList",goods.getGoodsTypeList);
app.post("/addGoods",goods.addGoods);
app.get("/getGoodsList",goods.getGoodsList);
app.get("/getShopByGoodsTypeId",goods.getShopByGoodsTypeId);
app.get("/getGoodsTypeAllInfo",goods.getGoodsTypeAllInfo);
app.put("/addGoodsTypeList",goods.upGoodsTypeList);
app.delete("/deleteGoodsTypeInfo",goods.deleteGoodsTypeInfo);
//获取所有的店铺信息
app.get("/getInfo",goods.getInfo);
//根据店铺id查找商品类别信息
app.get("/getGoodsTypeInfo",goods.getGoodsTypeInfo);
//删除商品
app.delete("/deleteGoods",goods.deleteGoods);
//根据商品id获取商品信息
app.get("/getGoodsInfoById",goods.getGoodsInfoById);
app.put("/addGoods",goods.upGoods);
//根据店铺id获取店铺和店铺类别的信息
app.get("/getAll",goods.getAll);

/**********************************店铺相关*****************************************/
//添加店铺类型(分页)
app.post("/addShopType",shop.addShopType);
//获取店铺类型列表
app.get("/getShopTypeList",shop.getShopTypeList);
//删除店铺类别
app.delete("/deleteShopType",shop.deleteShopType);
//获取店铺列表
app.get("/getShopList",shop.getShopList);
//添加店铺
app.post("/addShop",shop.addShop);
//获取店铺类别
app.get("/getShopType",shop.getShopType);
//根据Id获取店铺类别
app.get("/getShopInfoById",shop.getShopInfoById);
//修改店铺信息
app.put("/addShop",shop.updateShop);
//根据shopTypeId获取店铺类别信息
app.get("/getShopTypeInfoById",shop.getShopTypeInfoById);
//根据id修改店铺类别信息
app.put("/addShopType",shop.upShopType);
//删除店铺信息
app.delete("/deleteShopInfo",shop.deleteShopInfo);

/**********************************管理员相关*****************************************/
//管理员登录
app.get("/login",admin.login);
//添加管理员
app.post("/register",admin.register);
//获取管理员日志列表
app.get("/getAdminLogList",admin.getAdminLogList);
//删除管理员日志
app.get("/delAdminLogList",admin.delAdminLogList);
//获取管理员信息列表
app.get("/getAdminList",admin.getAdminList)
//删除管理员
app.get("/delAdminList",admin.delAdminList);
//修改管理员信息
app.post("/update",admin.updateAdmin);
//获取验证码
app.get("/sendCode",admin.sendCode);

app.listen(80,function(){
    console.log("success!");
})
