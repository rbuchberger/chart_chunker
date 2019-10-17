export default class CycleHalf {
  constructor(lines, index, context) {
    this.lines = lines
    this.context = context
    this.index = index
  }

  get baseHeaders() {
    return this.context.columns
  }

  get splitBasis() {
    return this.context.splitBasis
  }

  get keptColumns() {
    return this.context.keptColumns
  }

  get spcColumn() {
    return this.context.spcColumn
  }

  get voltageColumn() {
    return this.context.voltageColumn
  }

  get isCharge() {
    return this.averageSplitBasis > 0
  }

  get isDischarge() {
    return this.averageSplitBasis < 0
  }

  get maxVoltage() {
    return parseFloat(this._findLargest(this.voltageColumn).value)
  }

  get minVoltage() {
    return parseFloat(this._findSmallest(this.voltageColumn).value)
  }

  get maxSpecificCapacity() {
    return parseFloat(this._findLargest(this.spcColumn).value)
  }

  get minSpecificCapacity() {
    return parseFloat(this._findSmallest(this.spcColumn).value)
  }

  get specificCapacity() {
    return this.maxSpecificCapacity - this.minSpecificCapacity
  }

  _findLargest(column) {
    const largest = this.lines.reduce(
      (accumulator, item, index) => {
        const candidate = Math.abs(parseFloat(item[column]))
        if (candidate > accumulator.value) {
          accumulator.value = candidate
          accumulator.index = index
        }

        return accumulator
      },
      { value: 0, index: 0 }
    )

    return largest
  }

  _findSmallest(column) {
    const smallest = this.lines.reduce(
      (accumulator, item, index) => {
        const candidate = Math.abs(parseFloat(item[column]))
        if (candidate < accumulator.value) {
          accumulator.value = candidate
          accumulator.index = index
        }

        return accumulator
      },
      { value: this.lines[0][column], index: 0 }
    )

    return smallest
  }

  get averageSplitBasis() {
    if (!this._averageSplitBasis) {
      const total = this.lines.reduce(
        (total, line) => total + parseFloat(line[this.splitBasis]),
        0
      )

      this._averageSplitBasis = total / this.lines.length
    }

    return this._averageSplitBasis
  }

  get processedLines() {
    if (!this._processedLines) {
      this._processedLines = this.lines.map((line) => this.processLine(line))
      // this._processedLines.unshift(this.headers)
    }

    return this._processedLines
  }

  get headers() {
    if (!this._headers) {
      this._headers = this.buildHeaders()
    }

    return this._headers
  }

  processLine(line) {
    return this.filterColumns(line).map((val) => Math.abs(val))
  }

  filterColumns(line) {
    return line.filter((_element, index) => this.keptColumns.includes(index))
  }

  buildHeaders() {
    const baseTitles = this.filterColumns(this.baseHeaders)
    const chargePrefix = this.isCharge ? 'C' : 'D'

    return baseTitles.map((item, index) => {
      if (index === 0) {
        return (
          chargePrefix +
          this.index +
          `_(${this.averageSplitBasis.toExponential(1)})_` +
          item
        )
      } else {
        return chargePrefix + this.index + '_' + item
      }
    })
  }
}
