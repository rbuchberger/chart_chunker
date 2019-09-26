<template>
  <!-- <input type="file" @change="loadText" /> -->
  <v-file-input @change="loadText" />
</template>

<script>
export default {
  methods: {
    loadText(file) {
      const reader = new FileReader()

      reader.onload = (e) => this.$emit('load', e.target.result)
      reader.readAsText(file)
    }
  }
}
</script>
