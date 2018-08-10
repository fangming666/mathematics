<template>

  <div style="height: 200px;border: 2px solid #333;overflow-x: hidden;box-sizing: border-box;"
       ref="test" id="test">
    <h1>
      List
    </h1>
    <div v-for="i in arr" :key="i" style="height: 200px"> {{i}}</div>

  </div>
</template>

<script>
  export default {
    name: "list",
    data() {
      return {
        arr: [1, 2, 3, 4, 5],
        pos: 0
      }
    },

    mounted() {
      $("#test").scrollTop(100)
    }
  }
</script>

<style scoped>

</style>
