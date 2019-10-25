import Papa from 'papaparse'
import CycleHalf from '~/plugins/cycleHalf'
import Concatenator from '~/plugins/concatenator'

export default class Cycle {
  constructor(rawHalves, index, context) {
    this.context = context
    this.rawHalves = rawHalves
    this.index = index
  }

  get overview() {
    return {
      headers: ['', 'Charge', 'Discharge'],
      lines: [
        // split basis average
        [
          'Average Current',
          this.charge.averageSplitBasis,
          this.discharge.averageSplitBasis
        ],
        // charge & discharge max voltage
        ['Max Voltage', this.charge.maxVoltage, this.discharge.maxVoltage],
        // charge & discharge min voltage
        ['Min Voltage', this.charge.minVoltage, this.discharge.minVoltage],
        // charge & discharge max spc
        [
          'Max Specific Capacity',
          this.charge.maxSpecificCapacity,
          this.discharge.maxSpecificCapacity
        ],
        // charge & discharge min min spc
        [
          'Min Specific Capacity',
          this.charge.minSpecificCapacity,
          this.discharge.minSpecificCapacity
        ],
        // overall spc
        [
          'Overall Specific Capacity',
          this.charge.specificCapacity,
          this.discharge.specificCapacity
        ]
      ]
    }
  }

  get baseHeaders() {
    return this.context.columns // unfiltered header columns
  }

  get splitBasis() {
    return this.context.splitBasis // which column was used to split cycles
  }
  get keptColumns() {
    return this.context.keptColumns // array of indexes
  }

  get halves() {
    if (!this._halves) {
      this._halves = this.rawHalves.map((half) => {
        return this.buildHalf(half)
      })
    }

    return this._halves
  }

  get charge() {
    return this.halves.find((half) => half.isCharge)
  }

  get discharge() {
    return this.halves.find((half) => half.isDischarge)
  }

  get headers() {
    return this.halves.flatMap((half) => half.headers)
  }

  get unparsed() {
    return Papa.unparse(this.processedLines, { delimiter: '\t' })
  }

  get processedLines() {
    return new Concatenator(this.halves).concatenatedWithHeaders
  }

  buildHalf(lines) {
    return new CycleHalf(lines, this.index, this.context)
  }

  get chargeEfficiency() {
    const ratio =
      this.discharge.maxSpecificCapacity / this.charge.maxSpecificCapacity
    // Javascript is awful. Math.round only does integers.
    return Math.round(ratio * 10000) / 100
  }
}
