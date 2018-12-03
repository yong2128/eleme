<template>
    <el-form class="loginContainer" :rules="rules" :model="loginForm" ref="loginForm" >
        <h3>饿了么后台管理系统</h3>
        <el-form-item label="管理员账号" prop="adminName" label-width="100px">
            <el-input type="text" placeholder="请输入账号" v-model="loginForm.adminName" clearable class="input" ref="adminName"/>
        </el-form-item>
        <el-form-item label="手机号码" label-width="100px" prop="phoneId">
            <el-input type="text" placeholder="请输入手机号码" v-model="loginForm.phoneId" clearable ref="phoneId" class="input"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="adminPwd" label-width="100px">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.adminPwd" clearable class="input" ref="adminPwd"/>
        </el-form-item>
        <el-form-item>
            <el-button type="success" round @click="sendCode" :loading="limitTime" class="btn">{{msg}}</el-button>
            <el-input type="text" placeholder="请输入验证码"class="code" ref="code"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="sub" :loading="isLoading" @click="subForm('loginForm')">登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Login",
        data(){
            var valiPhoneId = (rule,value,callback)=>{    //验证电话号码
                var reg = /^1[3|4|5|7|8|9]{1}\d{9}$/;
                if(value === ''){
                    callback(new Error("请输入电话号码！"));
                }else if(reg.test(value)){
                    callback();
                }else{
                    callback(new Error("请输入11位格式正确的电话号码！"));
                }
            }
            return {
                isLoading : false,
                limitTime : false,
                msg : "发送验证码",
                time : 10,
                timer : null,
                rules : {
                    adminName :  [
                        {required: true, message: '请输入管理员账号', trigger: 'blur' },
                        { min: 3, max: 10, message: '账号长度在 3 到 10 个字符之间', trigger: 'blur' }
                    ],
                    adminPwd : [
                        {required : true, message : "请输入管理员密码", trigger: "blur"},
                        {min : 6, max : 16,message : "密码长度在6-16个字符之间", trigger: "blur"}
                    ],
                    phoneId : [
                        {required : true, message : "请输入电话号码", trigger: "blur"},
                        {validator : valiPhoneId , trigger : "blur"}
                    ]
                },
                loginForm : {
                    adminName : "",
                    adminPwd : "",
                    phoneId : "",
                    code : ""
                }
            }
        },
        methods : {
            subForm(formName){
                // console.log(this.$refs.adminName.value);
                // console.log(this.$refs.adminPwd.value);
                this.$refs[formName].validate((valid)=>{
                    // console.log(valid)   //valid为boolean
                    if(valid){
                        this.isLoading = true;
                        var _this = this;
                        this.$store.dispatch("login",{
                            adminName : this.loginForm.adminName,
                            password : this.loginForm.adminPwd,
                            phoneId : this.loginForm.phoneId,
                            code : this.loginForm.code,
                            success(msg){
                                _this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                _this.isLoading=false;
                            },
                            error(msg){
                                _this.$message.error(msg);
                                _this.isLoading=false;
                            }
                        })
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            sendCode(){
                this.limitTime = true;
                var _this = this;
                if(!this.valiPhoneId){
                    this.$store.dispatch("sendCode",{
                        phoneId : _this.loginForm.phoneId,
                        cb(code){
                            _this.loginForm.code = code;
                            _this.$refs.code.currentValue = code;
                            _this.limitTime = true;
                            _this.timer = setInterval(()=>{
                                if(_this.time >= 0) {
                                    _this.msg = _this.time--;
                                }else{
                                    clearInterval(_this.timer);
                                    _this.limitTime = false;
                                    _this.msg = "发送验证码"
                                }
                            },1000);
                        }
                    })
                }else{
                    this.$message.error("手机号码格式不正确！")
                }
            }
        }
    }
</script>

<style scoped>
    .loginContainer{
        width: 380px;
        margin: 100px auto;
        border: 1px solid #aaa;
        padding: 20px;
        box-shadow: 0 0 15px lightsteelblue;
    }
    .code{
        width: 250px;
    }
    .btn{
        width: 120px;
    }
    h3{
        text-align: center;
        margin-bottom: 30px;
    }
    .input{
        width: 280px;
    }
    .sub{
        margin: 0 20px 0 100px;
    }
</style>
