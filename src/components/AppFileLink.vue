<template>
  <div>
    <a
      class="inline-block text-sm p-3 text-indigo-500 font-medium"
      @click.prevent="getLink"
      content="Click to copy to clipboard"
      v-tippy="{ placement : 'left' }"
    >
      Get Sharable Link
    </a>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'appfilelink',
  props: {
    file: { type: Object, required: true },
  },
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    async getLink () {
      let response = await axios.post(`api/files/${this.file.uuid}/link`);
      this.copyToClipboard(response.data.data.url);
    },
    copyToClipboard (value) {
      let dummy = document.createElement('input');
      dummy.value = value;
      dummy.style.opacity = '0';
      document.body.appendChild(dummy);
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      this.popToast({
        message: `Link copied to clipboard`,
        timer: 5000,
      });
    },
  }
}
</script>
