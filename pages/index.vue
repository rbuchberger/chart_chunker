<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <header class="text-center">
        <h1>Battery Test Chart Chunker</h1>
      </header>

      <v-card>
        <v-card-title v-if="!loaded" class="headline">
          First, upload your file.
        </v-card-title>

        <v-card-text>
          <FileUploader />
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
