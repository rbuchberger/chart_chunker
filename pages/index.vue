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
          <!-- <v-file-input v-model="inputFile" /> -->
          <FileUploader @load="text = $event" />
        </v-card-text>
        <!-- <v-card-actions>                                           -->
        <!--   <v-spacer />                                             -->
        <!--   <v-btn color="orange" @click="loadContents">Next</v-btn> -->
        <!-- </v-card-actions>                                          -->
      </v-card>
      {{ text }}
    </v-flex>
  </v-layout>
</template>

<script>
import FileUploader from '~/components/FileUploader'

export default {
  components: {
    FileUploader
  },
  data: () => ({ text: '' }),

  computed: {},

  methods: {
    loadContents(e) {
      const reader = new FileReader()
      const file = e.target.files[0]

      reader.onload = (em) => console.log(em.target.result)
      reader.readAsText(file)
    }
  }
}
</script>
