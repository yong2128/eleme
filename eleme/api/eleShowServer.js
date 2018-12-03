const express = require("express");
const bodyParser = require("body-parser");
const eleme = require("./router/elemeRouter");
const car = require("./router/elemeRouter/car");
const app = express();

app.use(express.static("./upload"));

app.use(bodyParser.json());

/*****************************购物车区******************************* */
//根据商品id加入购物车
app.post("/addCar",car.addCar);

//根据商品的 id获取购物车中的信息
app.get("/getCarByGoodsId",car.getCarByGoodsId);

//获取购物车中的所有信息
app.get("/getCarListAllInfo",car.getCarListAllInfo);

//通过商品的id增减购买的数量
app.get("/create",car.create);

//通过电话号码清空购物车
app.delete("/clearCar",car.clearCar);


/*****************************页面渲染******************************* */
//获取所有的店铺类别信息
app.get("/getShopTypeList", eleme.getShopTypeList);

//根据手机号获取验证码
app.get("/sendCode", eleme.sendCode);

//登录或者注册
app.post("/loginAndRegister", eleme.loginAndRegister);

//获取店铺列表
app.get("/getShopList",eleme.getShopList);

//通过店铺类别id获取店铺信息
app.get("/getShopInfo",eleme.getShopInfo);

//根据店铺id获取店铺信息以及商品类别信息
app.get("/getShopAndGoodsType",eleme.getShopAndGoodsType);

//通过商品类别的id获取商品信息
app.get("/getInfoByGoodsId",eleme.getInfoByGoodsId);

//通过店铺id获取商品信息
app.get("/getAllInfoByShopId",eleme.getAllInfoByShopId);

//更改用户金币
app.put("/upGold",eleme.upGold);

//根据商品的id获取商品的信息
app.get("/getGoodsInfoById",eleme.getGoodsInfoById);

app.listen(80, function () {
    console.log("success!");
});