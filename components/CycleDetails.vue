<template>
  <v-container>
    <CycleSelector
      :cycle-count="cycleCount"
      @input="selectedCycleIndex = $event"
    />
    <v-row>
      <v-spacer />
      <v-col
        cols="3"
        class="text-right"
      >
        <v-tooltip bottom>
          <template #activator="{ on }">
            <v-btn
              disabled
              v-on="on"
            >
              <v-icon
                left
                color="primary"
              >
                mdi-clipboard-outline
              </v-icon>
              Copy Analysis
            </v-btn>
          </template>
          Copy the table below <v-icon>mdi-arrow-down</v-icon>
        </v-tooltip>
      </v-col>
      <v-col cols="3">
        <v-tooltip bottom>
          <template #activator="{on}">
            <v-btn
              @click="copyCurrent"
              v-on="on"
            >
              <v-icon
                left
                color="primary"
              >
                mdi-clipboard-outline
              </v-icon>
              Copy Data
            </v-btn>
          </template>
          Copy the formatted data for this cycle only.
        </v-tooltip>
      </v-col>
      <v-spacer />
    </v-row>
    <textarea
      id="select-box"
      hidden="true"
    />
    <v-tabs
      v-model="detailTabs"
    >
      <v-tab>Analysis</v-tab>
      <v-tab>Data</v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="detailTabs"
      mandatory
    >
      <v-tab-item>
        Charge Efficiency: {{ selectedCycle.chargeEfficiency }} Retention:
        {{ chunker.getRetention(selectedCycle) }}
        <DataTable :data-object="selectedCycle.overview" />
      </v-tab-item>
      <v-tab-item>
        <DataTable :data-object="selectedCycleTableData" />
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import DataTable from '~/components/DataTable.vue'
import CycleSelector from '~/components/CycleSelector.vue'
import { mapState, mapGetters } from 'vuex'

export default {
  components: { DataTable, CycleSelector },
  data() {
    return {
      selectedCycleIndex: 0,
      detailTabs: 0
    }
  },

  computed: {
    ...mapState(['chunker', 'file']),
    ...mapGetters(['cycles', 'cycleCount']),

    selectedCycleTableData() {
      return {
        headers: this.selectedCycle.headers,
        lines: this.selectedCycle.processedLines.slice(1)
      }
    },

    selectedCycle() {
      return this.cycles[this.selectedCycleIndex]
    },

    unparsedCurrent() {
      return this.selectedCycle.unparsed
    }
  },

  methods: {
    successfulCopy() {
      console.log('SuccessfulCopy')
    },

    errorCopy() {
      console.log('Error copying text')
    },

    copyCurrent() {
      this.$copyText(this.unparsedCurrent)
    }
  }
}
</script>
