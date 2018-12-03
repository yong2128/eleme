import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { MessageBox } from 'mint-ui';

Vue.use(Vuex);

export default new Vuex.Store({
    state : {
        goodsInfo : [],     //存储根据商品id获取到的信息
        allInfo : [],        //存储购物车中的所有信息
        sum : 0,              //所有商品的总价格
        allGoodsInfo : [],     //按店铺存储所有商品
        oneInfo : []          //存储通过商品id获取到的商品信息（一条）
    },
    mutations : {
        CHANGE_GOODSINFO(state,info){
            state.goodsInfo = info;
        },
        CHANGE_ALLINFO(state,info){
            state.allInfo = info;
        },
        CHANGE_SUM(state){
            var sumP = 0;
            for(var i = 0;i < state.allInfo.length;i ++){
                sumP += ((state.allInfo[i].num / 1) * (state.allInfo[i].info[0].goodsPrice / 1));
            }
            state.sum = sumP;
        },
        CHANGE_ALLGOODSINFO(state,info){
            state.allGoodsInfo = info;
        },
        CHANGE_ALLINFOBYPHONENUM(state,info){
            state.allInfoByPhoneNum = info;
        },
        CHANGE_ONEINFO(state,info){
            state.oneInfo = info;
        }
    },
    actions : {
        //根据商品id加入购物车
        addCar({state,dispatch},{id,shopId}){
            axios.post("/addCar",{
                id,
                phoneNum : localStorage.phoneNum
            }).then(data=>{
                MessageBox('提示', data.msg);
                dispatch("getAllInfoByShopId",{id : shopId});
                dispatch("getCarByGoodsId",{id});
            })
        },
        //根据商品的 id获取购物车中的信息
        getCarByGoodsId({state,commit},{id}){
            axios.get("/getCarByGoodsId",{
                params : {id,phoneNum : localStorage.phoneNum}
            }).then(data=>{
                commit("CHANGE_GOODSINFO",data.info);
            });
        },
        //获取购物车中的所有信息
        getCarListAllInfo({state,commit}){
            axios.get("/getCarListAllInfo",{
                params : {phoneNum : localStorage.phoneNum}
            }).then(data=>{
                commit("CHANGE_ALLINFO",data.allInfo);
            });
        },
        //通过店铺的id获取商品的所有信息,包含购物车
        getAllInfoByShopId({commit,dispatch},{id}){
            axios.get("/getAllInfoByShopId",{
                params : {shopId : id}
            }).then(data=>{
                commit("CHANGE_ALLGOODSINFO",data.allInfo);
            });
        },
        //通过id增加过减少购买数量
        create({dispatch},{goodsId,type,id}){
            axios.get("/create",{
                params : {
                    goodsId,
                    type,
                    phoneNum : localStorage.phoneNum
                }
            }).then(data=>{
                if(data.ok){
                    MessageBox('提示', data.msg);
                    dispatch("getCarListAllInfo");
                    dispatch("getAllInfoByShopId",{id});
                    dispatch("getCarByGoodsId",{id : goodsId})
                }else{
                    MessageBox('提示', data.msg);
                }
            });
        },
        //通过电话号码清空购物车
        clearCar({state,dispatch}){
            axios.delete("/clearCar",{
                params : {phoneNum : localStorage.phoneNum}
            }).then(data=>{
                console.log(data,56666666);
                if(data.ok){
                    MessageBox('提示', "购物成功！您已消费" + state.sum + "个金币！");
                    dispatch("getCarListAllInfo");
                    dispatch("upGold");
                }
            });
        },
        //在购买商品后更改用户金币
        upGold({state}){
            axios.put("upGold",{
                phoneNum : localStorage.phoneNum,
                goldNum : state.sum
            }).then(data=>{
                localStorage.goldNum = data.goldNum;
            });
        },
        //根据商品的id获取商品信息
        getGoodsInfoById({state,commit},{id}){
            axios.get("/getGoodsInfoById",{
                params : {goodsId : id}
            }).then(data=>{
                commit("CHANGE_ONEINFO",data.info);
            })
        }
    },
    getters : {

    },
    modules : {

    }
})