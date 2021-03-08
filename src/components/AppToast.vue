<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'toast',
  computed: {
    ...mapGetters({
      toast: 'toast/toast',
    }),
  },
  watch: {
    toast: {
      deep: true,
      handler(newVal, oldVal) {
        if (newVal.message) {
          this.popToast();
        }
      },
    },
  },
  methods: {
    ...mapActions({
      clearToast: 'toast/clearToast',
    }),
    async popToast () {
      await this.$swal.fire({
        toast: true,
        position: this.toast.position,
        icon: this.toast.icon,
        showConfirmButton: this.toast.showConfirmButton,
        title: this.toast.message,
        timer: this.toast.timer,
        timerProgressBar: this.toast.timerProgressBar,
        showClass: {
          popup: '',
          // icon: ''
        },
        hideClass: {
          popup: '',
        },
      }).then((result) => {
        return result;
      });
      this.clearToast();
    },
  }
}
</script>
