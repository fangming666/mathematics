<template>
  <!--卷面作答-->
  <transition name="fade">
    <div class="respondence-warp">
      <table class="respondence-table">
        <thead>
        <tr>
          <th v-for="titleItem in titleArr">{{titleItem}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in reportList.question_data">
          <td><i class="fa fa-times text-danger" :class="item.status==1?'invisible':''"></i>{{item.question_num}}</td>
          <td>{{item.answer}}</td>
          <td :class="item.status==1?'':'text-danger'">{{item.my_answer}}</td>
          <td>{{item.difficult}}</td>
          <td><a href="javascript:void(0)" @click="goDetail(item.question_id)">查看</a></td>
        </tr>
        </tbody>
      </table>
    </div>
  </transition>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "respondence",
    data() {
      return {
        titleArr: ["题号", "答案", "我的", "难度", "解析"]
      }
    },
    computed: {
      ...mapState(["reportList"])
    },
    methods: {
      //跳转到详情页面
      goDetail(questionId) {
        console.log(questionId);
        this.$router.push({
          path: '/detail',
          name: 'detail',
          query: {
            name: 'questionId',
            dataObj: {"questionId": questionId}
          }
        })
      }
    },
    destroyed() {
      this.$store.commit("CHANGE_EMERGE", false)
    }

  }
</script>

<style scoped>

</style>
