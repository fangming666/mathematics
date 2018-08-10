<template>
  <transition name="fade">
    <div class="loading">
      <p class="text-center text-warning"><i class="fa fa-spin fa-spinner"></i>数据正在生成</p>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "loading"
  }
</script>

<style scoped>

</style>
