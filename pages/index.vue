<template>
  <v-card>
    <v-card-title>
      <h2 class="text-center display-3 mx-auto">
        Can I have your file?
      </h2>
    </v-card-title>

    <v-container>
      <v-row
        align="center"
        class="text-center"
      >
        <v-col cols="2" />

        <v-col class="text-center">
          <v-file-input
            v-model="handleFile"
            hint="I will look for a line that says &quot;RESULTS TABLE&quot;,
              and read everything below it."
            persistent-hint
          />
        </v-col>

        <v-col cols="2">
          <v-btn
            large
            :disabled="!file"
            :loading="loading"
            class="px-3"
            color="orange"
            @click="handleNext"
          >
            Go
            <v-icon class="ml-3">
              mdi-page-next-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-card-text>
      <v-card-actions>
        <v-spacer />
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
