import * as types from '../mutationTypes'
import axios from 'axios'

const state = {
  title: '',
  body: '',
  response: null,
  error: null
}

const actions = {
  async sendNotification ({ state, commit, rootState }) {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${rootState.user.principle.stsTokenManager.accessToken}`
      let response = await axios.post('/api/notification', {
        title: state.title,
        body: state.body
      })
      commit(types.NOTIFICATION_SUCCESS, response)
    } catch (error) {
      commit(types.NOTIFICATION_ERROR, error)
    }
  }
}

const mutations = {
  [types.TITLE_INPUT_CHANGE] (state, title) {
    state.title = title
  },
  [types.MESSAGE_INPUT_CHANGE] (state, message) {
    state.body = message
  },
  [types.NOTIFICATION_ERROR] (state, error) {
    state.error = error
  },
  [types.NOTIFICATION_SUCCESS] (state, response) {
    state.title = ''
    state.message = ''
    state.response = response
  }
}

export default {
  state,
  actions,
  mutations
}
