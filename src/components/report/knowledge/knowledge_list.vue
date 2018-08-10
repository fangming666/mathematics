<template>
  <div class="knowledge-list-warp">
    <h4>{{title}}</h4>
    <div class="knowledge-list" v-for="item in knowledgeArr">
      <p>{{item.name}}</p>
      <knowledgeTable :tableData="item">
      </knowledgeTable>
    </div>
  </div>
</template>

<script>
  import knowledgeTable from "./knowledge_table"

  export default {
    name: "knowledge_list",
    props: ["title", "knowledgeArr"],
    components: {
      knowledgeTable
    }
  }
</script>

<style scoped>

</style>
