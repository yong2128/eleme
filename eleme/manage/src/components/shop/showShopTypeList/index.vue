<template>
    <div>
        <div class="toolbar">
            <el-form :inline="true"class="demo-form-inline">
                <el-form-item label="搜索">
                    <el-input  placeholder="类别" ref="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle @click="getShopTypeList" title="搜索"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible=true">添加店铺类别</el-button>
                    <!--<el-button type="primary" @click="$refs.shopType.$data.dialogFormVisible = true">添加店铺类别</el-button>-->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getShopTypeList(currentPage,1)" title="自定义字段排序">排序</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getShopTypeList(currentPage,0)" title="按添加时间排序">默认排序</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="shopTypeList" style="width: 97%">
            <el-table-column label="店铺类别列表">
                <el-table-column label="id" prop="_id" width="260px"></el-table-column>

                <el-table-column label="店铺类别名称" width="200px">
                    <template slot-scope="scope">
                        {{scope.row.shopTypeName}}
                    </template>
                </el-table-column>

                <el-table-column label="店铺类别图片"  width="160px">
                    <template slot-scope="scope">
                        <!--'http://127.0.0.1/upload/' + scope.row.shopTypePic-->
                        <img width="100px" style="display: block" height="100px" :src="scope.row.shopTypePic | imgUrl" alt="">
                    </template>
                </el-table-column>

                <el-table-column label="添加时间" width="200px">
                    <template slot-scope="scope">
                        {{scope.row.addTime | date}}
                    </template>
                </el-table-column>

                <el-table-column label="排序" width="140px">
                    <template slot-scope="scope">
                        {{scope.row.shopOrder}}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="mini"  @click="handleEdit(scope.row._id)">
                            修改
                        </el-button>
                        <el-button size="mini" type="danger"  @click="handleDelete(scope.row._id)" plain>
                            删除
                        </el-button>
                        <el-button size="mini" type="primary" @click="openShop(scope.row._id)">
                            添加店铺
                        </el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>

        <el-pagination
            @current-change="getShopTypeList"
            :current-page.sync="currentPage"
            layout="prev, pager, next, jumper"
            :page-count="pageSum">
        </el-pagination>

        <addShopType v-if="dialogFormVisible" :shopTypeId="shopTypeId" :getShopTypeList="getShopTypeList" :dialogFormVisible.sync="dialogFormVisible"></addShopType>
        <addShop v-if="dialogFormVisibleShop" :shopId="''" :typeId="typeId" :dialogFormVisibleShop.sync="dialogFormVisibleShop"></addShop>
    </div>
</template>

<script>
    import addShopType from "../addShopType"
    import addShop from "../addShop"
    export default {
        name: "index",
        data(){
            return {
                typeId : "",
                shopTypeList : [],
                dialogFormVisible : false,
                dialogFormVisibleShop :false,
                currentPage: 1,
                pageSum : 1,
                shopTypeId : ""
            }
        },
        components : {
            addShopType,
            addShop
        },
        methods : {
            getShopTypeList(pageI,order){
                this.$ajax.get("/getShopTypeList",{
                    params : {
                        pageIndex : pageI,
                        shopTypeName : this.$refs["keyword"].currentValue,
                        order
                    }
                }).then(data=>{
                    if(data.ok){
                        this.shopTypeList = data.shopTypeList;
                        this.currentPage = data.pageIndex;
                        this.pageSum = data.pageSum;
                    }
                })
            },
            handleEdit(id){
                this.dialogFormVisible = true;
                this.shopTypeId = id;
            },
            handleDelete(id){
                this.$ajax.delete("/deleteShopType",{
                    params : {id}
                }).then(data=>{
                    if(data.ok){
                        this.$message({
                            message: data.msg,
                            type: 'success'
                        });
                        this.getShopTypeList(this.currentPage);
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            },
            openShop(id){
                this.typeId = id;
                this.dialogFormVisibleShop = true;
            }
        },
        mounted(){
            this.getShopTypeList();
        }
    }
</script>

<style scoped>
</style>
