<template>
  <div>
    <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800 mb-3">
      Subscription
    </h2>
    <div class="text-sm">
      <p class="mb-2">
        You're on the {{ user.plan.name }} plan.
        <template v-if="user.ends_at">Your current subscription ends on {{ user.ends_at }} </template>
      </p>
      <router-link :to="{ name: 'swap' }" class="text-indigo-500">
        Swap Plan
      </router-link>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: '',
  components: {},
  props: {},
  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    }),
  },
  data () {
    return {
      //
    }
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>
