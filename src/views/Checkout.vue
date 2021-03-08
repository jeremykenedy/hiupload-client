<template>
  <form
    @submit.prevent="submit"
    class="mb-8"
  >
    <ErrorMessage
      v-if="error"
      :error='error'
      @clearErrorMessage="clearErrors"
    />
    <div class="mb-3">
      <label for="name" class="inline-block text-small mb-2">
        Your name
      </label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        class="w-full border-2 border-gray-200 h-10 px-3 rounded-md"
        :disabled="submitting"
      >
    </div>
    <div class="mb-3">
      <label for="card" class="inline-block text-small mb-2">
        Card details
      </label>
      <div id="card" ref="card"></div>
    </div>
    <AppButton
      :loading="submitting"
      :text="submitting ? 'Paying' : 'Pay'"
      :icon="submitting ? 'fas fa-circle-notch fa-spin' : 'fas fa-check'"
      type="submit"
    />
  </form>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage';
import AppButton from '@/components/AppButton';

const stripe = Stripe(process.env.VUE_APP_STRIPE_KEY);
const elements = stripe.elements();
const cardElement = elements.create('card');

export default {
  name: 'checkout',
  components: { AppButton, ErrorMessage },
  props: {
    plan: { type: String, required: true },
  },
  computed: {},
  data () {
    return {
      intent: {
        client_secret: null,
      },
      form: {
        name: null,
      },
      submitting: false,
      error: null,
    }
  },
  mounted () {
    this.setupStripe();
  },
  methods: {
    ...mapActions({
      me: 'auth/me',
      popToast: 'toast/popToast',
    }),
    async setupStripe () {
      let response = await axios.get('api/subscriptions/intent');
      this.intent.client_secret = response.data.data.client_secret;
      cardElement.mount(this.$refs.card);
    },
    async submit () {
      this.submitting = true;
      this.error = null;
      const { setupIntent, error } = await stripe.confirmCardSetup(this.intent.client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: this.form.name,
          }
        }
      });
      if (error) {
        this.submitting = false;
        this.error = error.message;
      } else {
        await this.createSubscription(setupIntent.payment_method);
      }
    },
    async createSubscription (token) {
      const self = this;
      let response = await axios.post('api/subscriptions', { plan: self.plan, token });
      await self.me();
      self.submitting = false;
      // await self.$swal({
      //     title: 'Success',
      //     html: `Successfully Updated!`,
      //     type: "success",
      //     icon: 'success',
      //     showCancelButton: false,
      //     confirmButtonText: 'Great!',
      //     showClass: {
      //       popup: '',
      //     },
      //     hideClass: {
      //       popup: '',
      //     },
      // }).then((result) => {
      //   self.$router.replace({ name: 'home' });
      // });
      self.popToast({
        message: `Plan successfully upgraded`,
        timer: 5000,
      });
      self.$router.replace({ name: 'home' });
    },
    clearErrors () {
      this.error = null;
    }
  }
}
</script>
