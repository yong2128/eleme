<template>
    <div>
        <div class="toolbar">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="搜索">
                    <el-input  placeholder="店铺" ref="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button icon="el-icon-search" circle @click="getShopList(currentPage)" title="搜索"></el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="openShopVisible('')">添加店铺</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getShopList(currentPage,1)" title="自定义字段排序">排序</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getShopList(currentPage,0)" title="按添加时间排序">默认排序</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="shopList" style="width: 97%">
            <el-table-column label="店铺管理">
                <!--<el-table-column label="id" prop="_id" width="260px"></el-table-column>-->

                <el-table-column label="店铺名称" width="160px" prop="shopName"></el-table-column>

                <el-table-column label="店铺图片"  width="120px">
                    <template slot-scope="scope">
                        <img width="100px" style="display: block" height="100px" :src="scope.row.shopPic | imgUrl" alt="">
                    </template>
                </el-table-column>

                <el-table-column label="添加时间" width="200px">
                    <template slot-scope="scope">
                        {{scope.row.addTime | date}}
                    </template>
                </el-table-column>

                <el-table-column label="排序" width="100px" prop="shopOrder"></el-table-column>

                <el-table-column label="店铺地址" width="160px" prop="shopAddress"></el-table-column>

                <el-table-column label="联系电话" width="160px" prop="shopTel"></el-table-column>

                <el-table-column label="店铺类别" width="120px" prop="typeInfo[0].shopTypeName">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div style="margin-bottom:10px">
                            <el-button size="mini" type="mini"  @click="openShopVisible(scope.row._id)">
                                修改
                            </el-button>
                            <el-button size="mini" type="danger"  @click="handleDelete(scope.row._id)" plain>
                                删除
                            </el-button>
                        </div>
                        <div>
                            <el-button size="mini" type="primary" @click="addGoodsType(scope.row._id)">
                                添加商品类别
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>

        <el-pagination
            @current-change="getShopList"
            :current-page.sync="currentPage"
            layout="prev, pager, next, jumper"
            :page-count="pageSum">
        </el-pagination>

        <addShop v-if="dialogFormVisible" :shopId="shopId" :getShopList="getShopList" :dialogFormVisibleShop.sync="dialogFormVisible"></addShop>
        <addGoodsType v-if="goodsTypeVisible" :goodsTypeVisible="goodsTypeVisible" :goodsTypeVisible.sync="goodsTypeVisible" :shopID="shopID" :goodsTypeID="''"></addGoodsType>
    </div>
</template>

<script>
    import addShop from "./addShop"
    import addGoodsType from "../goods/addGoodsType"
    export default {
        name: "showShopList",
        data(){
            return {
                shopList : [],
                dialogFormVisible : false,
                goodsTypeVisible : false,
                pageSum : 1,
                currentPage : 1,
                shopId : "",  //店铺的Id号
                shopID : "",
                shopTypeID : ""
            }
        },
        methods : {
            addGoodsType(id){
                this.shopID = id;
                this.goodsTypeVisible = true;
            },
            openShopVisible(id){
                this.dialogFormVisible = true;
                this.shopId = id;
            },
            getShopList(pageI,order){
                this.$ajax.get("/getShopList",{
                    params : {
                        pageIndex : pageI,
                        shopName : this.$refs["keyword"].currentValue,
                        order
                    }
                }).then(data=>{
                    if(data.ok){
                        this.shopList = data.shopList;
                        this.pageSum = data.pageSum;
                        this.currentPage = data.pageIndex;
                    }
                });
            },
            handleDelete(id){
                this.$ajax.delete("/deleteShopInfo",{
                    params : {id}
                }).then(data=>{
                    this.getShopList(this.currentPage);
                    if(data.ok){
                        this.$message({
                            message : data.msg,
                            type : "success"
                        });
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            }
        },
        components : {
            addShop,
            addGoodsType
        },
        mounted(){
            this.getShopList(1);
        }
    }
</script>

<style scoped>

</style>
