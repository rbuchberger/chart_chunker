import Papa from 'papaparse'
import Cycle from '~/plugins/cycle'
import Concatenator from '~/plugins/concatenator'

// Take in an array of arrays (papa-parsed CSV table). Split it up into cycles.
//
// A charge-discharge cycle is determined by the splitBasis (probably current
// supplied to the battery.) When changes sign, that line is the first in a new
// half-cycle. If it's ~zero, end any cycle that's in progress and discard that
// line.

export default class Chunker {
  constructor(parser, splitBasis, keptColumns) {
    this.splitBasis = splitBasis // Which value to use for splits
    this.columnNames = parser.columns
    this.keptColumns = keptColumns.slice().sort() // order matters
    this.parsedChart = parser.parsedChart // Array of arrays (papa-parsed CSV)
    this.cycles = []
    this.buildCycles()
    this.buildStats()
  }

  get unparsed() {
    return Papa.unparse(this.concatenated, {
      delimiter: '\t'
    })
  }

  get concatenated() {
    return new Concatenator(this.cycles).concatenated
  }

  buildStats() {
    this.cycleCount = this.cycles.length
  }

  buildCycles() {
    // strip the column headers:
    const workingCopy = this.parsedChart.data

    let lastValuePos = false // Whether the last value was positive
    let currentValue // Value of current split test subject
    let lines = [] // Collection of all rows from current half-cycle

    workingCopy.forEach((element) => {
      currentValue = element[this.splitBasis]

      // Skip over zeros
      if (Math.abs(currentValue) < 0.0000005) {
        if (lines.length > 0) {
          // There was a cycle in progress; finish it and prep a new one.
          this.addHalfCycle(lines)
          lines = []
        }
      } else if (lines.length === 0) {
        // We're starting a new cycle.
        lastValuePos = currentValue > 0
        lines.push(element)
      } else if (currentValue > 0 === lastValuePos) {
        // If the sign hasn't changed, keep going
        lines.push(element)
      } else {
        // the sign has changed, and the cycle is complete.
        this.addHalfCycle(lines)
        // Set up the next cycle
        lastValuePos = currentValue > 0
        lines = [element]
      }
    })

    // catch the last one:
    if (lines.length > 0) {
      this.addHalfCycle(lines)
    }
  }

  addHalfCycle(lines) {
    if (this.halfCycle) {
      this.cycles.push(
        new Cycle(
          [this.halfCycle, lines],
          this.columnNames,
          this.splitBasis,
          this.keptColumns,
          this.cycles.length + 1
        )
      )

      this.halfCycle = null
    } else {
      this.halfCycle = lines
    }
  }
}
