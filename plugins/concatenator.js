export default class Concatenator {
  constructor(cycles, headers) {
    this.cycles = cycles
    this.headers = headers
  }

  concatenate() {
    const matrix = [[]]

    this.cycles.forEach(function(cycle, cnum) {
      cycle.data.forEach(function(line, lnum) {
        lnum++ // First line is headers, all others get offset by one

        // This cycle might be the longest one so far:
        if (!matrix[lnum]) {
          matrix[lnum] = []
        }

        // Past cycles may not have been as long as this cycle. We need to
        // insert empty values until we reach the correct point.
        while (matrix[lnum].length < cycle.headers.length * cnum) {
          matrix[lnum].push(null)
        }

        matrix[lnum].push(...line)
      })

      // Tack headers onto the front
      matrix[0].push(...cycle.headers)
    })

    return matrix
  }
}
