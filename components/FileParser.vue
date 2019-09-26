<template>
  <div>
    {{ parsedChart }}
  </div>
</template>

<script>
import Papa from 'papaparse'

export default {
  props: ['rawText'],
  computed: {
    splitText() {
      return this.rawText.split('RESULTS TABLE:')
    },

    header() {
      return this.splitText[0]
    },

    rawChart() {
      return this.splitText[1]
    },

    parsedChart() {
      if (this.rawChart) {
        const parsed = Papa.parse(this.rawChart.trim().replace(/\t/g, ''), {})
        console.log(parsed)

        return parsed
      } else {
        return 'No data'
      }
    },

    columns() {
      return this.rawChart[0]
    }
  },

  methods: {}
}
</script>
