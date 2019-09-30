<template>
  <div>
    <v-select
      :items="columnItems"
      label="Cycle Split Basis"
      hint="Split the chart into charge and discharge cycles, based on when this value
      changes from positive to negative. Lines where this value is very close to
      zero are discarded."
      persistent-hint
      :value="splitBasis"
      @change="setSplitBasis"
    />
    <p></p>

    <h2 class="mt-5">Select columns to keep:</h2>
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
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapGetters(['columnItems', 'columns']),
    ...mapState(['splitBasis', 'keptColumns']),
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
    ...mapMutations(['setSplitBasis', 'setKeptColumns'])
  }
}
</script>
