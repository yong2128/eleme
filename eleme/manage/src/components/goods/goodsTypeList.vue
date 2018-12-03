<template>
    <div>
        <el-form :inline="true" class="demo-form-inline toolbar">
            <el-form-item label="搜索">
                <el-input  placeholder="商品类别" ref="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" circle @click="getGoodsTypeList(1)"></el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" round @click="handleEdit('')">添加商品类别</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" round title="自定义字段排序" @click="getGoodsTypeList(currentPage,1)">排序</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" round title="按添加时间排序" @click="getGoodsTypeList(currentPage,0)">默认排序</el-button>
            </el-form-item>
        </el-form>

        <el-table  style="width: 97%" :data="goodsTypeList":row-class-name="tableRowClassName">
            <el-table-column label="商品类别管理">

                <el-table-column prop="goodsTypeName" label="商品类别名称" width="180"></el-table-column>

                <el-table-column label="店铺名称" width="180" prop="shopInfo[0].shopName"></el-table-column>

                <el-table-column label="店铺类别" prop="typeInfo[0].shopTypeName"></el-table-column>

                <el-table-column label="排序" prop="goodsTypeOrder"></el-table-column>

                <el-table-column label="添加时间">
                    <template slot-scope="scope">
                        <div>
                            {{scope.row.addTime | date}}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.row._id)">编辑</el-button>
                        <el-button @click="handleClick(scope.row._id)" type="text" size="small">删除</el-button>
                        <el-button type="text" size="small" @click="openAddGoods(scope.row._id)">添加商品</el-button>
                    </template>
                </el-table-column>
            </el-table-column>
        </el-table>

        <el-pagination
            @current-change="getGoodsTypeList"
            :current-page.sync="currentPage"
            layout="prev, pager, next, jumper"
            :page-count="pageSum">
        </el-pagination>

        <addGoodsType v-if="dialogFormVisible" :getGoodsTypeList="getGoodsTypeList" :goodsTypeVisible.sync="dialogFormVisible" :goodsTypeID="goodsTypeID" :shopID="''"></addGoodsType>
        <addGoods v-if="goodsVisible" :goodsVisible="goodsVisible" :goodsTypeID="goodsTypeID" :goodsVisible.sync="goodsVisible" :goodsId="''"></addGoods>
    </div>
</template>

<script>
    import addGoodsType from "./addGoodsType"
    import addGoods from "./addGoods"
    export default {
        name: "goodsTypeList",
        data(){
            return {
                goodsTypeList : [],
                dialogFormVisible : false,
                goodsVisible : false,
                pageSum : 1,   //总页数
                currentPage : 1,   //当前页
                shopInfo : [],
                goodsTypeID : ""
            }
        },
        components : {
            addGoodsType,
            addGoods
        },
        methods : {
            handleEdit(id){
                this.dialogFormVisible = true;
                this.goodsTypeID = id;
            },
            openAddGoods(id){
                this.goodsVisible = true;
                this.goodsTypeID = id;
            },
            handleClick(id){
                this.$ajax.delete("/deleteGoodsTypeInfo",{
                    params : {goodsTypeId : id}
                }).then(data=>{
                    if(data.ok){
                        this.$message({
                            message : data.msg,
                            type : "success"
                        });
                        this.getGoodsTypeList(this.currentPage);
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === 1) {
                    return 'warning-row';
                } else if (rowIndex === 3) {
                    return 'success-row';
                }
                return '';
            },
            getGoodsTypeList(pageI,goodsTypeOrder){
                this.$ajax.get("/getGoodsTypeList",{
                    params : {
                        pageIndex : pageI,
                        goodsTypeName : this.$refs["keyword"].currentValue,
                        goodsTypeOrder
                    }
                }).then(data=>{
                    if(data.ok){
                        this.goodsTypeList = data.allInfo;
                        this.currentPage = data.pageIndex;
                        this.pageSum = data.pageSum;
                    }else{
                        this.$message.error(data.msg);
                    }
                });
            }
        },
        mounted(){
            this.getGoodsTypeList(1);
        }
    }
</script>

<style scoped>

</style>
