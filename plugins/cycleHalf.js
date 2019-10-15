export default class CycleHalf {
  constructor(lines, baseHeaders, splitBasis, keptColumns, index) {
    this.lines = lines
    this.baseHeaders = baseHeaders
    this.splitBasis = splitBasis
    this.keptColumns = keptColumns
    this.index = index
  }

  get isCharge() {
    return this.averageSplitBasis > 0
  }

  get isDischarge() {
    return this.averageSplitBasis < 0
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
