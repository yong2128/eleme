<template>
    <div id="shop">
        <div id="title"><span>商家推荐</span></div>
        <filter-header/>
        <shop-list/>
    </div>
</template>

<script>
import FilterHeader from "./filterHeader"
import ShopList from "./shopList"
export default {
    name : "shop",
    components : {
        FilterHeader,ShopList
    }
}
</script>

<style scoped>
    #title{
        font-size : 0.15rem;
        overflow: hidden;
    }
    #title:before , #title:after{
        float: left;
        display : block;
        content : "";
        width : 0.15rem;
        height : 0.01rem;
        background : #999;
        margin : 0.1rem 0.1rem;
    }
    #title:before{
        margin-left : 1.1rem;
    }
    #title span{
        float: left;
    }
</style>