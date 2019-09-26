<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <header class="text-center">
        <h1>Battery Chart splitter</h1>
        <p>So you don't have to abuse undergrads</p>
      </header>
      <v-card>
        <v-card-title class="headline">
          First, upload your file.
        </v-card-title>
        <v-card-text>
          <p>Just give me whatever the tester spit out.</p>
          <FileUploader @load="rawText = $event" />
          <FileParser v-if="textLoaded" :rawText="rawText" />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import FileUploader from '~/components/FileUploader'
import FileParser from '~/components/FileParser'

export default {
  components: {
    FileUploader,
    FileParser
  },

  data: () => ({ rawText: '' }),
  computed: {
    textLoaded() {
      return this.rawText !== ''
    }
  }
}
</script>
