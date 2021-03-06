import { createStore } from 'vuex';
import auth from './auth';
import files from './files';
import usage from './usage';

export default createStore({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    auth,
    files,
    usage,
  }
});
