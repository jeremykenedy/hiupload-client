import axios from 'axios';

export default {
  namespaced: true,
  state: {
    authenticated: false,
    user: null
  },
  getters: {
    authenticated (state) {
      return state.authenticated;
    },
    user (state) {
      return state.user;
    }
  },
  mutations: {
    SET_AUTHENTICATED (state, value) {
      state.authenticated = value;
    },
    SET_USER (state, data) {
      state.user = data;
    }
  },
  actions: {
    async login ({ dispatch }, credentials) {
      await axios.get('/sanctum/csrf-cookie');
      await axios.post('/api/login', credentials);
      return dispatch('me');
    },
    me ({ commit }) {
      return axios.get('/api/user').then(response => {
        commit('SET_AUTHENTICATED', true);
        commit('SET_USER', response.data.data);
      }).catch(() => {
        commit('SET_AUTHENTICATED', false);
        commit('SET_USER', null);
      });
    },
    async logout ({ dispatch }) {
      await axios.post('/api/logout');
      return dispatch('me');
    }
  },

  modules: {}
}
