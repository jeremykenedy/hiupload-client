<template>
  <div>
    <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800 mb-3">
      Subscription
    </h2>
    <div class="text-sm">
      <p class="mb-2">
        You're on the <strong>{{ user.plan.name }} plan</strong>.
        <div v-if="user.ends_at">
          Your current paid subscription ends on <strong>{{ dateTimeTimeFormatted(user.ends_at) }}</strong>
        </div>
      </p>
      <router-link :to="{ name: 'swap' }" class="text-indigo-500">
        Swap Plan
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment'

export default {
  name: 'account',
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    }),
  },
  methods: {
    dateTimeTimeFormatted(value) {
      if (value) {
        return moment(value).format('MMMM Do YYYY, h:mm:ss a');
      }
    }
  },
}
</script>
