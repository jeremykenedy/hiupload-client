import { createStore } from 'vuex';
import auth from './auth';
import files from './files';
import usage from './usage';
import toast from './toast';

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
    toast,
  }
});
