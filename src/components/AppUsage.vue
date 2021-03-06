<template>
  <div class="inline-block text-xs font-medium text-gray-800 text-center bg-gray-200 rounded-lg py-1 px-2">
    <span v-if="!loading">
      Usage: {{ usageFormatted }} / {{ storageFormatted }} ({{ percentageUsed }}%)
    </span>
    <span v-if="loading" >
      <i class="fas fa-circle-notch fa-spin" />
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import filesize from 'filesize';

export default {
  name: 'appusage',
  data () {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      usage: 'usage/usage',
      user: 'auth/user',
    }),
    usageFormatted () {
      return filesize(this.usage);
    },
    storageFormatted () {
      return filesize(this.user.plan.storage);
    },
    percentageUsed () {
      return ((this.usage / this.user.plan.storage) * 100).toFixed(2);
    },
  },
  mounted () {
    this.getUsage().then((response) => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions({
      getUsage: 'usage/getUsage',
    }),
  },
}

</script>
