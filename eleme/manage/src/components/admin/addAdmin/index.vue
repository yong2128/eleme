<template>
    <el-form class="regContainer" :rules="rules" :model="regForm" ref="regForm">
        <h3>饿了么管理员添加界面</h3>
        <el-form-item label="管理员账号" prop="adminName">
            <el-input type="text" placeholder="请输入账号" v-model="regForm.adminName" class="input" clearable/>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneId">
            <el-input type="text" clear v-model="regForm.phoneId" class="input" placeholder="请输入手机号码"/>
        </el-form-item>
        <el-form-item label="管理员密码" prop="pass">
            <el-input type="password" placeholder="请输入密码" v-model="regForm.pass" class="input" clear/>
        </el-form-item>
        <el-form-item label="请确认密码" prop="checkPass">
            <el-input type="password" placeholder="请再次输入密码" v-model="regForm.checkPass" class="input" clearable/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="sub" :Loading="isLoading" @click="subForm('regForm')">添加</el-button>
            <el-button @click="resetForm('regForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "index",
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.regForm.checkPass !== '') {
                        this.$refs.regForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.regForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
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
                rules : {
                    adminName :[
                        {required: true, message: '请输入管理员账号', trigger: 'blur' },
                        { min: 3, max: 10, message: '账号长度在 3 到 10 个字符之间', trigger: 'blur' }
                    ],
                    pass: [
                        {required : true, message : "请输入密码",trigger : "blur"},
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, max: 16, message: '密码在 6 到 16 个字符之间', trigger: 'blur' }
                    ],
                    checkPass: [
                        {required : true, message : "请输入手机号码！", trigger : "blur"},
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    phoneId : [
                        {required : true, message : "请输入电话号码", trigger: "blur"},
                        {validator : valiPhoneId , trigger : "blur"}
                    ]
                },
                regForm :  {
                    adminName : "",
                    pass : "",
                    checkPass : "",
                    phoneId : ""
                }
            }
        },
        methods : {
            subForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isLoading = true;
                        var _this = this;
                        this.$store.dispatch("register",{
                            adminName:this.regForm.adminName,
                            password:this.regForm.pass,
                            phoneId : this.regForm.phoneId,
                            success(msg){
                                _this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                _this.isLoading=false;
                                _this.$refs[formName].resetFields();
                            },
                            error(msg){
                                _this.$message.error(msg);
                                _this.isLoading=false;
                            }
                        })
                    } else {
                        console.log('注册失败！');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .regContainer{
        width: 380px;
        margin: 100px auto;
        border: 1px solid #aaa;
        padding: 20px;
        box-shadow: 0 0 15px lightsteelblue;
    }
    h3{
        text-align: center;
        margin-bottom: 20px;
    }
    .input{
        width: 280px;
    }
    .sub{
        margin: 0 20px 0 100px;
    }
</style>
