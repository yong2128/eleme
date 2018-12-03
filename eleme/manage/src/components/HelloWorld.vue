<template>
  <div class="hello">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '欢迎登录饿了么后台管理系统'
    }
  }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    div{
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url("../assets/startup.png") 100% 100%;
    }
    h1 {
      font-weight: 900;
        font-size: 60px;
        font-family: "Microsoft YaHei";
        text-align: center;
        margin-top: 300px;
        color: #fff;
    }
</style>
