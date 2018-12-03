<template>
    <div>
        <p>
            <img src="../../../../static/vip.jpeg" alt="">
            <span>超级会员</span>
            <b></b>
            <span>每月领20元红包</span>
        </p>
        <a href="javascript:;">立即开通 ></a>
    </div>
</template>

<script>
export default {
    name : "vip"
}
</script>

<style scoped>
    div{
        height: 0.34rem;
        background-image: linear-gradient(90deg,#ffefc4,#f3dda0);
        color: #644f1b;
        font-size: 0.3rem;
        padding: 0 0.15rem;
        margin: 0.05rem 0;
    }
    div p{
        line-height: 0.34rem;
    }
    div p img{
        width : 0.15rem;
        height: 0.15rem;
        float: left;
        margin: 0.1rem 0.05rem 0 0;
    }
    div p span{
        font-size: 0.14rem;
        float: left;
    }
    div p span:nth-last-of-type(1){
        font-size: 0.05rem;
        float: left;
    }
    b{
        float: left;
        width: 0.04rem;
        height: 0.04rem;
        background: #644f1b;
        margin: 0.15rem 0.06rem 0;
        border-radius : 50%;
    }
    div a{
        font-size : 0.05rem;
        float: right;
        line-height: 0.34rem;
        color: #644f1b;
    }
</style>
