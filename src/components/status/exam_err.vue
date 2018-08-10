<template>
  <!--上拉加载的顶部的错误状态-->
  <transition name="fade">
      <div class="exam-err">
        <img src="./../../../static/imgs/sad-tear.png" alt="sad">{{errText}}
      </div>
  </transition>
</template>

<script>
  export default {
    name: "exam-err",
    props:["errText"]
  }
</script>

<style scoped>

</style>
