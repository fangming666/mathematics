<template>
  <!--知识点分析-->
  <div class="knowledge">
    <!--知识点掌握情况-->
    <radar :title="title" :chartId="chartId" :chartOption="chartOption" v-if="reportList.difficult_data">
    </radar>
    <!--薄弱知识点-->
    <knowledgeList :title="pointTitle" :knowledgeArr="pointArr" v-if="pointArr.length">
    </knowledgeList>
    <!--待巩固知识点-->
    <knowledgeList class="solidify" :title="solidifyTitle" :knowledgeArr="solidifyArr" v-if="solidifyArr.length">
    </knowledgeList>
    <!--待拔高知识点-->
    <knowledgeList class="raise" :title="raiseTitle" :knowledgeArr="raiseArr" v-if="raiseArr.length">
    </knowledgeList>
  </div>
</template>

<script>
  import radar from "./synthesize/radar";
  import {mapState} from "vuex";
  import knowledgeList from "./knowledge/knowledge_list"

  export default {
    name: "knowledge",
    data() {
      return {
        title: "知识点掌握情况",
        chartId: "knowledgeCharts",
        pointTitle: "薄弱知识点",
        solidifyTitle: "待巩固知识点",
        raiseTitle: "待巩固知识点",
      }
    },
    methods: {
      //计算知识点
      count(startNum, endNum, region = false) {
        let arr = [];
        this.reportList.knowledge_data.map(item => {
          if (item.correct_rate >= startNum && (region ? item.correct_rate <= endNum : item.correct_rate < endNum)) {
            arr.push(item)
          }
        });
        return arr;
      }
    },
    computed: {
      ...mapState(["reportList"]),
      x_data() {
        let arr = [];
        if (this.reportList.knowledge_data) {
          this.reportList.knowledge_data.map(item => {
            arr.push(`${item.correct_rate / 100}<br/>${item.name}`)
          });
        }
        return arr;
      },
      y_data() {
        let arr = [];
        if (this.reportList.knowledge_data) {
          this.reportList.knowledge_data.map(item => {
            arr.push(+`${item.correct_rate / 100}`)
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
                format: '{value}'
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
      },
      //薄弱知识点[0-60)
      pointArr() {
        return this.count(0, 60)
      },
      //待巩固知识点[60-85)
      solidifyArr() {
        return this.count(60, 85)
      },
      //待拔高知识点[85-100]
      raiseArr(){
        return this.count(85, 100,true)
      }
    },
    components: {radar, knowledgeList}
  }
</script>

<style scoped>

</style>
