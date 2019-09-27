<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <header class="text-center">
        <h1>Battery Chart splitter</h1>
        <p>So you don't have to abuse undergrads</p>
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
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FileUploader from '~/components/FileUploader'
import OutputSettings from '~/components/OutputSettings'

export default {
  components: {
    FileUploader,
    OutputSettings
  },

  computed: {
    ...mapState(['loaded']),
    ...mapGetters(['filteredData'])
  }
}
</script>
