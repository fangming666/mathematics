<template>
  <transition name="fade">
    <!--选择年级-->
    <div class="grade clearfix">
      <div class="grade-item float-left" :class="gradeIndex==index?'grade-item-active':''"
           v-for="(item,index) in gradeList" @click="changeGrade(index,item.grade)">
        {{item.grade_label}}
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "grade",
    data() {
      return {
        gradeIndex: 0
      }
    },
    computed: {
      ...mapState(["gradeList", "gradeNum"]),
    },
    methods: {
      changeGrade(index, gradeData) {
        this.gradeIndex = index;
        this.$emit("changeGradeExam", gradeData)
      }
    },
    mounted() {
      this.gradeList.map((item,index) => {
        if (item.grade == this.gradeNum) {
          this.gradeIndex = index
        }
      })
    }
  }
</script>

<style scoped>

</style>
