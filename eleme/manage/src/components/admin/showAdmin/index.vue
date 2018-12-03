<template>
    <div>
        <el-table :data="adminList" style="width: 97%">
            <el-table-column label="管理员信息">
                <el-table-column label="id" prop="_id" width="260px"></el-table-column>

                <el-table-column label="管理员账号">
                    <template slot-scope="scope">
                        {{scope.row.adminName}}
                    </template>
                </el-table-column>

                <el-table-column label="管理员密码">
                    <template slot-scope="scope">
                        {{scope.row.password}}
                    </template>
                </el-table-column>

                <el-table-column label="注册时间">
                    <template slot-scope="scope">
                        {{scope.row.addTime | date}}
                    </template>
                </el-table-column>

                <el-table-column label="最近一次登录">
                    <template slot-scope="scope">
                        {{scope.row.lastTime | date}}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="mini"  @click="handleEdit(scope.$index, scope.row)">
                            修改
                        </el-button>
                        <el-button size="mini" type="danger"  @click="handleDelete(scope.$index, scope.row)" plain>
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>

        <el-pagination
            @current-change="getAdminList"
            :current-page.sync="cp"
            layout="prev, pager, next, jumper"
            :page-count="ps">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                adminList : [],
                cp : 1,
                ps : 1
            }
        },
        methods : {
            handleEdit(index,value){
                this.$router.push("/updateAdmin/" + value.adminName + "/" + value.password + "/" + value._id);
            },
            handleDelete(index,value){
                this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var _this = this;
                    this.$store.dispatch("delAdminList",{
                        value,
                        cb(adminList){
                            _this.getAdminList();
                        },
                        success(msg){
                            _this.$message({
                                type: 'success',
                                message: msg
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getAdminList(){
                var _this = this;
                this.$store.dispatch("getAdminList",{
                    pageIndex : this.currentPage,
                    cb(adminList,pageIndex,pageSum){
                        _this.adminList = eval(adminList);
                        _this.cp = pageIndex;
                        _this.ps = pageSum;
                    }
                });
            }
        },
        mounted(){
            this.getAdminList();
        }
    }
</script>

<style scoped>

</style>
