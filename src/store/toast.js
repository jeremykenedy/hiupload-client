export default {
  namespaced: true,
  state: {
    toast: {
      icon: 'success',
      message: null,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      showCloseButton: false,
    },
  },
  getters: {
    toast (state) {
      return state.toast;
    },
  },
  mutations: {
    SET_TOAST (state, data) {
      if (data.hasOwnProperty('message')) {
        state.toast.message = data.message;
      }
      if (data.hasOwnProperty('position')) {
        state.toast.position = data.position;
      }
      if (data.hasOwnProperty('icon')) {
        state.toast.icon = data.icon;
      }
      if (data.hasOwnProperty('showConfirmButton')) {
        state.toast.showConfirmButton = data.showConfirmButton;
      }
      if (data.hasOwnProperty('timer')) {
        state.toast.timer = data.timer;
      }
      if (data.hasOwnProperty('timerProgressBar')) {
        state.toast.timerProgressBar = data.timerProgressBar;
      }
      if (data.hasOwnProperty('showCloseButton')) {
        state.toast.showCloseButton = data.showCloseButton;
      }
    },
  },
  actions: {
    popToast ({ commit }, toast) {
      commit('SET_TOAST', toast);
    },
    clearToast ({ commit }) {
      commit('SET_TOAST', {
        icon: 'success',
        message: null,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        showCloseButton: false,
      });
    },
  },
}
