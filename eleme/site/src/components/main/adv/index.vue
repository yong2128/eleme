<template>
    <div id="adv">
        <Vip/>
        <Slider/>
    </div>
</template>

<script>
import Vip from "./vip"
import Slider from "./slider"
export default {
    name : "adv",
    components : {
        Vip,Slider
    }
}
</script>

<style scoped>
    #adv{
        width: 3rem;
        overflow: hidden;
        margin: 0 auto 0.1rem;
    }
</style>