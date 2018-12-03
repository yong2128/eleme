<template>
  <div class="hello">
    <Top></Top>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script>
import Top from "@/components/header";
import Main from "@/components/main";
import Footer from "@/components/footer";
export default {
  name: 'index',
  components : {
    Top,Main,Footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
