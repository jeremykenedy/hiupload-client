<template>
  <div
    class="border-2 rounded-lg px-6 py-4 flex items-center justify-between"
    :class="enabled ? 'border-gray-200' : 'bg-gray-100 border-gray-100 cursor-default'"
  >
    <div class="flex items-center">
      <span v-if="currentPlan">
        <i class="far fa-check-circle fa-fw mr-2 text-gray-400" />
      </span>
      <h2
        class="font-bold text-lg mr-4 "
        :class="enabled ? 'text-indigo-500' : 'text-gray-400'"
      >
        {{ plan.name }}
      </h2>
      <span
        class="text-sm mr-1"
        :class="enabled ? 'text-gray-800' : 'text-gray-400'"
      >
        {{ storageFormatted }}
      </span>
      <span
        v-if="currentPlan"
        class="text-xs text-gray-400"
      >
        (current)
      </span>
    </div>
    <span
      class="font-medium"
      :class="enabled ? 'text-black-800' : 'text-gray-400'"
    >
      ${{ parseInt(plan.price, 10) / 100 }} / month
    </span>
  </div>
</template>

<script>
import filesize from 'filesize';

export default {
  name: 'appplan',
  components: {},
  props: {
    plan: { type: Object, required: true },
    enabled: { type: Boolean, default: true },
    currentPlan: { type: Boolean, default: false },
  },
  computed: {
    storageFormatted () {
      return filesize(this.plan.storage);
    },
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
