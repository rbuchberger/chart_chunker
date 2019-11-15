<template>
  <v-card class="my-5">
    <v-container class="mb-5">
      <v-row
        align="center"
        class="text-center"
      >
        <v-col cols="2">
          <v-btn
            nuxt
            color="grey darken-2"
            to="/outputSettings"
          >
            Back
          </v-btn>
        </v-col>

        <v-col class="text-center">
          <v-btn
            class="mono body-2 nocap"
            elevation="12"
            outlined
            nuxt
            to="/"
            large
          >
            {{ file.name }}
          </v-btn>
        </v-col>

        <v-col cols="2" />
      </v-row>
    </v-container>

    <v-tabs
      v-model="tabs"
      center-active
      grow
      color="orange"
    >
      <v-tab>Analysis</v-tab>
      <v-tab>Cycle Details</v-tab>
    </v-tabs>
    <v-tabs-items
      v-model="tabs"
      mandatory
    >
      <v-tab-item>
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
                <div
                  class="flex-grow-0 d-flex flex-column justify-space-around"
                >
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
                <div
                  class="flex-grow-0 d-flex flex-column justify-space-around"
                >
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
      </v-tab-item>
      <v-tab-item>
        <v-container>
          <v-row align="start">
            <v-spacer />
            <v-col
              cols="2"
              class="text-right"
            >
              <h4 class="headline">
                Cycle #
              </h4>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="selectedCycleIndexPlusOne"
                dense
                outlined
              />
            </v-col>
            <v-col
              cols="2"
              class="text-left"
            >
              <h4 class="headline">
                of {{ cycleCount }}
              </h4>
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>

        <v-card-text>
          <div class="d-flex">
            <div class="flex-grow-0">
              <v-btn
                icon
                class="my-auto"
                @click="selectedCycleIndex -= 10"
              >
                <v-icon>mdi-rewind</v-icon>
              </v-btn>
            </div>
            <div class="flex-grow-0">
              <v-btn
                icon
                class="my-auto"
                @click="selectedCycleIndex--"
              >
                <v-icon>mdi-menu-left</v-icon>
              </v-btn>
            </div>
            <div class="flex-grow-1">
              <v-slider
                v-model="selectedCycleIndex"
                class="my-auto"
                :max="cycleCount - 1"
                color="orange"
              />
            </div>
            <div class="flex-grow-0">
              <v-btn
                icon
                class="my-auto"
                @click="selectedCycleIndex++"
              >
                <v-icon>mdi-menu-right</v-icon>
              </v-btn>
            </div>
            <div class="flex-grow-0">
              <v-btn
                icon
                class="my-auto"
                @click="selectedCycleIndex += 10"
              >
                <v-icon>mdi-fast-forward</v-icon>
              </v-btn>
            </div>
          </div>
          <v-row>
            <v-spacer />
            <v-col
              cols="3"
              class="text-right"
            >
              <v-btn disabled>
                <v-icon
                  left
                  color="primary"
                >
                  mdi-clipboard-outline
                </v-icon>
                Copy Analysis
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn @click="copyCurrent">
                <v-icon
                  left
                  color="primary"
                >
                  mdi-clipboard-outline
                </v-icon>
                Copy Data
              </v-btn>
            </v-col>
            <v-spacer />
          </v-row>
          <textarea
            id="select-box"
            hidden="true"
          />
          <v-tabs
            v-model="detailTabs"
            center-active
            centered
            color="orange"
          >
            <v-tab>Analysis</v-tab>
            <!-- <v-tab>Visualization</v-tab> -->
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
            <!-- <v-tab-item>Chart here?</v-tab-item> -->
            <v-tab-item>
              <DataTable :data-object="selectedCycleTableData" />
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
  components: { DataTable },
  data() {
    return {
      selectedCycleIndex: 0,
      tabs: 0,
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
      return this.chunker.unparsedOverview
    },

    selectedCycleIndexPlusOne() {
      return this.selectedCycleIndex + 1
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

    copyCurrent() {
      this.$copyText(this.unparsedCurrent)
    },

    copySummary() {
      this.$copyText(this.unparsedOverview)
    }
  }
}
</script>
