<template>
  <!--综合分析-->
  <div class="synthesize">
    <!--成绩分析-->
    <scoreAnalysis>
    </scoreAnalysis>
    <!--认知维度分析-->
    <dimension>
    </dimension>
    <!--难度掌握分析-->
    <radar :title="title" :chartId="chartId" :chartOption="chartOption" v-if="reportList.difficult_data">
      <p>为了最大化的测试学生的掌握情况，每道试题我们分为较易、容易、中等、较难、困难五个维度，每套试卷都涉及不同难度的试题。通过大数据分析以及对比其他同学的做题情况，分析出该同学在本套试卷中对不同难度试题的掌握情况。</p>
    </radar>
    <!--历史对比-->
    <historicalContrast v-if="reportList.trend_data">
    </historicalContrast>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import scoreAnalysis from "./synthesize/score_analysis";
  import dimension from "./synthesize/dimension";
  import radar from "./synthesize/radar";
  import historicalContrast from "./synthesize/historical_contrast";

  export default {
    name: "synthesize",
    data() {
      return {
        title: "难度掌握分析",
        chartId: "synthesizeCharts",
      }
    },
    computed: {
      ...mapState(["reportList"]),
      x_data() {
        let arr = [];
        if (this.reportList.difficult_data) {
          this.reportList.difficult_data.map(item => {
            arr.push(`${item.correct_rate}<br/>${item.name}`)
          });
        }
        return arr;
      },
      y_data() {
        let arr = [];
        if (this.reportList.difficult_data) {
          this.reportList.difficult_data.map(item => {
            arr.push(+`${item.correct_rate}`)
          });
        }
        return arr;
      },
      chartOption() {
        return {
          chart: {
            polar: true,
            type: 'area',
            backgroundColor: null,
          }
          ,
          title: {
            text: "123",
          }
          ,
          colors: ['#41BDE7'],
          pane:
            {
              //size: '80%'
              startAngle: 0,
              endAngle:
                360
            }
          ,
          exporting: {
            enabled: true
          }
          ,
          credits: {
            enabled: false
          }
          ,
          xAxis: {
            categories: this.x_data,
            lineWidth:
              0,
            gridLineColor:
              '#96C2DE',
            gridLineWidth:
              0.5,
            labels:
              {
                format: '{value}',
              }
            ,
          }
          ,
          plotOptions: {
            series: {
              marker: {
                radius: 2,  //曲线点半径，默认是4
                symbol:
                  'diamond' //曲线点类型："circle", "square", "diamond", "triangle","triangle-down"，默认是"circle"
              }
              ,
              lineWidth: 1,
            }
            ,
            column: {
              colorByPoint: true
            }
          }
          ,
          yAxis: {
            lineWidth: 0,
            min:
              0,
            gridLineWidth:
              0.7,
            gridLineColor:
              '#96C2DE',
            tickAmount:
              5,
          }
          ,
          tooltip: {
            shared: true,
            pointFormat:
              '<span style="color:{series.color}">{series.name}: <b>{point.y:,.2f}</b><br/>'
          }
          ,
          legend: {
            enabled: false
          }
          ,
          series: [{
            data: this.y_data,
            pointPlacement: 'on'
          }]
        }
      }
    },
    components: {
      scoreAnalysis, dimension, radar, historicalContrast
    },

  }
</script>

<style scoped>

</style>
