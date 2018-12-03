<template>
    <div>
        <ul>
            <li v-for="(item,i) in info" :key="i" :class="goodsTypeId === item._id ? 'active' : '' " @click="getthing(item._id)">{{item.goodsTypeName}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name : "shopTypeTem",
    props : ["info","getInfo"],
    data(){
        return {
            goodsTypeId : ""
        }
    },
    methods : {
        getthing(id){    //通过商品类别的id获取商品
            this.goodsTypeId = id;
            this.$emit('getInfo',id);
        }
    },
    mounted(){
        if(this.info){
            this.goodsTypeId = this.info[0]._id;
            this.$emit('getInfo',this.goodsTypeId);
        }
    }
}
</script>

<style scoped>
    ul{
        top: 0;
        position: absolute;
        bottom: 0;
        background: #eee;
        border-right: 1px solid #aaa;
    }
    li{
        width: 0.8rem;
        height: 0.3rem;
        font-size: 0.11rem;
        line-height: 0.3rem;
        padding: 0.05rem;
        color: #333;
    }
    .active{
        background: #fff;
    }
</style>
