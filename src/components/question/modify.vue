<template>
  <!--修改答案-->
  <transition name="fade">
    <div class="modify-warp">
      <div class="modify">
        <div class="modify-head clearfix">
          <span class="float-left">请选择需要修改答案的题号，进行修改</span>
          <span class="float-right" @click="closeWindow">关闭</span>
        </div>
        <rubric :rubricArr="questionList" @toExaminationRubric="toExaminationFinish"></rubric>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapState} from "vuex";
  import rubric from "./rubric"

  export default {
    name: "modify",
    computed: {
      ...mapState(["questionList"])
    },
    methods: {
      toExaminationFinish(index) {
        this.$emit("toExaminationFinish", index)
      },
      closeWindow() {
        this.$emit("closeModify")
      }
    },
    components: {
      rubric
    },
  }
</script>

<style scoped>

</style>
