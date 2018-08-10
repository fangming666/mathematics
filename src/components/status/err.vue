<template>
  <!--网络出错页面-->
  <div class="err">
    <img src="./../../../static/imgs/err-bg.png"
         srcset="./../../../static/imgs/err-bg@2x.png 2x,./../../../static/imgs/err-bg@3x.png 3x" alt="err">
    <p>网络请求超时，请刷新重试！</p>
    <a @click="freshen"><i class="fa fa-undo"></i>刷新</a>
  </div>
</template>

<script>
  export default {
    name: "err",
    methods: {
      freshen() {
        this.$emit("freshen")
      }
    }
  }
</script>

<style scoped>

</style>
