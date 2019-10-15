import Parser from '~/plugins/parser'
import Chunker from '~/plugins/chunker'

export const state = () => ({
  loading: false,
  splitBasis: 8,
  keptColumns: [12, 14],
  chunker: false,
  parser: false,
  file: null
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
  }
}

export const actions = {
  loadFile(context) {
    context.commit('setLoading')

    return new Promise((resolve, reject) => {
      new Promise((resolve, reject) => {
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

    return new Promise((resolve, reject) => {
      context.commit(
        'setChunker',
        new Chunker(
          context.state.parser,
          context.state.splitBasis,
          context.state.keptColumns
        )
      )

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

  columns: (state, _getters) => {
    if (state.parser) {
      return state.parser.columns
    } else {
      return []
    }
  }
}
