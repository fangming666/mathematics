<template>
  <!--维度分析-->
  <div class="dimension">
    <h5>
      认知维度分析
    </h5>
    <p class="dimension-text">根据著名教育学家布鲁姆的层次教学理论，将试题分为记忆、理解、运用、综合分析四个不同认知的维度，根据测试结果给出学生对当前小节的掌握程度。</p>
    <div class="dimension-item" v-for="item in reportList.level_data">
      <p>{{item.name}}</p>
      <progress class="progress" :class="proClass(item.name)" :value="item.correct_rate"
                max="100"></progress><span>{{item.qestion_score}}分</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "dimension",
    computed: {
      ...mapState(["reportList"])
    },
    methods: {
      proClass(char) {
        switch (char) {
          case "记忆":
            return "progress-danger";
            break;
          case "理解":
            return "progress-warning";
            break;
          case "运用":
            return "progress-info";
            break;
          case "综合分析":
            return "progress-success";
            break;

        }
      }
    }
  }
</script>

<style scoped>

</style>
