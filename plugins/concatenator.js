export default class Concatenator {
  // Tables in this application are an array of lines, each of which is an array
  // of column entries (just like PapaParse handles them). This class takes in
  // an array of cycles (which contain such tables), and appends them
  // side-by-side. I can't believe I had to write this; there's no standard lib
  // to do something so basic?

  constructor(cycles) {
    this.cycles = cycles
    this.columnCount = cycles[0].headers.length
  }

  get concatenated() {
    // Without headers.
    this.matrix = [[]]
    this.cycles.forEach((cycle, cycleNo) => {
      cycle.processedLines.forEach((line, lineNo) => {
        this._appendToLine(cycleNo, line, lineNo)
      })
    })

    return this.matrix
  }

  get concatenatedWithHeaders() {
    this.matrix = [[]]
    this.cycles.forEach((cycle, cycleNo) => {
      cycle.processedLines.forEach((line, lineNo) => {
        lineNo++ // Offset by one; leave first row empty for headers.

        this._appendToLine(cycleNo, line, lineNo)
      })

      this.matrix[0].push(...cycle.headers)
    })

    return this.matrix
  }

  _appendToLine(cycleNo, line, lineNo) {
    // This cycle might be the longest one so far, so we may need to add a new
    // empty line:
    if (this.matrix.length < lineNo + 1) {
      this.matrix.push([])
    }

    // Past cycles may not have been as long as this cycle. We need to insert
    // empty values into this line until it's the correct length:
    this.matrix[lineNo].length = this.columnCount * cycleNo

    this.matrix[lineNo].push(...line)
  }
}
