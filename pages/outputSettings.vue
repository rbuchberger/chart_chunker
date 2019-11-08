<template>
  <v-card>
    <v-card-actions>
      <v-btn nuxt color="grey darken-2" to="/">Back</v-btn>
      <v-spacer />
      <v-btn
        outlined
        elevation="12"
        color="orange"
        class="mono body-2 nocap"
        nuxt
        to="/"
        large
      >{{ file.name }}</v-btn>
      <v-spacer />
      <v-btn :loading="loading" color="orange" @click="handleNext">Next</v-btn>
    </v-card-actions>
    <v-card-text>
      <h2 class="text-center">Which columns are which?</h2>
    </v-card-text>
    <v-container class="pb-5">
      <v-row>
        <v-col>
          <v-select
            :items="columnItems"
            :value="splitBasis"
            label="Charge Current"
            hint="I'll use this value's sign to sort out cycles, and discard
            lines where it's ~zero. It doesn't have to be included in the output
            data."
            persistent-hint
            @change="setSplitBasis"
          />
        </v-col>
        <v-col>
          <v-select
            :items="keptColumnItems"
            :value="voltageColumn"
            label="Voltage"
            @change="setVoltageColumn"
          />
        </v-col>
        <v-col>
          <v-select
            :items="keptColumnItems"
            :value="spcColumn"
            label="Specific Capacity"
            @change="setSpcColumn"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-card-text>
      <h2 class="mt-5 text-center">Select columns to keep:</h2>
      <p class="text-center">All data will be returned as absolute values.</p>
      <v-container>
        <v-row no-gutters>
          <v-col v-for="(column, index) in columns" :key="index" cols="12" md="3" sm="4">
            <v-checkbox v-model="handleToggle" :value="index" :label="column" color="orange" />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<style>
.nocap {
  text-transform: none !important;
}

.mono {
  font-family: mono;
}
</style>
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
    ...mapState(['splitBasis', 'keptColumns', 'loading', 'file']),
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
