<template>
  <!--成功交卷模态框-->
  <transition name="fade">
    <div class="sub-success-warp">
      <div class="sub-success">
        <img src="./../../../static/imgs/Fill.svg" alt="fill">
        <p>{{successText}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "sub_success",
    props: ["successText"]
  }
</script>

<style scoped>

</style>
