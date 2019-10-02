export default class Chunker {
  constructor(parsedChart, splitBasis, columnNames, keptColumns) {
    this.parsedChart = parsedChart
    this.splitBasis = splitBasis
    this.columnNames = columnNames
    this.keptColumns = keptColumns.sort() // order matters
    this.cycles = []
    this.buildCycles()
    this.buildStats()
  }

  buildStats() {
    this.cycleCount = this.cycles.length
  }

  buildCycles() {
    const workingCopy = this.parsedChart.data.slice(0) // strip the column headers
    let lastValuePos = false // Whether the last value was positive
    let currentValue // Value of current split test subject
    let lines = [] // Collection of all rows from current test cycle

    workingCopy.forEach((element) => {
      currentValue = element[this.splitBasis]

      // Skip over zeros
      if (Math.abs(currentValue) < 0.0000005) {
        if (lines.length > 0) {
          // There was a cycle in progress; finish it and prep a new one.
          this.buildCycle(lines)
          lines = []
        }
      } else if (lines.length === 0) {
        // We're starting a new cycle.
        lastValuePos = currentValue > 0
        lines.push(element.slice())
      } else if (currentValue > 0 === lastValuePos) {
        // If the sign hasn't changed, keep going
        lines.push(element.slice())
      } else {
        // the sign has changed, and the cycle is complete.
        this.buildCycle(lines)
        // Set up the next cycle
        lastValuePos = currentValue > 0
        lines = [element.slice()]
      }
    })

    // catch the last one:
    if (lines.length > 0) {
      this.buildCycle(lines)
    }
  }

  buildCycle(lines) {
    const splitBasisAvg = this.averageSplitBasis(lines)

    this.cycles.push({
      data: lines.map((line) => this.processLine(line)),
      headers: this.buildHeaders(splitBasisAvg),
      splitBasisAvg
    })
  }

  buildHeaders(splitBasisAvg) {
    const baseTitles = this.filterColumns(this.columnNames)
    const chargePrefix = splitBasisAvg > 0 ? 'C' : 'D'
    const cycleIndex = this.cycles.length + 1

    return baseTitles.map(function(item, index) {
      if (index === 0) {
        return (
          chargePrefix +
          cycleIndex +
          `_(${splitBasisAvg.toExponential(1)})_` +
          item
        )
      } else {
        return chargePrefix + cycleIndex + '_' + item
      }
    })
  }

  processLine(line) {
    return this.filterColumns(line).map((val) => Math.abs(val))
  }

  // Build headers
  averageSplitBasis(lines) {
    const total = lines.reduce(
      (total, line) => total + parseFloat(line[this.splitBasis]),
      0
    )

    return total / lines.length
  }

  // Dump all columns other than those specified by keptColumns
  filterColumns(line) {
    return line.filter((_element, index) => this.keptColumns.includes(index))
  }
}
