<template>
    <el-form class="updContainer" :model="updForm" ref="updForm" hide-required-asterisk label-width="100px">
        <h3>管理员信息修改界面</h3>
        <el-form-item label="id">
            <el-input type="type" readonly v-model="updForm.id" class="input" clearable/>
        </el-form-item>
        <el-form-item label="管理员账号" prop="adminName">
            <el-input type="text" placeholder="请输入账号" v-model="updForm.adminName" class="input" clearable/>
        </el-form-item>
        <el-form-item label="旧密码" prop="pass">
            <el-input type="password" readonly placeholder="请输入密码" v-model="updForm.pass" class="input" clear />
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass">
            <el-input type="password" placeholder="请输入新密码" v-model="updForm.checkPass" class="input" clearable />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="sub" :Loading="isLoading" @click="subForm('updForm')">修改</el-button>
            <el-button @click="resetForm('updForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "update",
        data(){
            return {
                isLoading : false,
                updForm :  {
                    adminName : "",
                    pass : "",
                    checkPass : "",
                    id : ""
                }
            }
        },
        mounted() {
            this.updForm.adminName = this.$route.params.adminName;
            this.updForm.id = this.$route.params.id;
            this.updForm.pass = this.$route.params.password;
        },
        methods : {
            subForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isLoading = true;
                        var _this = this;
                        this.$store.dispatch("update", {
                            id : this.updForm.id,
                            adminName: this.updForm.adminName,
                            password: this.updForm.checkPass,
                            success(msg) {
                                _this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                _this.$router.push("/showAdmin");
                                _this.isLoading = false;
                            },
                            error(msg) {
                                _this.$message.error(msg);
                                _this.isLoading = false;
                            }
                        })
                    } else {
                        console.log('修改信息失败！');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .updContainer{
        width: 400px;
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
        width: 300px;
    }
    .sub{
        margin: 0 20px 0 100px;
    }
</style>
