<template>
  <div>
    <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800 mb-3">
      Subscription
    </h2>
    <div class="text-sm">
      <p class="mb-2">
        You're on the <strong>{{ user.plan.name }} plan</strong>
        <br>
        ({{ planPrice(user.plan.price) }} - {{ storageFormatted(user.plan.storage) }}).
      </p>
      <p
        v-if="user.ends_at && user.oldPlan"
        class="mb-2 mt-4"
      >
        Your expiring previous plan ends on <strong>{{ dateTimeTimeFormatted(user.ends_at) }}</strong>
      </p>
      <p
        v-if="user.ends_at && user.oldPlan"
        class="mb-2 mt-4"
      >
        Expiring previous plan: <strong>{{ user.oldPlan.name }}</strong>
        <br>
        ({{ planPrice(user.oldPlan.price) }} - {{ storageFormatted(user.oldPlan.storage) }})
      </p>
      <AppButton
        v-if="!user.subscribed"
        text="Upgrade Plan"
        icon="fas fa-thumbs-up fa-fw ml-1"
        class="mt-4"
        @click="$router.replace({ name: 'plans' });"
      />
      <AppButton
        v-if="user.subscribed"
        text="Change Plan"
        icon="fas fa-exchange-alt fa-fw ml-1"
        class="mt-4"
        @click="$router.replace({ name: 'swap' });"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment'
import filesize from 'filesize';

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
    },
    storageFormatted (size) {
      return filesize(size);
    },
    planPrice(price) {
      return `$${parseInt(price, 10) / 100} / month`;
    },
  },
}
</script>
