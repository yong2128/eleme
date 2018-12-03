<template>
    <el-dialog :title="msg" :visible="goodsTypeVisible" @update:visible="v=>$emit('update:goodsTypeVisible',v)">
        <el-form>
            <el-form-item label="商品类别名称" :label-width="formLabelWidth">
                <el-input ref="goodsTypeName" autocomplete="off" placeholder="请输入商品类别名称"></el-input>
            </el-form-item>

            <el-form-item label="排序" :label-width="formLabelWidth">
                <el-input ref="goodsTypeOrder" autocomplete="off" placeholder="请输入商品类别排序"></el-input>
            </el-form-item>

            <el-form-item label="店铺类别及名称" :label-width="formLabelWidth">
                <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" width="400px"></el-cascader>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:goodsTypeVisible',false)">取 消</el-button>
            <el-button type="primary" @click="onSub">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "addShopType",
        props : ["goodsTypeVisible","getGoodsTypeList","shopID","goodsTypeID"],
        data(){
            return {
                formLabelWidth: '120px',
                shopTypeInfo : [],// {_id: "5bf5133fc07e8a1f64d594c4", shopTypeName: "1", shopTypePic: "1542787903481.jpg", shopOrder: "1", addTime: 1542787903492}
                shopInfo : [],//{_id: "5bf54b72f935171f4cb6038d", shopName: "几点", shopPic: "1542804901667.jpg", shopAddress: "胡椒粉", shopTel: "123456789098", …}
                shop : [],        //存储店铺信息
                options : [],
                shopId : "",    //店铺id
                shopTypeId : "",   //店铺类别id
                selectedOptions : [],
                msg : "添加商品类别"
            }
        },
        methods : {
            onSub(){
                var goodsTypeName = this.$refs.goodsTypeName.$data.currentValue;
                var shopId = this.shopId;
                var shopTypeId = this.shopTypeId;
                var goodsTypeOrder = this.$refs.goodsTypeOrder.currentValue;
                if(this.goodsTypeID.length > 0){   //修改商品类别
                    this.$ajax.put("/addGoodsTypeList",{
                        goodsTypeId : this.goodsTypeID,
                        goodsTypeName,
                        goodsTypeOrder,
                        shopId,
                        shopTypeId
                    }).then(data=>{
                        this.$refs.goodsTypeName.clear();
                        this.$emit('update:goodsTypeVisible',false);
                        if(data.ok){
                            this.$message({
                                message : data.msg,
                                type : "success"
                            });
                            this.getGoodsTypeList(1);
                            this.msg = "添加商品类别";
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                }else{  //添加商品类别
                    this.$ajax.post("/addGoodsTypeList",{
                        goodsTypeName,
                        goodsTypeOrder,
                        shopId,
                        shopTypeId
                    }).then(data=>{
                        this.$refs.goodsTypeName.clear();
                        this.$emit('update:goodsTypeVisible',false);
                        if(data.ok){
                            this.$message({
                                message : data.msg,
                                type : "success"
                            });
                            if(this.shopID){
                                this.$router.push("/goodsTypeList");
                            }else{
                                this.getGoodsTypeList(1);
                            }
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                }
            },
            handleChange(value) {
                this.shopTypeId = value[0];
                this.shopId = value[1];
                // console.log(this.shopId,this.shopTypeId);
            },
            getShopType(){  //获取店铺类别信息
                this.$ajax.get("/getShopType").then(data=>{
                    this.shopTypeInfo = data.typeInfo;   //存储所有的店铺类别表信息
                    this.getShopById();
                    this.getShop();
                });
            },
            getShop(){   //获取店铺信息
                this.$ajax.get("/getInfo").then(data=>{
                    this.shopInfo = data.shopList;   //存储所有的店铺表信息
                    this.setOptions();
                });
            },
            getShopById(){   //通过店铺类别的id查找店铺，并存储
                for(var item in this.shopTypeInfo) {
                    var obj = {};
                    this.$ajax.get("/getShopById", {
                        params: {
                            shopTypeId: this.shopTypeInfo[item]._id
                        }
                    }).then(data => {
                        obj = data.shopInfo;
                        this.shop.push(obj);
                    });
                }
            },
            //根据店铺id查找店铺信息和店铺类别信息
            getAll(){
                this.$ajax.get("/getAll",{
                    params : {shopId : this.shopID}
                }).then(data=>{
                    this.selectedOptions = [data.allInfo[0].shopTypeId,data.allInfo[0]._id];
                    this.shopTypeId = data.allInfo[0].shopTypeId;
                    this.shopId = data.allInfo[0]._id;
                });
            },
            setOptions(){
                for(let key in this.shopTypeInfo){
                    let obj = {};
                    obj.value = this.shopTypeInfo[key]._id;
                    obj.label = this.shopTypeInfo[key].shopTypeName;
                    obj.children = [];
                    let arr = this.shop[key];
                    if(arr.length > 0){
                        arr.forEach(function(value,index,array){
                            let child = {};
                            child.value = value._id;
                            child.label = value.shopName;
                            obj.children.push(child)
                        })
                    }
                    this.options.push(obj);
                    this.check();
                }
            },
            check(){
                for(let i = 0;i < this.options.length;i ++){
                    let arr = this.options[i];
                    let child = arr.children;
                    if(child.length > 0){
                        for(let ch = 0;ch < child.length;ch ++){
                            if(arr.value === this.shopTypeID){
                                if(child[ch].value === this.shopID){
                                    this.selectedOptions = [arr.value,child[ch].value];
                                    this.shopId = child[ch].value;
                                    this.shopTypeId = arr.value;
                                }
                            }
                            break;
                        }
                    }
                }
            },
            //根据商品类别的id查找店铺信息和店铺类别信息
            getGoodsTypeAllInfo(){
                this.$ajax.get("/getGoodsTypeAllInfo",{
                    params : {goodsTypeId : this.goodsTypeID}
                }).then(data=>{
                    this.$refs.goodsTypeName.$data.currentValue = data.allInfo[0].goodsTypeName;
                    this.selectedOptions = [data.allInfo[0].shopTypeId,data.allInfo[0].shopId];
                    this.$refs.goodsTypeOrder.$data.currentValue = data.allInfo[0].goodsTypeOrder;
                    this.shopId = data.allInfo[0].shopId;
                    this.shopTypeId = data.allInfo[0].shopTypeId;
                });
            }
        },
        mounted(){
            this.getShopType();
            if(this.shopID.length > 0){  //从店铺列表页进入
                this.getAll();
            }
            if(this.goodsTypeID.length > 0){   //修改
                this.getGoodsTypeAllInfo();
                this.msg = "修改商品类别"
            }
        }
    }
</script>

<style scoped>
    .el-cascader{
        width: 400px;
    }
</style>
