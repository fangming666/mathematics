<!--小题题目的组件-->
<template>
  <div class="rubric clearfix">
    <div class="rubric-item float-left"
         :class="[rubNum==index?'rubric-item-active':'',item.my_answer?'':'rubric-item-disabled']"
         v-for="(item,index) in rubricArr"
         @click="toExamination(index)">
      {{item.question_num}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "rubric",
    data() {
      return {
        rubNum: -1
      }
    },
    props: ["rubricArr"],
    methods: {
      toExamination(index) {
        if (!this.rubricArr[index].my_answer) return;
        this.rubNum = index;
        this.$emit("toExaminationRubric", index)
      }
    }
  }
</script>

<style scoped>

</style>
