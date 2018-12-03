<template>
    <el-dialog :title="msg" :visible="dialogFormVisibleShop" @update:visible="close(false)">
        <el-form>
            <el-form-item label="店铺名称" :label-width="formLabelWidth">
                <el-input ref="shopName" autocomplete="off" placeholder="请输入店铺名称"></el-input>
            </el-form-item>

            <el-form-item label="店铺排序" :label-width="formLabelWidth">
                <el-input ref="shopOrder" autocomplete="off" placeholder="请输入店铺排序序号"></el-input>
            </el-form-item>

            <el-form-item label="店铺地址" :label-width="formLabelWidth">
                <el-input ref="shopAddress" autocomplete="off" placeholder="请输入店铺所在地址"></el-input>
            </el-form-item>

            <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input ref="shopTel" autocomplete="off" placeholder="请输入店铺联系电话"></el-input>
            </el-form-item>

            <el-form-item label="店铺类别" :label-width="formLabelWidth">
                <el-select v-model="shopTypeId" placeholder="请选择">
                    <el-option
                        v-for="item in shopType"
                        :key="item._id"
                        :label="item.shopTypeName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="店铺图片" :label-width="formLabelWidth">
                <el-upload
                    class="upload-demo"
                    action=""
                    ref="upload"
                    :on-change="upChange"
                    multiple
                    :limit="3"
                    :auto-upload="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif/jpeg文件，且不超过500kb</div>
                </el-upload>
                <img v-if="shopPic.length>0" width="100" :src="shopPic" alt="">
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close(false)">取 消</el-button>
            <el-button type="primary" @click="addShop">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "addShop",
        props : ["dialogFormVisibleShop","getShopList","typeId","shopId"],
        data(){
            return {
                shopTypeId : "5bf4cb7e5fccb414b4a2dc62",
                formLabelWidth: '120px',
                shopType : [],
                shopPic : "",
                msg : "添加店铺"
            }
        },
        methods : {
            upChange(file){
                var reader=new FileReader();//对角
                reader.readAsDataURL(file.raw);
                var _this=this;
                reader.onload=function(){
                    _this.shopPic=this.result;
                }
            },
            comClose(){
                this.$refs.shopName.clear();
                this.$refs.shopOrder.clear();
                this.$refs.shopAddress.clear();
                this.$refs.shopTel.clear();
                this.$refs.upload.clearFiles();
            },
            close(v){
                this.$emit('update:dialogFormVisibleShop',v);
                this.comClose();
            },
            addShop(){
                var formdata = new FormData();
                formdata.set("shopName",this.$refs.shopName.$data.currentValue);
                formdata.set("shopOrder",this.$refs.shopOrder.$data.currentValue);
                formdata.set("shopAddress",this.$refs.shopAddress.$data.currentValue);
                formdata.set("shopTel",this.$refs.shopTel.$data.currentValue);
                formdata.set("shopTypeId",this.shopTypeId);
                formdata.set("shopPic",document.querySelector(".el-upload__input").files[0]);

                if(this.shopId.length > 0){ //表示修改
                    formdata.set("shopId",this.shopId);
                    this.$ajax.put("/addShop",formdata).then(data=>{
                        this.$emit('update:dialogFormVisibleShop',false);
                        this.comClose();
                        if(data.ok){
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            if(this.getShopList){
                                this.getShopList(1);
                            }else{
                                this.$router.push("/showShopList");
                            }
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                }else{    //添加
                    this.$ajax.post("/addShop",formdata).then(data=>{
                        this.$emit('update:dialogFormVisibleShop',false);
                        this.comClose();
                        if(data.ok){
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            if(this.getShopList){
                                this.getShopList(1);
                            }else{
                                this.$router.push("/showShopList");
                            }
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                }
            },
            getShopType(){
                this.$ajax.get("/getShopType").then(data=>{
                    this.shopType = data.typeInfo;
                });
            },
            getShopInfoById(){   //根据Id获取当前的店铺信息
                this.$ajax.get("/getShopInfoById",{
                    params : {shopId : this.shopId}
                }).then(data=>{
                    this.$refs.shopName.$data.currentValue=data.shopInfo.shopName;
                    this.shopTypeId=data.shopInfo.shopTypeId;
                    this.shopPic= "http://127.0.0.1/" + data.shopInfo.shopPic;
                    this.$refs.shopOrder.$data.currentValue = data.shopInfo.shopOrder;
                    this.$refs.shopAddress.$data.currentValue = data.shopInfo.shopAddress;
                    this.$refs.shopTel.$data.currentValue = data.shopInfo.shopTel;
                });
            }
        },
        mounted(){
            this.getShopType();
            this.shopTypeId=this.typeId;
            if(this.shopId.length > 0){
                console.log(1111)
                this.msg = "修改店铺信息";
                this.getShopInfoById();
            }
        }
    }
</script>

<style scoped>

</style>
