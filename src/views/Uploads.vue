<template>
  <div>
    <ErrorMessage
      v-if="errors && errors.size && errors.size.length > 0"
      :error='errors.size[0]'
      @clearErrorMessage="clearErrors"
    />
    <div class="mb-8">
        <AppUploader @onprocessfile="storeFile" @validation="setValidationErrors" />
    </div>
    <div>
      <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800">Your files</h2>
    </div>
    <template v-if="files.length > 0">
      <AppFiles :files="files" />
    </template>
    <p v-if="files.length <= 0" class="mt-3 text-sm text-gray-800">There are no files here right now.</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import AppFiles from '@/components/AppFiles';
import AppUploader from '@/components/AppUploader';
import ErrorMessage from '@/components/ErrorMessage';

export default {
  name: 'uploads',
  components: {
    AppFiles,
    AppUploader,
    ErrorMessage,
  },
  computed: {
    ...mapGetters({
      files: 'files/files',
    }),
  },
  data () {
    return {
      errors: null,
    }
  },
  mounted() {
    this.getFiles();
  },
  methods: {
    ...mapActions({
      getFiles: 'files/getFiles',
    }),
    ...mapMutations({
      addFile: 'files/ADD_FILE',
      incrementUsage: 'usage/INCREMENT_USAGE',
    }),
    async storeFile (file) {
      let response = await axios.post('/api/files', {
        name: file.filename,
        size: file.fileSize,
        path: file.serverId
      });
      this.addFile(response.data.data);
      this.incrementUsage(file.fileSize);
    },
    async setValidationErrors (errors) {
      this.errors = errors;
    },
    clearErrors () {
      this.errors = null;
    }
  },
}
</script>
