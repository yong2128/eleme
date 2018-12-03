<template>
    <div>
        <el-table :data="adminLogList" style="width: 97%">
            <el-table-column label="管理员日志">
                <el-table-column label="id" prop="_id" width="260px">
                </el-table-column>

                <el-table-column label="日志时间">
                    <template slot-scope="scope">
                        {{scope.row.addTime | date}}
                    </template>
                </el-table-column>

                <el-table-column label="管理员账号" prop="adminInfo[0].adminName">
                </el-table-column>

                <el-table-column label="类型">
                    <template slot-scope="scope">
                        {{adminLogEnum[scope.row.logType]}}
                    </template>
                </el-table-column>

                <el-table-column label="详细信息">
                    <template slot-scope="scope">
                        {{scope.row.detail}}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger"  @click="handleDelete(scope.$index, scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>

        <el-pagination
            @current-change="getAdminLogList"
            :current-page.sync="currentPage"
            layout="prev, pager, next, jumper"
            :page-count="pageSum">
        </el-pagination>
    </div>
</template>

<script>
export default {
        name: "index",
        data(){
            return {
                adminLogList : [],
                adminLogEnum : {},
                currentPage: 1,
                pageSum : 1
            }
        },
        methods : {
            handleDelete(index,value){
                this.$confirm('此操作将永久删除该日志, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var _this = this;
                    this.$store.dispatch("delAdminLogList",{
                        value,
                        cb(){
                            _this.getAdminLogList();
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
            getAdminLogList(){
                var _this = this;
                this.$store.dispatch("getAdminLogList",{
                        pageIndex : this.currentPage,
                    cb(adminLogList,adminLogEnum,pageSum,pageIndex){
                        _this.adminLogList = eval(adminLogList);
                        _this.adminLogEnum = adminLogEnum;
                        _this.pageSum = pageSum;
                        _this.currentPage = pageIndex;
                    }
                });
            }
        },
        mounted(){
            this.getAdminLogList();
        }
    }
</script>

<style scoped>

</style>
