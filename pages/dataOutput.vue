<template>
  <v-card class="my-5">
    <v-card-actions>
      <v-btn nuxt color="grey darken-2" to="/outputSettings">Back</v-btn>
    </v-card-actions>
    <v-tabs v-model="tabs" center-active centered color="orange">
      <v-tab>Overview</v-tab>
      <v-tab>Cycle Details</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs" mandatory>
      <v-tab-item>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="copySummary">Copy Summary</v-btn>
          <v-btn @click="copyAll">Copy Data (all)</v-btn>
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
          <v-row align="center">
            <v-col cols="2">
              <v-text-field outlined v-model="selectedCycleIndexPlusOne" />
            </v-col>
            <v-col cols="1">
              <v-btn icon @click="selectedCycleIndex--" class="my-auto">
                <v-icon>mdi-menu-left</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-slider
                class="my-auto"
                v-model="selectedCycleIndex"
                :max="cycleCount - 1"
                color="orange"
                ticks
              />
            </v-col>
            <v-col cols="1">
              <v-btn icon @click="selectedCycleIndex++" class="my-auto">
                <v-icon>mdi-menu-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-spacer />
            <v-btn @click="copyCurrentAnalysis" disabled>Copy Analysis</v-btn>
            <v-btn @click="copyCurrent">Copy Data</v-btn>
            <v-spacer />
          </v-card-actions>
          <textarea id="select-box" hidden="true" />
          <v-tabs v-model="detailTabs" center-active centered color="orange">
            <v-tab>Analysis</v-tab>
            <!-- <v-tab>Visualization</v-tab> -->
            <v-tab>Table</v-tab>
          </v-tabs>
          <v-tabs-items v-model="detailTabs" mandatory>
            <v-tab-item>
              Charge Efficiency: {{ selectedCycle.chargeEfficiency }}
              Retention: {{ chunker.getRetention(selectedCycle) }}
              <DataTable :dataObject="selectedCycle.overview" />
            </v-tab-item>
            <!-- <v-tab-item>Chart here?</v-tab-item> -->
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
    },

    unparsedOverview() {
      console.log(this.chunker.unparsedOverview)
      return this.chunker.unparsedOverview
    },

    selectedCycleIndexPlusOne() {
      return this.selectedCycleIndex + 1
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
    },

    copySummary() {
      this.$copyText(this.unparsedOverview)
    }
  }
}
</script>
