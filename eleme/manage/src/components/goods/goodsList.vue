<template>
    <div>
        <div>
            <el-form :inline="true" class="demo-form-inline toolbar">
                <el-form-item label="搜索">
                    <el-input  placeholder="商品名称" ref="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle  @click="getGoodsList(currentPage)"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" round @click="handleEdit('')">添加商品</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" round title="自定义字段排序" @click="getGoodsList(currentPage,1)">排序</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" round title="按添加时间排序" @click="getGoodsList(currentPage,0)">默认排序</el-button>
                </el-form-item>
            </el-form>

            <el-table  style="width: 97%" :data="goodsList">
                <el-table-column label="商品管理">

                    <el-table-column prop="goodsName" label="商品名称" width="180"></el-table-column>

                    <el-table-column label="商品类别" width="180" prop="goodsTypeInfo[0].goodsTypeName">
                    </el-table-column>

                    <el-table-column label="店铺名称" width="180" prop="shopInfo[0].shopName">
                    </el-table-column>

                    <el-table-column label="商品价格">
                        <template slot-scope="scope">
                            <div>{{scope.row.goodsPrice | currency}}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="是否热销">
                        <template slot-scope="scope">
                            <div>{{scope.row.isHot / 1 ? "是" : "否"}}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="排序" width="180" prop="goodsOrder">
                    </el-table-column>

                    <el-table-column label="商品图片">
                        <template slot-scope="scope">
                            <img width="60" height="60" :src="scope.row.goodsPic | imgUrl" alt="">
                        </template>
                    </el-table-column>

                    <el-table-column label="添加时间">
                        <template slot-scope="scope">
                            <div>{{scope.row.addTime | date}}</div>
                        </template>
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="handleEdit(scope.row._id)">编辑</el-button>
                            <el-button @click="handleDelete(scope.row._id)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>

            <el-pagination
                @current-change="getGoodsList"
                :current-page.sync="currentPage"
                layout="prev, pager, next, jumper"
                :page-count="pageSum">
            </el-pagination>

            <addGoods v-if="dialogFormVisible" :goodsVisible.sync="dialogFormVisible" :getGoodsList="getGoodsList" :goodsId="goodsId" :goodsTypeID="''"></addGoods>
        </div>
    </div>
</template>

<script>
    import addGoods from "./addGoods"
    export default {
        name: "goodsList",
        data(){
            return {
                dialogFormVisible : false,
                goodsList : [],
                currentPage : 1,
                pageSum : 1,
                goodsId : ""
            }
        },
        components : {
            addGoods
        },
        methods : {
            getGoodsList(pageI,order){
                this.$ajax.get("/getGoodsList",{
                    params : {
                        pageIndex : pageI,
                        goodsName : this.$refs["keyword"].currentValue,
                        order
                    }
                }).then(data=>{
                    if(data.ok){
                        this.goodsList = data.allGoodsInfo;
                        this.currentPage = data.pageIndex;
                        this.pageSum = data.pageSum;
                    }
                });
            },
            handleDelete(id){
                console.log(id)
                this.$ajax.delete("/deleteGoods",{
                    params : {id}
                }).then(data=>{
                    if(data.ok){
                        this.$message({
                            message : data.msg,
                            type : "success"
                        });
                        this.getGoodsList(this.currentPage);
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            },
            handleEdit(id){
                this.goodsId = id;
                this.dialogFormVisible = true;
            }
        },
        mounted(){
            this.getGoodsList(1);
        }
    }
</script>

<style scoped>

</style>



<!--getShopTypeInfoById(){   //根据商品类别id获取店铺信息-->
<!--this.$ajax.get("/getShopTypeInfoById",{-->
<!--params : {goodsTypeId : this.goodsTypeId}-->
<!--}).then(data=>{-->
<!--if(data.ok){-->
<!--this.shopInfo = data.shopInfo;-->
<!--}-->
<!--});-->
<!--}-->

<!--this.goodsTypeId = this.goodsTypeInfo._id;-->
<!--//goodsTypeInfo是goodsTypeList表传过来的，包含-->
