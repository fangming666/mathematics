<template>
  <table class="knowledge-table">
    <thead>
    <tr>
      <th>维度</th>
      <th v-for="headItem in tableData.level_data">
        {{headItem.name}}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>掌握程度</td>
      <td v-for="leItem in tableData.level_data">
        <div class="knowledge-table-level-warp">
          <div class="knowledge-table-level" :class="levelFun(leItem.name)"
               :style="{width:countCircle(leItem.correct_rate),height:countCircle(leItem.correct_rate)}">
          </div>
        </div>
        <p>{{leItem.correct_rate}}%</p>
      </td>
    </tr>
    <tr>
      <td>题号</td>
      <td colspan="4" class="text-left p-l-1"><div><span v-for="rubricItem in tableData.quesiton_nums">{{rubricItem}}、</span></div></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: "knowledge_table",
    props: ["tableData"],
    methods: {
      levelFun(apellation) {
        switch (apellation) {
          case "记忆":
            return "knowledge-table-level-info";
            break;
          case "理解":
            return "knowledge-table-level-orange";
            break;
          case "运用":
            return "knowledge-table-level-warning";
            break;
          case "综合分析":
            return "knowledge-table-level-danger";
            break;

        }
      },
      //计算球的大小
      countCircle(rate) {
        return `${0.4 * rate }px`
      }
    }
  }
</script>

<style scoped>

</style>
