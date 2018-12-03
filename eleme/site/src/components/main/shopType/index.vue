<template>
    <div id="type">

        <mt-swipe :auto="4000"  :show-indicators="false">
            <mt-swipe-item v-for="(item,i) in shopTypeList" :key="i">
                <a href="javascript:;" v-for="(info,j) in item" :key="j" @click="details(info._id)">
                    <img :src="info.shopTypePic | imgUrl" alt="">
                    <span>{{info.shopTypeName}}</span>
                </a>
            </mt-swipe-item>
        </mt-swipe>

    </div>
</template>

<script>
export default {
    name : "shopType",
    data(){
        return {
            shopTypeList : []
        }
    },
    methods : {
        getShopTypeList(){
            this.$ajax.get("/getShopTypeList").then(data=>{
                this.shopTypeList = data.shopTypeInfo;
            })
        },
        details(id){
            this.$router.push("/shopListDetails/" + id);
        }
    },
    mounted(){
        this.getShopTypeList();
    }
}
</script>

<style scoped>
    #type{
        width: 100%;
    }
</style>


