<template>
    <div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <ShopListTem v-if="shopList.length > 0" :shopList="shopList"/>
            <mt-spinner v-if="flag" type="fading-circle"></mt-spinner>
        </div>
    </div>
</template>

<script>
import ShopListTem from "./shopListTem"
export default {
    name : "shop",
    data(){
        return {
            shopList : [],
            index : 0,
            loading : false,
            flag : true
        }
    },
    components : {
        ShopListTem
    },
    methods : {
        loadMore(){
            this.loading = true;
            this.$ajax.get("/getShopList",{
                params : {pageIndex : ++ this.index }
            }).then(data=>{
                if(data.ok){
                    if(data.info.length > 0){
                        this.shopList = this.shopList.concat(data.info);
                        this.loading = false;
                    }else{
                        this.flag = false;
                        this.loading = true;
                    }
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
