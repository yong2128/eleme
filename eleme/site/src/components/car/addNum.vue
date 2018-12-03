<template>
    <div id="addNum">
        <span @click.stop="add(1)">-</span>
        <span>{{info.num}}</span>
        <span @click.stop="add(2)">+</span>
    </div>
</template>


<script>
export default {
    name : "addnum",
    props : ["info","shopId"],
    methods : {
        add(type){
            this.$store.dispatch('create',{goodsId : this.info.goodsId, type,id : this.shopId});
        }
    }
}
</script>

<style scoped>
    #addNum{
        width: 0.7rem;
        font-size: 0.13rem;
    }
    #addNum span{
        display: block;
        float: left;
        width: 0.15rem;
        height: 0.15rem;
        border: 1px solid #2396ff;
        border-radius : 50%;
        text-align: center;
        line-height: 0.15rem;
        margin-top: 0.12rem;
    }
    #addNum span:nth-of-type(2){
        border: 0;
        margin: 0.12rem 0.04rem 0;
    }
    #addNum span:nth-last-child(1){
        background: #2396ff;
        color: #fff;
    }
    #addNum span:nth-child(1){
        color: #2396ff;
    }
</style>
