<template>
    <div id="main">
        <ShopType/>
        <Adv/>
        <Shop/>
    </div>
</template>

<script>
import ShopType from "./shopType/index.vue"
import Adv from "./adv/index.vue"
import Shop from "./shop/index"
export default {
    name : "Main",
    components : {
        ShopType,Adv,Shop
    }
}
</script>

<style scoped>
</style>


