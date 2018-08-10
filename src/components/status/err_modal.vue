<template>
    <div class="err-modal-warp">
      <div class="err-modal">
        {{errText}}
      </div>
    </div>
</template>

<script>
  export default {
    name: "err_modal",
    props: ["errText"]
  }
</script>

<style scoped>

</style>
