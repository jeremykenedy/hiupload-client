<template>
  <header class="flex flex-wrap md:flex-no-wrap items-center justify-between mb-6 -mx-3 -mt-3">

    <ul class="flex items-center">
      <li>
        <router-link :to="{ name: 'home' }" class="text-small inline-block p-3 text-gray-800">Home</router-link>
      </li>
      <li v-if="authenticated">
        <router-link :to="{ name: 'uploads' }" class="text-small inline-block p-3 text-gray-800">Your Files</router-link>
      </li>
    </ul>

    <div
      class="flex justify-center order-last w-full md:w-auto md:order-none"
    >
      <AppUsage v-if="authenticated" />
    </div>

    <ul class="flex items-center">
      <template v-if="!authenticated">
        <li>
          <router-link
            :to="{ name: 'login' }" class="text-small inline-block p-3 text-gray-800"
          >
            Sign In
          </router-link>
        </li>
        <li>
          <router-link
            :to="{ name: 'register' }" class="text-small inline-block p-3 text-gray-800"
          >
            Create Account
          </router-link>
        </li>
      </template>
      <template v-if="authenticated">
        <li>
          <router-link
            :to="{ name: 'account' }"
            class="text-small inline-block p-3 text-gray-800"
          >
            Account
          </router-link>
        </li>
        <li>
          <a
            class="text-small inline-block p-3 text-gray-800"
            @click.prevent="logout"
          >
            Logout
          </a>
        </li>
      </template>

      <li v-if="authenticated && !user.subscribed">
          <router-link
            :to="{ name: 'plans' }" class="text-small inline-block p-3 text-indigo-500"
          >
            Upgrade ✨
          </router-link>
      </li>
    </ul>

  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppUsage from '@/components/AppUsage';

export default {
  name: 'appnav',
  components: { AppUsage },
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    }),
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    ...mapActions({
      logoutActions: 'auth/logout',
    }),
    async logout() {
      await this.logoutActions();
      this.$router.replace({ name: 'home' });
    },
  }
}
</script>
