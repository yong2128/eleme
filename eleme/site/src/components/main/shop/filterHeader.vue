<template>
    <div id="header">
        <div>
            <a href="javascript:;">综合排序&#xe614;</a>
            <a href="javascript:;">距离最近</a>
            <a href="javascript:;">品质联盟</a>
            <a href="javascript:;">筛选&#xe667;</a>
        </div>
    </div>
</template>

<script>
export default {
    name : "filterHeader"
}
</script>

<style scoped>
    #header div{
        border-bottom : 1px solid #ddd;
        line-height: 0.3rem;
        height: 0.3rem;
        font-size : 0.1rem;
        display: flex;
        justify-content: space-around;
    }
    a{
        font-family: iconfont;
        font-size : 0.1rem;
    }
</style>
