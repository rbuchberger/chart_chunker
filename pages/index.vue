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
          <p>
            Warning: This tool is still under construction. It has no input
            validation, no error handling, and is mostly untested. Use with
            caution, and double-check anything it gives you.
          </p>
          <FileUploader />
          <p v-if="!loaded">
            I will look for a line that says "RESULTS TABLE:", and parse
            everything below it as CSV.
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
