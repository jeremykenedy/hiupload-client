<template>
  <button
    class="px-4 py-3 leading-none rounded-md font-medium"
    :class="loading || disabled ? 'opacity-50 '+btnClass+' '+btnColor : btnClass+' '+btnColor"
    :disabled="loading || disabled"
  >
    {{ text }}
    <i
      v-if="icon"
      class="fa-fw"
      :class="icon"
    />
  </button>
</template>

<script>
export default {
  name: 'appbutton',
  components: {},
  props: {
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    text: { type: String, required: true },
    icon: { type: String, required: true },
    btnClass: { type: String, default: 'bg-indigo-500' },
    btnColor: { type: String, default: 'text-white' },
  },
}
</script>
