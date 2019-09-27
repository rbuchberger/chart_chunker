import Papa from 'papaparse'
export const state = () => ({
  loaded: false,
  loading: false,
  rawText: '',
  splitBasis: 8,
  keptColumns: [12, 14]
})

export const mutations = {
  loadText(state, text) {
    state.rawText = text
    state.loaded = true
    state.loading = false
  },

  unloadText(state) {
    state.loaded = false
    state.rawText = ''
  },

  setLoading(state) {
    state.loading = true
  },

  unsetLoading(state) {
    state.loading = false
  },

  setSplitBasis(state, value) {
    state.splitBasis = value
  },

  setKeptColumns(state, value) {
    state.keptColumns = value
  }
}

export const actions = {
  loadFile(context, file) {
    context.commit('setLoading')
    const reader = new FileReader()
    reader.onload = (e) => context.commit('loadText', e.target.result)
    reader.readAsText(file)
  }
}

export const getters = {
  splitText: (state) => state.rawText.split('RESULTS TABLE:'),
  header: (_state, getters) => getters.splitText[0],
  columns: (_state, getters) => getters.parsedChart.data[0],
  rawChart: (_state, getters) => getters.splitText[1],

  parsedChart(_state, getters) {
    return Papa.parse(getters.rawChart.trim().replace(/\t/g, ''), {})
  },

  columnItems(_state, getters) {
    return getters.columns.map((label, index) => ({
      text: label,
      value: index
    }))
  },

  chunkData(state, getters) {
    const workingCopy = getters.parsedChart.data.slice(0) // strip the column headers
    let currentValuePos // Whether the current value is positive
    let lastValuePos // Whether the last value was positive
    let currentValue // Value of current split test subject
    let currentCycle = [] // Collection of all rows from current test cycle
    const allCycles = [] // Array of all cycles, each of which is an array of rows

    while (workingCopy.length > 0) {
      const element = workingCopy.shift()
      currentValue = element[state.splitBasis]

      if (!Math.abs(currentValue) < 0.00001) {
        currentValuePos = currentValue > 0

        if (currentValuePos === lastValuePos) {
          currentCycle.push(element)
        } else {
          lastValuePos = currentValuePos
          allCycles.push(currentCycle)
          currentCycle = []
          lastValuePos = currentValuePos
        }
      }
    }

    return allCycles
  },

  filterColumns(state, getters) {
    const chunked = getters.chunkData // array of cycles
    const filteredCycles = []
    let filteredCycle = []
    let unFilteredCycle
    let unFilteredLine

    while (chunked.length > 0) {
      unFilteredCycle = chunked.shift() // array of lines

      while (unFilteredCycle.length > 0) {
        unFilteredLine = unFilteredCycle.shift() // individual line
        filteredCycle.push(
          unFilteredLine.filter((_element, index) =>
            state.keptColumns.includes(index)
          )
        )
      }

      filteredCycles.push(filteredCycle)
      filteredCycle = []
    }

    console.table(filteredCycles)
  }
}
