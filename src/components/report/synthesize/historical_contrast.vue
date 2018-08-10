<template>
  <!--历史对比-->
  <div class="historical-contrast" v-if="reportList.trend_data.length">
    <h5>历史对比</h5>
    <p>通过每次作答，统计学生每次考试的正确率，对比最近几次的正确率的变化，能够分析出学生最近一段时间的学习情况。</p>
    <div :id="chartId" class="line-chart"></div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import HighCharts from 'highcharts';

  export default {
    name: "historical_contrast",
    data() {
      return {
        chartId: "lineCharts"
      }
    },
    computed: {
      ...mapState(["reportList"]),
      x_data() {
        let arr = [];
        if (this.reportList.trend_data) {
          this.reportList.trend_data.map(item => {
            arr.push(item.name)
          })
        }
        return arr;
      },
      y_data() {
        let arr = [];
        if (this.reportList.trend_data) {
          this.reportList.trend_data.map(item => {
            arr.push(+item.correct_rate)
          })
        }
        return arr;
      },
      chartOption() {
        return {
          chart: {
            type: 'line',
            plotBackgroundColor: '#F4FBFF',
          },
          exporting: {
            enabled: true
          },
          title: {
            text: "222",
          },
          legend: {
            enabled: false
          },
          credits: {
            enabled: false
          },
          xAxis: {
            categories: this.x_data,
            tickLength: 0,
            tickColor: '#DDE9F0',
            labels: {
              align: "center",
              style: {
                "color": "#888",
                "fontSize": "9px"
              },
            },
            lineColor: '#C3E6F7',
          },
          yAxis: {
            title: {
              text: '得分率',
              align: "high",
              rotation: 0,
              offset: 0,
              y: -10,
              x: -10,
              style: {
                "color": "#888",
                "fontSize": "9px",
              },
            },
            alternateGridColor: '#FFFFFF',
            gridLineWidth: 0,
            labels: {
              style: {
                "color": "#888",
                "fontSize": "9px",
              },
              formatter: function () {
                return this.value + '%'
              }
            },
          },
          colors: ["#3EBEEB"],
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true,
                style: {
                  "color": "#3A3A3A",
                  "fontSize": "12px",
                  "fontWeight": 400
                },
                formatter: function () {
                  return this.y + '%'
                }
              },
              enableMouseTracking: true
            },
            series: {
              pointPadding: 0,
              marker: {
                radius: 3,  //曲线点半径，默认是4
                lineColor: '#3EBEEB',
                fillColor: "#fff",
                lineWidth: 1
              }
            },
          },
          series: [{
            data: this.y_data,
            shadow:"0 6px 4px 0 rgba(73,161,192,0.27)"
          }]
        }
      },
    },
    mounted() {
      if(this.reportList.trend_data.length){
        HighCharts.chart(this.chartId, this.chartOption)
      }

    }
  }
</script>

<style scoped>

</style>
