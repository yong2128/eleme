import axios from "axios"
import Vue from "vue"

var vue = new Vue();

export default {
    state : {
        adminId : localStorage.adminId || null,
        adminName : localStorage.adminName || null,
        adminLogInfo : [],
        adminLogEnum:{},
        adminList : [],
        pageSum : 1,
        pageIndex : 1,
        currentPage : 1,
        pageSumAdmin : 1,
        code : ""
    },
    mutations : {
        CHANGE_ADMININFO(state,info){
            state.adminId = localStorage.adminId = info.adminId;
            state.adminName = localStorage.adminName = info.adminName;
        },
        CHANGE_ADMINLIST(state,info){
            state.adminList = info.adminList;
            state.currentPage = info.pageIndex;
            state.pageSumAdmin = info.pageSum;
        },
        OUT_LOGIN(state){
            localStorage.clear();
            state.adminId = null;
            state.adminName = null;
            vue.$message({
                message : "已退出登录！",
                type : "success"
            });
        },
        CHANGE_ADMININFO_ADMINlOGINFO(state,info){
            state.adminLogInfo = info.adminLogList;
            state.adminLogEnum = info.adminLogEnum;
            state.pageSum = info.pageSum;
            state.pageIndex = info.pageIndex;
        },
        CHANGE_CODE(state,info){
            state.code = info.code
        }
    },
    actions : {
        login({state,commit},{adminName,password,phoneId,code,success,error}){
            axios.get("/login",{
                params : {
                    adminName,password,phoneId,code
                }
            }).then((data)=>{
                if(data.ok){
                    commit("CHANGE_ADMININFO",data);
                    success(data.msg);
                }else{
                   error(data.msg);
                }
            });
        },
        register({state,commit},{adminName,password,phoneId,success,error}){
            axios.post("/register",{
                adminName,password,phoneId
            }).then((data)=>{
                if(data.ok){
                    success(data.msg);
                }else{
                    error(data.msg);
                }
            });
        },
        getAdminLogList({state,commit},{pageIndex,cb}){
            axios.get("/getAdminLogList",{
                params : {pageIndex}
            }).then(info=>{
                if(info.ok){
                    commit("CHANGE_ADMININFO_ADMINlOGINFO",info);
                    cb(state.adminLogInfo,state.adminLogEnum,state.pageSum,state.pageIndex);
                }
            });
        },
        delAdminLogList({state,dispatch},{value,cb,success}){
            axios.get("/delAdminLogList",{
                params : {id : value._id}
            }).then(data=>{
                if(data.ok){
                    cb();
                    success(data.msg);
                }else{
                    success(data.msg);
                }
            });
        },
        getAdminList({state,commit},{pageIndex,cb}){
            axios.get("/getAdminList",{
                params : {pageIndex}
            }).then(info=>{
                if(info.ok){
                    commit("CHANGE_ADMINLIST",info);
                    cb(state.adminList,state.currentPage,state.pageSumAdmin);
                }
            });
        },
        delAdminList({state,dispatch},{value,cb,success}){
            axios.get("/delAdminList",{
                params : {id : value._id}
            }).then(data=>{
                if(data.ok){
                    cb(state.adminList);
                    success(data.msg);
                }else{
                    success(data.msg);
                }
            });
        },
        update({state,commit},{id,adminName,password,success,error}){
            axios.post("/update",{
                id,adminName,password
            }).then((data)=>{
                if(data.ok){
                    success(data.msg);
                }else{
                    error(data.msg);
                }
            });
        },
        sendCode({state,commit},{phoneId,cb}){    //发送验证码
            axios.get("/sendCode",{
                params : {phoneId}
            }).then(data=>{
                console.log(data);
                if(data.ok){
                    commit("CHANGE_CODE",data);
                    cb(state.code);
                }
            });
        }
    }
}
