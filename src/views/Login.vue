<template>
  <div class="w-10/12 m:w-6/12 mx-auto">
    <form actions="" @submit.prevent="login" class="mb-8">

      <div class="mb-6">
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
      </div>
      <AppButton
        :loading="loading"
        :disabled="loading"
        :text="loading ? 'Login' : 'Login'"
        :icon="loading ? 'fas fa-circle-notch fa-spin' : 'fas fa-chevron-right'"
        type="submit"
      />
    </form>

    <p class="text-small text-gray-500">
      Not joined yet? <router-link :to="{ name: 'register' }" class="text-indigo-500" >Create an account</router-link>
    </p>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: null,
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      loginActions: 'auth/login',
      popToast: 'toast/popToast',
    }),
    async login() {
      this.loading = true;
      this.errors = null;
      try {
        await this.loginActions(this.form);
        this.$router.replace({ name: 'home' });
      } catch(e) {
        this.loading = false;
        if (e.response.status === 422) {
          this.errors = e.response.data.errors;
        }
        if (e.response.status === 401) {
          this.popToast({
            message: `Invalid Email or Password`,
            timer: 522000,
            icon: 'error',
          });
        }
      }
    }
  }
}
</script>


