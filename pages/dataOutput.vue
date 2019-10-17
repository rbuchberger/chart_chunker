<template>
  <v-card class="my-5">
    <v-card-actions>
      <v-btn nuxt color="grey darken-2" to="/outputSettings">Back</v-btn>
    </v-card-actions>
    <v-tabs v-model="tabs" center-active centered>
      <v-tab>Overview</v-tab>
      <v-tab>Cycle Details</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs" mandatory>
      <v-tab-item>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="copyAll">Copy all cycles to clipboard</v-btn>
          <v-btn disabled>Download all</v-btn>
          <v-spacer />
        </v-card-actions>
        <v-card-title>
          <h4 class="text-center mx-auto">{{ cycleCount }} cycles detected.</h4>
        </v-card-title>
        <DataTable :dataObject="overviewTableData" />
      </v-tab-item>
      <v-tab-item>
        <v-card-title>
          Cycle # {{ selectedCycleIndex + 1 }} of
          {{ cycleCount }}
        </v-card-title>
        <v-card-text>
          <v-slider
            v-model="selectedCycleIndex"
            :max="cycleCount - 1"
            color="orange"
            label="Select Cycle: "
            ticks
          />
          <v-card-actions>
            <v-spacer />
            <v-btn @click="copyCurrent">Copy this cycle to clipboard</v-btn>
            <v-spacer />
          </v-card-actions>
          <textarea id="select-box" hidden="true" />
          <v-tabs v-model="detailTabs" center-active centered>
            <v-tab>Analysis</v-tab>
            <v-tab>Visualization</v-tab>
            <v-tab>Table</v-tab>
          </v-tabs>
          <v-tabs-items v-model="detailTabs" mandatory>
            <v-tab-item>Analysis data here</v-tab-item>
            <v-tab-item>Chart here?</v-tab-item>
            <v-tab-item>
              <DataTable :dataObject="selectedCycleTableData" />
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import DataTable from '~/components/DataTable.vue'

export default {
  data() {
    return {
      selectedCycleIndex: 0,
      tabs: 0,
      detailTabs: 0
    }
  },

  components: { DataTable },

  computed: {
    ...mapState(['chunker']),
    ...mapGetters(['cycles', 'cycleCount']),
    selectedCycleTableData() {
      return {
        headers: this.selectedCycle.headers,
        lines: this.selectedCycle.processedLines.slice(1)
      }
    },

    overviewTableData() {
      return this.chunker.overview
    },

    selectedCycle() {
      return this.cycles[this.selectedCycleIndex]
    },

    unparsedCurrent() {
      return this.selectedCycle.unparsed
    },

    unparsedAll() {
      return this.chunker.unparsed
    }
  },

  methods: {
    successfulCopy() {
      console.log('SuccessfulCopy')
    },

    errorCopy() {
      console.log('Error copying text')
    },

    copyAll() {
      this.$copyText(this.unparsedAll)
    },

    copyCurrent() {
      this.$copyText(this.unparsedCurrent)
    }
  }
}
</script>
