import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    indexeddb: null,
    session: null,
    users: [],
    messages: []
  },
  getters: {
    getAuth (state) {
      return !!state.session
    },
    getMessages (state) {
      return state.messages.map(m => ({
        ...m,
        me: m.user.id === state.session.id
      }))
    }
  },
  mutations: {
    initDB (state, db) {
      state.indexeddb = db
    },
    initSession (state, session ) {
      state.session = session
    },
    initMessages (state, messages) {
      state.messages = messages
    },
    setSession (state, user) {
      state.session = user
    }
  },
  actions: {
    async sendMessage ({ state, commit }, message) {
      const transaction = state.indexeddb.result.transaction('messages', "readwrite")
      const messages = transaction.objectStore("messages")
      const m = await messages.add({
        id: `m${(+new Date).toString(16)}`,
        message,
        user: state.session
      })
    },
    async sendAuth ({ state, commit }, user) {
      const transaction = state.indexeddb.result.transaction('users', "readwrite")
      const users = transaction.objectStore("users")
      await users.add(user)
      sessionStorage.setItem('session', user.id);
      commit('setSession', user)
    }
  }
})
