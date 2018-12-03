<template>
    <div id="login">
        <p></p>
        <form name="login">
            <p>
                <input type="text" placeholder="手机号" @focus="focus('phoneNum')" name="phoneNum" @blur="blur('phoneNum')" maxlength="11" @keyup="listenerPhoneNum">
                <button type="button" @click="sendCode">{{msg}}</button>
            </p>
            <p>
                <input type="text" placeholder="验证码" @focus="focus('code')" name="code" @blur="blur('code')">
            </p>
            <span>新用户登录即自动注册，并表示已同意<a href="javascript:;">《用户服务协议》</a></span>
            <input type="button" value="登录" class="btn" @click="submitForm">
        </form>
        <a href="javascript:;">关于我们</a>
    </div>
</template>

<script>
export default {
    name : "login",
    data(){
        return {
            goldNum : 0,
            msg : "发送验证码",
            time : 30,
            setTime : 0,
            timer : null
        }
    },
    methods : {
        //input输入框架聚焦失焦事件
        focus(domName){
            var dom =  document.login.querySelector("input[name='" + domName + "']");
            dom.style.border = "1px solid #2395ff";
        },
        blur(domName){
            var dom = document.login.querySelector("input[name='" + domName +"']");
            dom.style.border = "1px solid #ddd";
        },
        listenerPhoneNum(){
            var dom = document.login.querySelector("input[name='phoneNum']");
            var btn = document.login.querySelector("button");
            if(dom.value.length === 11){
                btn.style.color = "#2395ff";
            }else{
                btn.style.color = "#ccc";
            }
        },
        sendCode(){
            if(document.login.phoneNum.value.length === 11){
                this.timer = setInterval(() => {
                    if(this.time >= 0){
                        this.msg = "(已发送" + this.time-- + "s)";
                        document.login.querySelector("button").style.color = "#ccc";
                        document.login.querySelector("button").disabled = "true";
                    }else{
                        clearInterval(timer);
                        this.msg = "发送验证码";
                        document.login.querySelector("button").style.color = "#2395ff";
                        document.login.querySelector("button").disabled = "false";
                    }
                }, 1000);
                 this.$ajax.get("/sendCode",{
                    params : {
                        phoneNum : document.login.phoneNum.value
                    }
                }).then(data=>{
                    document.login.code.value = data.code;
                });
            }else{
                alert("手机号码格式不正确！");
            }
        },
        submitForm(){
            clearInterval(this.timer);
            var phoneNum = document.login.phoneNum.value.length;
            var valiCode = document.login.code.value.length;
            if(phoneNum === 11 && valiCode === 6){
                this.$ajax.post("/loginAndRegister",{
                    phoneNum : document.login.phoneNum.value,
                    valiCode : document.login.code.value
                }).then(data=>{
                    console.log(data,45454);
                    if(data.ok){
                        localStorage.phoneNum = data.phoneNum;
                        localStorage.goldNum = data.goldNum;
                        this.goldNum = data.goldNum / 1;
                        this.$router.push("/");
                    }
                    return false;
                });
            }else{
                 return false;
            }
        }
    }
}
</script>

<style scoped>
    #login>p{
        width: 1rem;
        height: 0.5rem;
        margin: 0.5rem auto 0.2rem;
        background: url("../../../static/logo.png") no-repeat 0 0/100%
    }
    form input{
        width: 3rem;
        height: 0.48rem;
        display: block;
        margin: 0 auto 0.2rem;
        text-indent : 0.1rem;
        border-radius : 3px;
        border : 1px solid #ddd;
    }
    form p{
        position: relative;
    }
    form button{
        display: block;
        border: 0;
        background: #fff;
        position : absolute;
        right: 0.2rem;
        top: 0.15rem;
        font-size: 0.07rem;
        color: #ccc;   /*#2395ff*/
        text-align: center;
    }
    span{
        width : 2.9rem;
        margin: 0.06rem auto;
        display : block;
        font-size: 0.07rem;
        color: #999;
        line-height: 0.1rme;
    }
    span a{
        color: #2395ff;
    }
    .btn{
        display: block;
        height: 0.48rem;
        margin-top: 0.15rem;
        border-radius: 4px;
        background: #4cd96f;
        color: #fff;
        cursor: pointer;
        text-align: center;
        font-size: 0.08rem;
        line-height: 0.21rem;
    }
    #login>a{
        display: block;
        text-align: center;
        font-size: 0.07rem;
        color: #999;
    }
</style>