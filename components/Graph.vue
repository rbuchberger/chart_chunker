<template>
  <graph-scatter width="800" height="800" text-align="'right'" :values="values">
  </graph-scatter>
</template>

<script>
export default {
  props: ['inputData'],

  data() {
    return {
      x: 0,
      y: 1
    }
  },

  computed: {
    values() {
      return this.inputData.data.map((line) => [line[this.x], line[this.y]])
    },

    headers() {
      return this.inputData.headers.map((line) => [line[this.x], line[this.y]])
    }
  }
}
</script>
