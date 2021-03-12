<template>
  <div class="w-10/12 m:w-6/12 mx-auto">
    <form actions="" @submit.prevent="register" class="mb-8">

      <div class="mb-6">

        <div class="mb-3">
          <label
            for="name"
            class="inline-block text-small mb-2"
            :class="{ 'text-red-500': errors && errors.name }"
          >
            Name
          </label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            class="w-full border-2 border-gray-200 h-10 px-3 rounded-md"
            :class="{ 'border-red-500': errors && errors.name }"
            :disabled="loading"
          >
          <div
            v-if="errors && errors.name"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.name[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label
            for="email"
            class="inline-block text-small mb-2"
            :class="{ 'text-red-500': errors && errors.email }"
          >
            E-mail Address
          </label>
          <input
            v-model="form.email"
            type="text"
            id="email"
            class="w-full border-2 border-gray-200 h-10 px-3 rounded-md"
            :class="{ 'border-red-500': errors && errors.email }"
            :disabled="loading"
          >
          <div
            v-if="errors && errors.email"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.email[0] }}
          </div>
        </div>

        <div class="mb-4">
          <label
            for="password"
            class="inline-block text-small mb-2"
            :class="{ 'text-red-500': errors && errors.password }"
          >
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            id="password"
            class="w-full border-2 border-gray-200 h-10 px-3 rounded-md"
            :class="{ 'border-red-500': errors && errors.password }"
            :disabled="loading"
          >
          <div
            v-if="errors && errors.password"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="mb-4">
          <label
            for="password_confirmation"
            class="inline-block text-small mb-2"
            :class="{ 'text-red-500': errors && errors.password_confirmation }"
          >
            Password Confirmation
          </label>
          <input
            v-model="form.password_confirmation"
            type="password_confirmation"
            id="password_confirmation"
            class="w-full border-2 border-gray-200 h-10 px-3 rounded-md"
            :class="{ 'border-red-500': errors && errors.password_confirmation }"
            :disabled="loading"
          >
          <div
            v-if="errors && errors.password_confirmation"
            class="text-red-500 text-sm mt-1"
          >
            {{ errors.password_confirmation[0] }}
          </div>
        </div>

      </div>
      <AppButton
        :loading="loading"
        :disabled="loading"
        :text="loading ? 'Create Account' : 'Create Account'"
        :icon="loading ? 'fas fa-circle-notch fa-spin' : 'fas fa-chevron-right'"
        type="submit"
      />
    </form>
    <p class="text-small text-gray-500">
      Already have an account? <router-link :to="{ name: 'login' }" class="text-indigo-500" >Login</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'Register',
  components: {},
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      loading: false,
      errors: null,
    }
  },
  methods: {
    ...mapActions({
      loginActions: 'auth/login',
    }),
    async register() {
      this.loading = true;
      this.errors = null;
      try {
        await axios.post('/api/register', this.form);
        await this.login();
      } catch(e) {
        this.loading = false;
        if (e.response.status === 422) {
          this.errors = e.response.data.errors;
          this.loading = false;
        }
      }
    },
    async login() {
      this.errors = null;
      await this.loginActions(this.form);
      this.loading = false;
      this.$router.replace({ name: 'home' });
    },
  }
}
</script>
