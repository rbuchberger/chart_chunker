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
          <FileUploader />
          <OutputSettings v-if="loaded" />
          <v-btn v-if="loaded" @click="filterColumns">chunkit</v-btn>
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

  computed: mapState(['loaded']),

  methods: mapGetters(['filterColumns'])
}
</script>
