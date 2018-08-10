<template>
  <!--成绩分析-->
  <div class="score-analysis">
    <h5>成绩分析</h5>
    <div class="score-analysis-content text-center">
      <div class="score-analysis-difficulty clearfix text-muted">
        <p class="float-left">
          试卷难度 <i class="fa fa-star text-warning" v-for="index in reportList.difficult"
                  v-if="!(index%2)||index == reportList.difficult"
                  :class="(index == reportList.difficult)&&(reportList.difficult%2)?'fa-star-half':''"></i>
        </p>
        <p class="float-right">
          战胜率 <span class="text-warning">{{reportList.win_rate}}%</span>
        </p>
      </div>
      <div class="rate-canvas">
        <canvas id="canvas_1" width="120" height="120"></canvas>
        <canvas id="canvas_2" width="120" height="120"></canvas>
        <p class="accuracy-num"><span>{{reportList.correct_rate}}</span>%</p>
        <p class="accuracy-text">正确率</p>
        <p class="accuracy-down" v-if="reportList.change_rate">
          <img v-if="reportList.change_rate<0" src="./../../../../static/imgs/accuracy-down@1x.png"
               srcset="./../../../../static/imgs/accuracy-down@2x.png 2x,./../../../../static/imgs/accuracy-down@3x.png 3x"
               alt="accuracy-down">
          <img v-if="reportList.change_rate>0" src="./../../../../static/imgs/accuracy-up@1x.png"
               srcset="./../../../../static/imgs/accuracy-up@2x.png 2x,./../../../../static/imgs/accuracy-up@3x.png 3x"
               alt="accuracy-down">{{Math.abs(reportList.change_rate)}}%</p>
      </div>
      <div class="score-analysis-most">
        <div>
          <p>{{reportList.lowest}}%</p>
          <p>最低</p>
        </div>
        <div>
          <p>{{reportList.average}}%</p>
          <p>平均</p>
        </div>
        <div>
          <p>{{reportList.highest}}%</p>
          <p>最高</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "score_analysis",
    computed: {
      ...mapState(["reportList"])
    },
    methods: {
      //圆环的canvas
      inte(percent) {
        var canvas_1 = document.querySelector('#canvas_1');
        var canvas_2 = document.querySelector('#canvas_2');
        var ctx_1 = canvas_1.getContext('2d');
        var ctx_2 = canvas_2.getContext('2d');
        ctx_1.lineWidth = 3;
        ctx_1.strokeStyle = "#E8E8E8";
        //画底部的灰色圆环
        ctx_1.beginPath();
        ctx_1.arc(canvas_1.width / 2, canvas_1.height / 2, canvas_1.width / 2 - ctx_1.lineWidth / 2 - 2.5, 0, Math.PI * 2, false);
        ctx_1.closePath();
        ctx_1.stroke();
        if (percent < 0 || percent > 100) {
          throw new Error('percent must be between 0 and 100');
          return
        }
        ctx_2.lineWidth = 5;
        ctx_2.strokeStyle = "#58B957";
        var angle = 0;
        var timer;
        (function draw() {
          timer = requestAnimationFrame(draw);
          ctx_2.clearRect(0, 0, canvas_2.width, canvas_2.height);
          //百分比圆环
          ctx_2.beginPath();
          ctx_2.arc(canvas_2.width / 2, canvas_2.height / 2, canvas_2.width / 2 - ctx_2.lineWidth / 2, 0, angle * Math.PI / -180, true);
          angle += 10;
          if (angle > (percent / 100 * 360)) {
            window.cancelAnimationFrame(timer);
          }
          ;
          ctx_2.stroke();
          ctx_2.closePath();
          ctx_2.save();
          ctx_2.beginPath();
          ctx_2.rotate(90 * Math.PI / 180);
          ctx_2.closePath();
          ctx_2.restore();
        })()
      }
    },
    mounted() {
      if (this.reportList.correct_rate) {
        this.inte(this.reportList.correct_rate)
      }
    },
    updated() {
      this.$nextTick(() => {
        this.inte(this.reportList.correct_rate)
      })
    }
  }
</script>

<style scoped>

</style>
