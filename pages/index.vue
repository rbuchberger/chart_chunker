<template>
  <v-card>
    <v-card-title class="headline">Can I have your file?</v-card-title>

    <v-card-text>
      <p>
        I will look for a line that says "RESULTS TABLE:", and parse everything
        below it as CSV.
      </p>
      <v-file-input v-model="handleFile" />

      <v-card-actions>
        <v-spacer />
        <v-btn
          large
          :disabled="!file"
          :loading="loading"
          class="px-3"
          color="orange"
          @click="handleNext"
        >
          Go
          <v-icon class="ml-3">mdi-page-next-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['loading', 'file']),
    handleFile: {
      get() {
        return this.file
      },
      set(value) {
        this.setFile(value)
      }
    }
  },

  methods: {
    handleNext() {
      this.loadFile().then(() => this.$router.push('outputSettings'))
    },
    ...mapActions(['loadFile']),
    ...mapMutations(['setFile'])
  }
}
</script>
