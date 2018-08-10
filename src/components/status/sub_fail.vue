<template>
  <!--提交失败的页面-->
  <transition name="fade">
    <div class="sub-fail-warp">
      <div class="sub-fail">
        <p class="sub-fail-info">网络中断，提交失败</p>
        <p><span @click="leave">离开</span><span @click="againSub">再次提交</span></p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "sub-fail",
    methods: {
      leave() {
        this.$emit("leave")
      },
      againSub() {
        this.$emit("againSub")
      }
    }
  }
</script>

