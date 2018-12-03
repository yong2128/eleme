<template>
    <el-dialog :title="msg" :visible="dialogFormVisible" @update:visible="close(false)">
        <el-form >
            <el-form-item label="店铺类别名称" :label-width="formLabelWidth">
                <el-input ref="shopTypeName" autocomplete="off" placeholder="请输入店铺类别"></el-input>
            </el-form-item>

            <el-form-item label="店铺类别排序" :label-width="formLabelWidth">
                <el-input ref="shopOrder" autocomplete="off" placeholder="请输入店铺类别排序序号"></el-input>
            </el-form-item>

            <el-form-item label="店铺类别图片" :label-width="formLabelWidth">
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
                <img width="100" v-if="shopTypePic.length > 0" :src="shopTypePic" alt="">
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close(false)">取 消</el-button>
            <el-button type="primary" @click="addShopType">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "addShopType",
        props : ["dialogFormVisible","getShopTypeList","shopTypeId"],
        data(){
            return {
                formLabelWidth: '120px',
                // dialogFormVisible : false
                shopTypePic : "",
                msg : "添加店铺类别"
            }
        },
        methods : {
            upChange(file){
                var reader=new FileReader();//对角
                reader.readAsDataURL(file.raw);
                var _this=this;
                reader.onload=function(){
                    _this.shopTypePic=this.result;
                }
            },
            close(v){
                this.$emit('update:dialogFormVisible',v);
                this.$refs.shopTypeName.clear();
                this.$refs.shopOrder.clear();
                this.$refs.upload.clearFiles();
            },
            addShopType(){
                var formdata = new FormData();
                formdata.set("shopTypeName",this.$refs.shopTypeName.$data.currentValue);
                formdata.set("shopOrder",this.$refs.shopOrder.$data.currentValue);
                formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0]);
                if(this.shopTypeId.length > 0){   //表示修改
                    formdata.set("shopTypeId",this.shopTypeId);
                    this.$ajax.put("/addShopType",formdata).then(data=>{
                        this.$emit('update:dialogFormVisible',false);
                        this.$refs.shopTypeName.clear();
                        this.$refs.shopOrder.clear();
                        this.$refs.upload.clearFiles();
                        if(data.ok){
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            this.getShopTypeList(1);
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                }else{   //表示添加
                    this.$ajax.post("/addShopType",formdata).then(data=>{
                        this.$emit('update:dialogFormVisible',false);
                        this.$refs.shopTypeName.clear();
                        this.$refs.shopOrder.clear();
                        this.$refs.upload.clearFiles();
                        if(data.ok){
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                            this.getShopTypeList(1);
                        }else{
                            this.$message.error(data.msg);
                        }
                    });
                }
            },
            //根据shopTypeId获取店铺类别信息
            getShopTypeInfoById(){
                this.$ajax.get("/getShopTypeInfoById",{
                    params : {shopTypeId : this.shopTypeId}
                }).then(data=>{
                    this.$refs.shopTypeName.$data.currentValue = data.shopTypeInfo.shopTypeName;
                    this.$refs.shopOrder.$data.currentValue = data.shopTypeInfo.shopOrder;
                    this.shopTypePic = "http://127.0.0.1/" + data.shopTypeInfo.shopTypePic;
                });
            }
        },
        mounted(){
            if(this.shopTypeId.length > 0){
                this.msg = "修改店铺类别";
                this.getShopTypeInfoById();
            }
        }
    }
</script>

<style scoped>

</style>
