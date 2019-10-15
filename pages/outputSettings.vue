<template>
  <v-card>
    <v-card-actions>
      <v-btn nuxt color="grey darken-2" to="/">Back</v-btn>
      <v-spacer />
      <v-btn @click="handleNext" :loading="loading" color="orange">Next</v-btn>
    </v-card-actions>
    <v-card-text>
      <h2 class="mt-5">Split Basis:</h2>
      <p>
        Which value should I use to sort one cycle from the next?
      </p>
      <v-select
        :items="columnItems"
        :value="splitBasis"
        @change="setSplitBasis"
        hint="I'll split where it changes sign, and discard lines where it's ~zero."
        persistent-hint
      />
    </v-card-text>
    <hr class="my-5" />
    <v-card-text>
      <h2 class="mt-5">Select columns to keep:</h2>
      <p class="caption">All data will be returned as absolute values.</p>
      <v-row justify="start">
        <v-checkbox
          v-for="(column, index) in columns"
          :key="index"
          v-model="handleToggle"
          :value="index"
          :label="column"
          color="orange"
          class="mx-3"
        />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['columnItems', 'columns']),
    ...mapState(['splitBasis', 'keptColumns', 'loading']),
    handleToggle: {
      get() {
        return this.keptColumns
      },
      set(value) {
        this.setKeptColumns(value)
      }
    }
  },

  methods: {
    ...mapMutations(['setSplitBasis', 'setKeptColumns']),
    ...mapActions(['buildChunker']),
    handleNext() {
      this.buildChunker().then(this.$router.push('dataOutput'))
    }
  }
}
</script>
