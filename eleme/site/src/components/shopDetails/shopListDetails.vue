<template>
    <div>
        <mt-header v-if="shopInfo.length > 0" :title="shopInfo[0].shopTypeInfo[0].shopTypeName">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <mt-button icon="more" slot="right"></mt-button>
        </mt-header>
        <ShopListTem v-if="shopInfo.length > 0" :shopInfo="shopInfo"></ShopListTem>
    </div>
</template>

<script>
import ShopListTem from "@/components/main/shop/shopListTem"
export default {
    name : "shopDetails",
    data(){
        return {
            id : "",
            shopInfo : []
        }
    },
    components : {
        ShopListTem
    },
    methods : {
        getShopInfo(){
            this.$ajax.get("/getShopInfo",{
                params : {id : this.id}
            }).then(data=>{
                this.shopInfo = data.oneInfo;
            });
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        this.getShopInfo();
    }

}
</script>

<style scoped>

</style>

