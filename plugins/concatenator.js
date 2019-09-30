export default class Concatenator {
  constructor(cycles, headers) {
    this.cycles = cycles
    this.headers = headers
  }

  concatenate() {
    const matrix = [[]]

    this.cycles.forEach(function(cycle) {
      cycle.data.forEach(function(line, lnum) {
        lnum++ // First line is headers, all others get offset by one

        if (!matrix[lnum]) {
          matrix[lnum] = []
        }

        matrix[lnum].push(...line)
      })

      // Tack headers onto the front
      matrix[0].push(...cycle.headers)
    })

    return matrix
  }
}
