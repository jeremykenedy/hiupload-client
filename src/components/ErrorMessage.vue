<template>
  <div
    v-if="error"
    class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-4 rounded-lg text-sm relative mb-4" role="alert"
  >
    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <p class="cursor-default mr-4">
      {{ error }}
    </p>
    <span
      @click="clearErrorMessage()"
      class="absolute top-0 bottom-0 right-0 px-4 py-6 cursor-pointer"
    >
      <i class="fas fa-times" style="font-size: 18px;" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'errormessage',
  props: {
    error: { type: String, default: null }
  },
  methods: {
    clearErrorMessage () {
      this.$emit('clearErrorMessage');
    }
  }
}
</script>
