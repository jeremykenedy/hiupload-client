import axios from 'axios';

export default {
  namespaced: true,
  state: {
    usage: 0,
  },
  getters: {
    usage (state) {
      return state.usage;
    }
  },
  mutations: {
    SET_USAGE (state, usage) {
      state.usage = usage;
    },
    INCREMENT_USAGE (state, usage) {
      state.usage = state.usage + usage;
    },
    DECREMENT_USAGE (state, usage) {
      state.usage = state.usage - usage;
    },
  },
  actions: {
    async getUsage ({ commit }) {
      let response = await axios.get('/api/user/usage');
      commit('SET_USAGE', response.data.data.usage);
      return response;
    },
  },
}
