<template>
    <div id="carl">
        <div>满30减10元，满50减13元，满80减15元</div>
        <div :style="{display : isShow ? 'block' : 'none'}" v-if="$store.state.allInfo.length > 0">
            <div>已选商品<span>&#xe652; 清空</span></div>
            <div id="goods">
                <div v-for="(item,i) in $store.state.allInfo" :key="i">
                    <p>{{item.info[0].goodsName}}</p>
                    <span>￥{{(item.info[0].goodsPrice / 1) * (item.num / 1)}}</span>
                    <AddNum class="add" :info="item" :shopId="item.info[0].shopId"></AddNum>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddNum from "@/components/car/addNum"
export default {
    name : "carlist",
    props : ["isShow"],
    components : {
        AddNum
    },
    mounted(){
    }
}
</script>

<style scoped>
    #car #carl{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 0.4rem;
        right: 0;
        height: auto;
        font-size: 0.12rem;
        z-index: -1;
    }
    #carl>div:nth-of-type(1){
        height: 0.16rem;
        line-height: 0.16rem;
        background: rgb(255,250,215);
        text-align: center;
        color: #555;
    }
    #carl>div:nth-of-type(2)>div:nth-of-type(1){
        padding-left: 0.05rem;
        height: 0.24rem;
        line-height: 0.24rem;
        background: rgb(236,239,241);
        color: #555;
    }
    #carl>div:nth-of-type(2)>div:nth-of-type(1) span{
        float: right;
        font-family: iconfont;
        margin-right: 0.1rem;
    }
    #carl #goods{
        padding-left: 0.05rem;
        background: #fff;
        overflow: hidden;
    }
    #carl #goods div{
        height: 0.4rem;
        background: #fff;
        line-height: 0.4rem;
        overflow: hidden;
    }
    #carl #goods div>p{
        float: left;
        font-size: 0.15rem;
    }
    #carl #goods div>span{
        float: left;
        margin: 0 0.1rem;
        color: #f00;
    }
    #carl #goods div .add{
        float: right;
    }
</style>
