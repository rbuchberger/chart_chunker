<template>
  <v-card class="my-5">
    <v-card-title>
      Cycle # {{ selectedCycleIndex + 1 }} of {{ cycleCount }}
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
        <v-btn @click="copyCurrent">Copy current</v-btn>
        <v-btn @click="copyAll">Copy all</v-btn>
        <v-btn color="orange">Download all</v-btn>
        <v-spacer />
      </v-card-actions>
      <textarea hidden="true" id="select-box" />
      <v-simple-table dense light>
        <thead>
          <tr>
            <th v-for="header in selectedCycle.headers" :key="header">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(line, lineIndex) in selectedCycle.data" :key="lineIndex">
            <td
              v-for="(entry, entryIndex) in line"
              :key="lineIndex.toString() + entryIndex.toString()"
            >
              {{ entry }}
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Papa from 'papaparse'

export default {
  data() {
    return {
      selectedCycleIndex: 0
    }
  },
  computed: {
    ...mapGetters(['cycles', 'cycleCount']),

    selectedCycle() {
      return this.cycles[this.selectedCycleIndex]
    },

    unparsedCurrent() {
      const matrix = [this.selectedCycle.headers].concat(
        this.selectedCycle.data
      )
      return Papa.unparse(matrix)
    },

    unparsedAll() {
      const matrix = [[]]
      this.cycles.forEach((cycle) => {
        matrix[0].push(...cycle.headers)
        cycle.data.forEach((line, lineNumber) => {
          matrix[lineNumber + 1] = matrix[lineNumber + 1] || []

          matrix[lineNumber + 1].push(...line)
        })
      })

      return Papa.unparse(matrix)
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
