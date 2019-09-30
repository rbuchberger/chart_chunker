<template>
  <v-card class="my-5">
    <v-card-title class="headline">
      Preview Cycle # {{ selectedCycleIndex + 1 }} of {{ cycleCount }}
    </v-card-title>
    <v-card-text>
      <v-switch label="Preview" v-model="preview" color="orange" />
      <v-switch label="Preview chart" v-model="preview_graph" color="orange" />
      <div v-if="preview">
        <v-slider
          v-model="selectedCycleIndex"
          :max="cycleCount - 1"
          color="orange"
          ticks
        />
        <Graph :inputData="selectedCycle" />
        <v-simple-table v-if="!preview_graph" dense light>
          <thead>
            <tr>
              <th v-for="header in selectedCycle.headers" :key="header">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(line, lineIndex) in selectedCycle.data"
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
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Graph from '~/components/Graph'

export default {
  data() {
    return {
      selectedCycleIndex: 0,
      preview: true,
      preview_graph: false
    }
  },

  components: {
    Graph
  },

  computed: {
    ...mapGetters(['cycles', 'cycleCount']),

    selectedCycle() {
      return this.cycles[this.selectedCycleIndex]
    }
  }
}
</script>
