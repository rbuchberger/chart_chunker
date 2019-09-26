<template>
  <v-file-input @change="handleInput" />
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
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
  },

  computed: mapState(['loading'])
}
</script>
