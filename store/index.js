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

  parsedChart(_state, getters) {
    return Papa.parse(getters.rawChart.trim().replace(/\t/g, ''), {})
  },

  rawChart: (_state, getters) => getters.splitText[1],

  columnItems(_state, getters) {
    return getters.columns.map((label, index) => ({
      text: label,
      value: index
    }))
  }
}
