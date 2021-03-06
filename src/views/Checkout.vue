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
    <button
      type="submit"
      class="text-white px-4 py-3 leading-none rounded-md font-medium"
      :class="submitting ? 'bg-indigo-300' : 'bg-indigo-500 '"
      :disabled="submitting"
    >
      <span v-if="!submitting">
        Pay
        <i class="fas fa-check fa-fw"></i>
      </span>
      <span v-if="submitting">
        Paying
        <i class="fas fa-circle-notch fa-spin fa-fw" />
      </span>
    </button>
  </form>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage';

const stripe = Stripe(process.env.VUE_APP_STRIPE_KEY);
const elements = stripe.elements();
const cardElement = elements.create('card');

export default {
  name: 'checkout',
  components: { ErrorMessage },
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
      let response = await axios.post('api/subscriptions', { plan: this.plan, token });
      await this.me();
      this.submitting = false;
      await this.$swal({
          title: 'Success',
          html: `Successfully Updated!`,
          type: "success",
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Great!',
          showClass: {
            popup: '',
          },
          hideClass: {
            popup: '',
          },
      }).then((result) => {
        this.$router.replace({ name: 'home' });
      });
    },
    clearErrors () {
      this.error = null;
    }
  }
}
</script>
