<template>
  <v-file-input v-model="file" @change="handleInput" />
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: mapState(['loading']),
  data() {
    return {
      file: null
    }
  },

  methods: {
    handleInput(file) {
      if (file) {
        this.loadFile(file)
      } else {
        this.unloadFile()
      }
    },
    ...mapMutations(['unloadText']),
    ...mapActions(['loadFile'])
  }
}
</script>
