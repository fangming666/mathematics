<!--提交全部答案-->
<template>
  <div class="finish-answer">
    <rubric :rubricArr="questionList" @toExaminationRubric="toExaminationFinish"></rubric>
    <button @click="finishAll" class="btn">交卷并查看结果</button>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import rubric from "./rubric"

  export default {
    name: "finish_answer",
    methods: {
      finishAll() {
        this.$emit("finish")
      },

      toExaminationFinish(index) {
        this.$emit("toExaminationFinish", index)
      }
    },
    computed: {
      ...mapState(["questionList"])
    },
    components: {
      rubric
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
