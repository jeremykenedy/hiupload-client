<template>
  <div>
    <input type="file" name="" id="file" ref="file" class="filepond" multiple>
  </div>
</template>

<script>
import * as FilePond from 'filepond';
import axios from 'axios';

export default {
  name: 'appuploader',
  mounted() {
    const pond = FilePond.create(this.$refs.file, {
      allowRevert: false,
      server: {
        process: (fieldName, file, metadata, load, error, progress, abort) => {
          this.$emit('validation', null);
          let form = new FormData();
          const cancelTokenSource = axios.CancelToken.source();
          axios.post('/api/files/signed', {
            name: metadata.fileInfo.name,
            extension: metadata.fileInfo.extension,
            size: metadata.fileInfo.size,
          }).then((response) => {
            file.additionalData = response.data.additionalData;
            for (var field in file.additionalData) {
              form.append(field, file.additionalData[field]);
            }
            form.append('file', file);
            axios.post(response.data.attributes.action, form, {
              onUploadProgress (e) {
                progress(e.lengthComputable, e.loaded, e.total);
              },
              cancelToken: cancelTokenSource.token
            }).then(() => {
              load(`${file.additionalData.key}`);
            })
          }).catch((e) => {
            if (e.response.status === 422) {
              this.$emit('validation', e.response.data.errors);
            }
            abort();
          });
          return {
            abort: () => {
              cancelTokenSource.cancel();
              abort();
            }
          };
        }
      },
      onprocessfile: (error, file) => {
        this.$emit('validation', null);
        if (error) {
          return;
        }
        pond.removeFile(file);
        this.$emit('onprocessfile', file);
      },
      onaddfile: (error, file) => {
        this.$emit('validation', null);
        if (error) {
          return;
        }
        file.setMetadata('fileInfo', {
          name: file.filenameWithoutExtension,
          extension: file.fileExtension,
          size: file.fileSize
        });
      }
    });
  },
}
</script>
