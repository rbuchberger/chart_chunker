import Papa from 'papaparse'
import CycleHalf from '~/plugins/cycleHalf'
import Concatenator from '~/plugins/concatenator'

export default class Cycle {
  constructor(rawHalves, baseHeaders, splitBasis, keptColumns, index) {
    this.baseHeaders = baseHeaders // unfiltered header columns
    this.splitBasis = splitBasis // which column was used to split cycles
    this.keptColumns = keptColumns // array of indexes
    this.rawHalves = rawHalves
    this.index = index
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
    return new CycleHalf(
      lines,
      this.baseHeaders,
      this.splitBasis,
      this.keptColumns,
      this.index
    )
  }
}
