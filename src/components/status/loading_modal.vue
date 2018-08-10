<template>
  <transition name="fade">
    <div class="loading-modal-warp">
      <div class="loading-modal text-center">
        <i class="d-block fa fa-spin fa-spinner"></i>
        <p>{{loadText}}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "loading-modal",
    props: ["loadText"]
  }
</script>

<style scoped>

</style>
