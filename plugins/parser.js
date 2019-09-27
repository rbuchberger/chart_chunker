import Papa from 'papaparse'

export default class Parser {
  constructor(rawText) {
    this.rawText = rawText
    this.splitParts()
  }

  splitParts() {
    const splitText = this.rawText.split('RESULTS TABLE:')
    this.header = splitText.shift()
    this.parsedChart = this.buildParsedChart(splitText.shift())
    this.columns = this.parsedChart.data.shift()
    this.columnItems = this.columns.map((label, index) => ({
      text: label,
      value: index
    }))
  }

  buildParsedChart(rawChart) {
    return Papa.parse(rawChart.trim().replace(/\t/g, ''))
  }
}
