<template>
    <div>
        <mt-swipe :auto="3000">
            <mt-swipe-item>
                <img src="../../../../static/slider1.jpeg" alt="" class="img">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../../../../static/slider2.jpeg" alt="" class="img">
            </mt-swipe-item>
        </mt-swipe>
        
    </div>
</template>

<script>
export default {
    name : "slider"
}
</script>

<style scoped>
    div{
        width: 3rem;
        height : 0.95rem;
    }
    img{
        width: 100%;
        height: 100%;
    }
</style>


