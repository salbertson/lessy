import usersApi from '../../api/users'
import auth from '../../auth'

const state = {
  current: null,
  byIds: {},
}

const getters = {
  findById (state) {
    return id => {
      const user = state.byIds[id]
      return {
        ...user,
        activated: !!user.username,
        displayedName: user.username || user.email,
      }
    }
  },

  current (state, getters) {
    const currentId = state.current
    if (currentId == null) {
      return null
    }
    return getters.findById(state.current)
  },
}

const actions = {
  register ({ commit }, email) {
    return usersApi.register(email)
      .then((res) => {
        auth.login(res.meta.token)
        commit('setCurrent', res.data)
      })
  },

  resendActivationEmail ({ commit }, { email }) {
    return usersApi.resendActivationEmail(email)
  },

  activate ({ commit }, { token, username, password }) {
    return usersApi.activate(token, username, password)
      .then((res) => {
        auth.login(res.meta.token)
        commit('setCurrent', res.data)
      })
  },

  login ({ commit }, { username, password }) {
    return usersApi.login(username, password)
      .then((res) => {
        auth.login(res.meta.token)
        commit('setCurrent', res.data)
      })
  },

  sudo ({ commit, state }, { password }) {
    const userId = state.current
    const user = state.byIds[userId]
    return usersApi.sudo(user.username, password)
      .then((res) => {
        auth.sudo(res.meta.token)
      })
  },

  getCurrent ({ commit }) {
    return usersApi.getCurrent()
                   .then((res) => commit('setCurrent', res.data))
  },

  updateCurrent ({ commit }, { username, email }) {
    return usersApi.updateCurrent(username, email)
                   .then((res) => commit('update', res.data))
  },

  logout ({ commit }) {
    auth.logout()
  },

  acceptTermsOfService ({ commit }) {
    return usersApi.acceptTermsOfService()
                   .then((res) => commit('update', res.data))
  },

  resetPassword ({ commit }, { email }) {
    return usersApi.resetPassword(email)
  },

  changePassword ({ commit }, { password, token }) {
    return usersApi.changePassword(password, token)
      .then((res) => {
        if (res.meta) {
          auth.login(res.meta.token)
        }
        commit('setCurrent', res.data)
      })
  },

  deleteAccount () {
    const userId = state.current
    const user = state.byIds[userId]
    const userActive = !!user.username
    return usersApi.deleteAccount(userActive)
  },
}

const mutations = {
  setCurrent (state, data) {
    state.byIds = {
      ...state.byIds,
      [data.id]: {
        id: data.id,
        ...data.attributes,
      },
    }
    state.current = data.id
  },

  update (state, data) {
    state.byIds = {
      ...state.byIds,
      [data.id]: {
        ...state.byIds[data.id],
        ...data.attributes,
      },
    }
  },

  reset (state) {
    state.byIds = {}
    state.current = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
