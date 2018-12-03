<template>

    <el-dialog title="添加商品" :visible="goodsVisible" @update:visible="v=>$emit('update:goodsVisible',v)">
        <el-form>
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input ref="goodsName" autocomplete="off" placeholder="请输入商品名称"></el-input>
            </el-form-item>

            <el-form-item label="店铺名称":label-width="formLabelWidth">
                <el-select v-model="shopId" filterable placeholder="请选择" @change="getGoodsTypeInfo(shopId)">
                    <el-option
                        v-for="item in shopInfo"
                        :key="item._id"
                        :label="item.shopName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品类别":label-width="formLabelWidth">
                <el-select v-model="goodsTypeId" filterable placeholder="请选择">
                    <el-option
                        v-for="item in goodsTypeInfo"
                        :key="item._id"
                        :label="item.goodsTypeName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品价格" :label-width="formLabelWidth">
                <el-input ref="goodsPrice" autocomplete="off" placeholder="请输入商品价格"></el-input>
            </el-form-item>

            <el-form-item label="商品排序" :label-width="formLabelWidth">
                <el-input ref="goodsOrder" autocomplete="off" placeholder="请输入商品排序"></el-input>
            </el-form-item>

            <el-form-item label="是否热销" :label-width="formLabelWidth">
                <el-select v-model="isHot" filterable placeholder="请选择">
                    <el-option key="1" label="是" value="1"></el-option>
                    <el-option key="0" label="否" value="0"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="商品图片":label-width="formLabelWidth">
                <el-upload
                    class="upload-demo"
                    action=""
                    ref="upload"
                    multiple
                    :on-change="upChange"
                    :limit="3"
                    :auto-upload="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif/jpeg文件，且不超过500kb</div>
                </el-upload>
                <img width="100" v-if="goodsPic.length > 0" :src="goodsPic" alt="">
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:goodsVisible',false)">取 消</el-button>
            <el-button type="primary" @click="onSub">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "addGoods",
        props : ["goodsVisible","getGoodsList","goodsTypeID","goodsId"],
        data(){
            return {
                shopId : "",   //用于展示店铺名称
                goodsTypeId : "",  //用于展示商品类别
                formLabelWidth : "100px",
                isHot : "",
                goodsTypeInfo : [],
                shopInfo : [],
                typeInfo : [],
                goodsPic : ""
            }
        },
        methods : {
            upChange(file){
                var reader=new FileReader();//对象
                reader.readAsDataURL(file.raw);
                var _this=this;
                reader.onload=function(){
                    _this.goodsPic=this.result;
                }
            },
            //根据商品类别id查找商品类别信息和店铺信息
            getShopById(id){
                this.$ajax.get("/getShopByGoodsTypeId",{
                    params : {goodsTypeId : id}
                }).then(data=>{
                    this.shopId = data.shopInfo[0].shopId;
                    this.goodsTypeId = data.shopInfo[0]._id;
                    this.goodsTypeInfo = [data.shopInfo[0]];
                    this.getInfo();
                });
            },
            onSub(){
                var formdata = new FormData();
                formdata.set("goodsName",this.$refs.goodsName.currentValue);
                formdata.set("shopId",this.shopId);
                formdata.set("goodsTypeId",this.goodsTypeId);
                formdata.set("goodsPrice",this.$refs.goodsPrice.currentValue);
                formdata.set("isHot",this.isHot);
                formdata.set("goodsOrder",this.$refs.goodsOrder.currentValue);
                formdata.set("goodsPic",document.querySelector(".el-upload__input").files[0]);

                if(this.goodsId.length > 0){  //修改
                    formdata.set("goodsId",this.goodsId);
                    this.$ajax.put("/addGoods",formdata).then(data=>{
                        this.$emit('update:goodsVisible',false);
                        if(data.ok){
                            this.$message({
                                message : data.msg,
                                type : "success"
                            });
                            this.getGoodsList(1);
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                }else{    //添加
                    this.$ajax.post("/addGoods",formdata).then(data=>{
                        this.$emit('update:goodsVisible',false);
                        if(data.ok){
                            this.$message({
                                message : data.msg,
                                type : "success"
                            });
                            if(!this.goodsTypeID){
                                this.getGoodsList(1);
                            }else{
                                this.$router.push("/goodsList");
                            }
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                }
            },
            //获取所有店铺信息
            getInfo(){
                this.$ajax.get("/getInfo").then(data=>{
                    this.shopInfo = data.shopList;
                });
            },
            //根据店铺id查找商品类别信息
            getGoodsTypeInfo(id){
                this.$ajax.get("/getGoodsTypeInfo",{
                    params : {id}
                }).then(data=>{
                    this.goodsTypeInfo = data.goodsTypeList;
                });
            },
            //根据商品id查找信息
            getGoodsInfo(){
                this.$ajax.get("/getGoodsInfoById",{
                    params : {
                        id : this.goodsId
                    }
                }).then(data=>{
                    this.$refs.goodsName.currentValue = data.oneInfo.goodsName;
                    this.shopId = data.oneInfo.shopId;
                    this.goodsTypeId = data.oneInfo.goodsTypeId;
                    this.$refs.goodsPrice.currentValue = data.oneInfo.goodsPrice;
                    this.$refs.goodsOrder.currentValue = data.oneInfo.goodsOrder;
                    this.isHot = data.oneInfo.isHot;
                    this.goodsPic = "http://127.0.0.1/" + data.oneInfo.goodsPic;
                });
            }
        },
        mounted(){
            if(this.goodsId.length > 0){  //表示修改
                this.getGoodsInfo();
            }else{   //表示添加
                if(this.goodsTypeID){   //表示从商品类别页进入
                    // this.goodsTypeId = this.goodsTypeID;
                    this.getShopById(this.goodsTypeID);
                }else{   //表示从商品页进入
                    this.getInfo();
                }
            }
        }
    }
</script>

<style scoped>

</style>
