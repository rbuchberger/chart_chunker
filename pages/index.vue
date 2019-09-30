<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <header class="text-center">
        <h1>Chart Chunker</h1>
        <p>By <a href="https://robert-buchberger.com">Robert Buchberger</a></p>
      </header>

      <v-card>
        <v-card-title v-if="!loaded" class="headline">
          Can I have your file?
        </v-card-title>

        <v-card-text>
          <FileUploader />
          <p v-if="!loaded">
            Give me a text file, and I look for a line that says "RESULTS
            TABLE:". Anything below that line, I will parse as CSV. Give me
            anything unexpected, and I will probably break. Sorry! I'm a work in
            progress.
          </p>
          <OutputSettings v-if="loaded" />
        </v-card-text>
      </v-card>

      <DataOutput v-if="loaded" />
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import FileUploader from '~/components/FileUploader'
import OutputSettings from '~/components/OutputSettings'
import DataOutput from '~/components/DataOutput'

export default {
  components: {
    FileUploader,
    OutputSettings,
    DataOutput
  },

  computed: {
    ...mapState(['loaded'])
  }
}
</script>
