import Parser from '~/plugins/parser'
import Chunker from '~/plugins/chunker'

export const state = () => ({
  loaded: false,
  loading: false,
  rawText: '',
  splitBasis: 8,
  keptColumns: [12, 14],
  chunker: false,
  parser: false
})

export const mutations = {
  buildChunker(state) {
    state.chunker = new Chunker(
      state.parser.parsedChart,
      state.splitBasis,
      state.columns,
      state.keptColumns
    )
  },

  buildParser(state, text) {
    const parser = new Parser(text)
    state.parser = parser
    state.columns = parser.columns
    this.commit('buildChunker')
  },

  loadText(state, text) {
    state.rawText = text
    state.loaded = true
    state.loading = false
    this.commit('buildParser', text)
  },

  unloadText(state) {
    state.loaded = false
    state.rawText = ''
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
    this.commit('buildChunker')
  },

  setKeptColumns(state, value) {
    state.keptColumns = value
    this.commit('buildChunker')
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

  columns: (state, _getters) => {
    if (state.parser) {
      return state.parser.columns
    } else {
      return []
    }
  }
}
