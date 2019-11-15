<template>
  <v-container>
    <v-row>
      <v-col>
        <h4 class="display-1 text-center mb-5">
          {{ cycleCount }} Cycle Analysis
        </h4>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h4 class="subtitle-1 text-center">
          Charge Efficiency (%):
        </h4>
        <div class="d-flex">
          <div class="flex-grow-0 d-flex flex-column justify-space-around">
            <div>
              {{ Math.max(...chunker.chargeEffArray) }}
            </div>
            <div class="flex-grow-1" />
            <div>
              {{ Math.min(...chunker.chargeEffArray) }}
            </div>
          </div>
          <v-sparkline
            class="flex-grow-1"
            :value="chargeEfficiencyGraphData"
            color="orange"
            smooth
            auto-draw
            line-width="1"
            height="120"
          />
        </div>
      </v-col>

      <v-col>
        <h4 class="subtitle-1 text-center">
          Retention (%):
        </h4>
        <div class="d-flex">
          <div class="flex-grow-0 d-flex flex-column justify-space-around">
            <div>
              {{ Math.max(...chunker.retentionArray) }}
            </div>
            <div class="flex-grow-1" />
            <div>
              {{ Math.min(...chunker.retentionArray) }}
            </div>
          </div>
          <v-sparkline
            :value="retentionGraphData"
            class="flex-grow-1"
            color="orange"
            smooth
            auto-draw
            line-width="1"
            height="120"
          />
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-spacer />
      <v-col
        cols="4"
        class="text-right"
      >
        <v-btn @click="copySummary">
          <v-icon
            left
            color="orange"
          >
            mdi-clipboard-outline
          </v-icon>
          Copy This Analysis
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn @click="copyAll">
          <v-icon
            left
            color="orange"
          >
            mdi-clipboard-outline
          </v-icon>Copy All Data
        </v-btn>
      </v-col>
      <v-spacer />
    </v-row>

    <DataTable :data-object="overviewTableData" />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import DataTable from '~/components/DataTable.vue'

export default {
  components: { DataTable },

  computed: {
    ...mapState(['chunker', 'file']),
    ...mapGetters(['cycles', 'cycleCount']),

    overviewTableData() {
      return this.chunker.overview
    },

    unparsedAll() {
      return this.chunker.unparsed
    },

    unparsedOverview() {
      return this.chunker.unparsedOverview
    },

    chargeEfficiencyGraphData() {
      return this.overviewTableData.lines.map((line) => line[3])
    },

    retentionGraphData() {
      return this.overviewTableData.lines.map((line) => line[4])
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

    copySummary() {
      this.$copyText(this.unparsedOverview)
    }
  }
}
</script>
