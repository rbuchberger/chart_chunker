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
  constructor(context) {
    this.context = context
    context.commit('clearCycles')
    this.buildCycles()
  }

  get overview() {
    return {
      headers: [
        'Cycle #',
        'Charge Specific Capacity',
        'Discharge Specific Capacity',
        'Charge Efficiency [%]',
        'Retention [%]'
      ],
      lines: this.cycles.map((cycle) => {
        return [
          cycle.index,
          cycle.charge.specificCapacity,
          cycle.discharge.specificCapacity,
          cycle.chargeEfficiency,
          this.getRetention(cycle)
        ]
      })
    }
  }

  get chargeEffArray() {
    return this.cycles.map((cycle) => cycle.chargeEfficiency)
  }

  get retentionArray() {
    return this.cycles.map((cycle) => this.getRetention(cycle))
  }

  get splitBasis() {
    return this.context.state.splitBasis // Which value to use for splits
  }

  get columnNames() {
    return this.context.state.parser.columns
  }

  get keptColumns() {
    return this.context.state.keptColumns.slice().sort() // order matters
  }

  get parsedChart() {
    return this.context.state.parser.parsedChart // Array of arrays (papa-parsed CSV)
  }

  get cycles() {
    return this.context.state.cycles
  }

  get unparsed() {
    return Papa.unparse(this.concatenated, {
      delimiter: '\t'
    })
  }

  get unparsedOverview() {
    return Papa.unparse(
      [this.overview.headers].concat(this.overview.lines),

      { delimiter: '\t' }
    )
  }

  get concatenated() {
    return new Concatenator(this.cycles).concatenated
  }

  get cycleCount() {
    return this.cycles.length
  }

  getRetention(cycle) {
    const ratio =
      cycle.discharge.maxSpecificCapacity /
      this.cycles[0].discharge.maxSpecificCapacity

    return Math.round(ratio * 10000) / 100
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

  get smallContext() {
    return {
      splitBasis: this.splitBasis,
      columns: this.columnNames,
      keptColumns: this.keptColumns,
      spcColumn: this.context.state.spcColumn,
      voltageColumn: this.context.state.voltageColumn
    }
  }

  addHalfCycle(lines) {
    if (this.halfCycle) {
      this.context.commit(
        'addCycle',
        new Cycle(
          [this.halfCycle, lines],
          this.cycleCount + 1,
          this.smallContext
        )
      )

      this.halfCycle = null
    } else {
      this.halfCycle = lines
    }
  }
}
