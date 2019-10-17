import Parser from '~/plugins/parser'
import Chunker from '~/plugins/chunker'

export const state = () => ({
  loading: false,
  file: null,
  rawText: null,
  parser: null,
  chunker: null,
  fileHeader: null,
  parsedChart: null,
  columns: null,
  columnItems: null,
  keptColumns: [12, 14],
  splitBasis: 8,
  spcColumn: 12,
  voltageColumn: 14,
  cycles: []
})

export const mutations = {
  setChunker(state, chunker) {
    state.chunker = chunker
  },

  unloadText(state) {
    state.parser = false
    state.chunker = false
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

  setSpcColumn(state, payload) {
    state.spcColumn = payload
  },

  setVoltageColumn(state, payload) {
    state.VoltageColumn = payload
  },

  setKeptColumns(state, value) {
    state.keptColumns = value
  },

  setFile(state, value) {
    state.file = value
  },

  unloadFile(state) {
    state.file = null
  },

  setParser(state, parser) {
    state.parser = parser
    state.columns = parser.columns
  },

  addCycle(state, cycle) {
    state.cycles.push(cycle)
  },

  clearCycles(state) {
    state.cycles = []
  }
}

export const actions = {
  loadFile(context) {
    context.commit('setLoading')

    return new Promise((resolve, reject) => {
      new Promise(function(resolve, reject) {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.readAsText(context.state.file)
      }).then((result) => {
        context.commit('setParser', new Parser(result))
        resolve()
        context.commit('unsetLoading')
      })
    })
  },

  buildChunker(context) {
    context.commit('setLoading')

    return new Promise((resolve) => {
      context.commit('setChunker', new Chunker(context))

      resolve()
      context.commit('unsetLoading')
    })
  }
}

export const getters = {
  cycles: (state, _getters) => {
    if (state.chunker) {
      return state.chunker.cycles
    } else {
      return []
    }
  },

  cycleCount: (state, _getters) => {
    if (state.chunker) {
      return state.chunker.cycleCount
    } else {
      return 0
    }
  },

  columnItems: (state, _getters) => {
    if (state.parser) {
      return state.parser.columnItems
    } else {
      return []
    }
  },

  keptColumnItems: (state, getters) => {
    return state.parser.columnItems.filter((item) =>
      state.keptColumns.includes(item.value)
    )
  },

  columns: (state, _getters) => {
    if (state.parser) {
      return state.parser.columns
    } else {
      return []
    }
  },

  spcColumn: (state, getters) => {
    return getters.columnItems.find((item) => item.value === state.spcColumn)
  },

  voltageColumn: (state, getters) => {
    return getters.columnItems.find(
      (item) => item.value === state.voltageColumn
    )
  }
}
