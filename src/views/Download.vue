<template>
  <div class="p-12 rounded-lg bg-gray-200 text-center">
    <h1
      v-if="!error && loaded && file && meta"
      class="text-3xl font-medium text-gray-700 mb-2"
    >
      {{ file.name }}
    </h1>
    <p
      v-if="!error && loaded && file && meta"
      class="mb-3 text-sm text-gray-600"
    >
      {{ fileSizeFormatted }}
    </p>
    <AppButton
      v-if="!error && loaded && file && meta"
      :loading="submitting"
      :text="error ? 'File Unavailable' : ((submitting ? 'Downloading File' : 'Download File'))"
      :icon="error ? 'fas fa-ban' : (submitting ? 'fas fa-circle-notch fa-spin' : 'fas fa-download')"
      :disabled="error"
      @click="downloadFile"
    />
    <p
      v-if="(error && loaded) || !file || !meta"
      class="text-sm text-center text-gray-800 mb-5 mt-5"
    >
      Sorry, this file is not available.
    </p>
    <div v-if="!loaded">
      <i class="fas fa-circle-notch fa-spin fa-4x text-gray-500 mt-3 mb-3"></i>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import filesize from 'filesize';
import { mapActions } from 'vuex';

export default {
  name: 'download',
  components: {},
  props: {
    uuid: { type: String, required: true },
    token: { type: String, required: true },
  },
  computed: {
    fileSizeFormatted () {
      return filesize(this.file.size);
    },
  },
  data () {
    return {
      loaded: false,
      submitting: false,
      error: false,
      file: null,
      meta: null,
    }
  },
  mounted () {
    this.getFile();
  },
  methods: {
    ...mapActions({
      popToast: 'toast/popToast',
    }),
    async getFile () {
      this.loaded = false
      try {
        let response = await axios.get(`api/files/${this.uuid}/link?token=${this.token}`);
        this.file = response.data.data;
        this.meta = response.data.meta;
        this.loaded = true;
        this.error = false;
      } catch (e) {
        this.loaded = true;
        this.error = true;
      }
    },
    downloadFile () {
      let dummy = document.createElement('a');
      // dummy.style.opacity = '0';
      dummy.href = this.meta.url;
      document.body.appendChild(dummy);
      dummy.click();
      document.body.removeChild(dummy);
      this.popToast({
        message: `File Downloaded`,
        timer: 5000,
      });
    },
  },
}
</script>
