<template>
  <div>
    <v-select
      :items="columnItems"
      label="Cycle Split Basis"
      hint="Split the chart into charge and discharge
    cycles, based on when this value changes from positive to negative. You
    probably want charge."
      persistent-hint
      :value="splitBasis"
      @change="setSplitBasis"
    />

    <h2 class="my-3">Select columns to keep:</h2>
    <v-row justify="space-around">
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
