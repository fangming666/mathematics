<template>
  <!--雷达图-->
  <div class="radar">
    <h5>{{title}}</h5>
    <slot></slot>
    <div :id="chartId" :option="chartOption" class="radar-chart"></div>
  </div>
</template>

<script>
  import HighCharts from 'highcharts';

  export default {
    name: "radar",
    props: ["title", "chartId", "chartOption"],
    mounted() {
      HighCharts.chart(this.chartId, this.chartOption)
    }
  }
</script>

<style scoped>

</style>
