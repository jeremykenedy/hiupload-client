<template>
  <div class="w-10/12 m:w-6/12 mx-auto">
    <form actions="" @submit.prevent="login" class="mb-8">

      <div class="mb-6">
        <div class="mb-3">
          <label for="email" class="inline-block text-small mb-2">
            E-mail Address
          </label>
          <input v-model="form.email" type="text" id="email" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md">
        </div>

        <div class="mb-4">
          <label for="password" class="inline-block text-small mb-2">
            Password
          </label>
          <input v-model="form.password" type="password" id="password" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md">
        </div>
      </div>

      <button type="submit" class="bg-indigo-500 text-white px-4 py-3 leading-none rounded-md font-medium">
        Login
      </button>

    </form>

    <p class="text-small text-gray-500">
      Not joined yet? <a href="" class="text-indigo-500">Create an account</a>
    </p>

  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {},
  data () {
    return {
      form: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions({
      loginActions: 'auth/login',
    }),
    async login() {
      await this.loginActions(this.form);
      this.$router.replace({ name: 'home' });
    }
  }
}
</script>
