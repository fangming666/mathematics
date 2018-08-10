<template>
  <div class="detail">
    <div class="question">
      <div class="question-content" v-html="questionObj.question_content">
      </div>
      <div class="question-answers"
           :class="[(item.option==questionObj.my_answer&&questionObj.my_answer==questionObj.answer)||item.option==questionObj.answer?'detail-success':'',
           (item.option==questionObj.my_answer&&questionObj.my_answer!=questionObj.answer?'detail-danger':'')]"
           v-for="item in questionObj.answers">
        <span class="question-answers-title">{{item.option}}</span>
        <p class="m-b-0 d-inline-block" v-html="item.content"></p>
      </div>
    </div>
    <div class="detail-foot">
      <p><span>正确答案:{{questionObj.answer}}</span><span>我的答案:{{questionObj.my_answer}}</span><span>回答{{questionObj.status==1?'正确':'错误'}}</span>
      </p>
      <p>本题共被作答{{questionObj.answer_num}}次，正确率为{{questionObj.correct_rate}}%，易错项为{{questionObj.error_option}}。</p>
      <dl>
        <dt>
          解析
        </dt>
        <dd v-html="questionObj.analysis">
        </dd>
      </dl>
      <dl>
        <dt>
          考点
        </dt>
        <dd>
          <span class="testing-centre" v-for="testingItem in questionObj.test_point">
            {{testingItem}}
          </span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "detail",
    data() {
      return {
        questionObj: {},
        questionId: ""
      }
    },
    computed: {
      ...mapState(["reportList"])
    },
    methods: {
      detailData() {
        for (let i in this.reportList.question_data) {
          if (this.reportList.question_data[i].question_id === this.questionId) {
            this.questionObj = this.reportList.question_data[i];
            break;
          }
        }
      }
    },
    mounted() {
      this.questionId = this.$route.query.dataObj.questionId;
      this.$nextTick(() => {
        this.detailData();
      })
    }
  }
</script>

<style scoped>

</style>
