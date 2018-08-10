<template>
  <!--考试列表显示的vip-->
  <transition name="fade">
    <div class="member">
      <img src="./../../../static/imgs/Shape.png"
           srcset="./../../../static/imgs/Shape@2x.png 2x,./../../../static/imgs/Shape@3x.png 3x" alt="Shape">
      <span>离会员到期时间还有{{memberDate}}</span>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "member",
    props: ["memberDate"]
  }
</script>

<style scoped>

</style>
