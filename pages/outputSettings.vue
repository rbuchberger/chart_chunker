<template>
  <v-card>
    <v-card-actions>
      <v-btn nuxt color="grey darken-2" to="/">Back</v-btn>
      <v-spacer />
      <v-btn @click="handleNext" :loading="loading" color="orange">Next</v-btn>
    </v-card-actions>
    <v-card-text>
      <h2 class="mt-5 text-center">Which columns are which?</h2>
    </v-card-text>
    <v-container class="pb-5">
      <v-row>
        <v-col>
          <v-select
            :items="columnItems"
            :value="splitBasis"
            @change="setSplitBasis"
            label="Charge Current"
            hint="I'll use this value's sign to sort out cycles, and discard
            lines where it's ~zero. It doesn't have to be included in the output
            data."
            persistent-hint
          />
        </v-col>
        <v-col>
          <v-select
            :items="keptColumnItems"
            :value="voltageColumn"
            @change="setVoltageColumn"
            label="Voltage"
          />
        </v-col>
        <v-col>
          <v-select
            :items="keptColumnItems"
            :value="spcColumn"
            @change="setSpcColumn"
            label="Specific Capacity"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-card-text>
      <h2 class="mt-5 text-center">Select columns to keep.</h2>
      <p class="caption text-center">
        All data will be returned as absolute values.
      </p>
      <v-container>
        <v-row no-gutters>
          <v-col
            cols="12"
            md="3"
            sm="4"
            v-for="(column, index) in columns"
            :key="index"
          >
            <v-checkbox
              v-model="handleToggle"
              :value="index"
              :label="column"
              color="orange"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'columnItems',
      'columns',
      'keptColumnItems',
      'spcColumn',
      'voltageColumn'
    ]),
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
    ...mapMutations([
      'setSplitBasis',
      'setKeptColumns',
      'setSpcColumn',
      'setVoltageColumn'
    ]),

    ...mapActions(['buildChunker']),
    handleNext() {
      this.buildChunker().then(this.$router.push('dataOutput'))
    }
  }
}
</script>
