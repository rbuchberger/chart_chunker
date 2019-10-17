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
        <v-card-text>
          <v-simple-table dense fixed-header height="800">
            <thead>
              <tr>
                <th>Cycle #</th>
                <th>Charge Specific Capacity</th>
                <th>Discharge Specific Capacity</th>
                <th>Charge Efficiency [%]</th>
                <th>Retention [%]</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="cycle in cycles" :key="cycle.index">
                <td>{{ cycle.index }}</td>
                <td>{{ cycle.charge.specificCapacity }}</td>
                <td>{{ cycle.discharge.specificCapacity }}</td>
                <td>{{ cycle.chargeEfficiency }}</td>
                <td>{{ chunker.getRetention(cycle) }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-title
          >Cycle # {{ selectedCycleIndex + 1 }} of
          {{ cycleCount }}</v-card-title
        >
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
              <v-simple-table dense fixed-header height="800">
                <thead>
                  <tr>
                    <th v-for="header in selectedCycle.headers" :key="header">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(line,
                    lineIndex) in selectedCycle.processedLines.slice(1)"
                    :key="lineIndex"
                  >
                    <td
                      v-for="(entry, entryIndex) in line"
                      :key="lineIndex.toString() + entryIndex.toString()"
                    >
                      {{ entry }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      selectedCycleIndex: 0,
      tabs: 0,
      detailTabs: 0
    }
  },
  computed: {
    ...mapState(['chunker']),
    ...mapGetters(['cycles', 'cycleCount']),

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
