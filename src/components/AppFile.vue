<template>
  <div class="flex items-center justify-between border-b-2 border-gray-100">
    <div class="text-sm truncate overflow-ellipsis w-6/12">
      {{ file.name }}
    </div>
    <div class="-mr-3 flex items-center">
      <a href="" class="inline-block text-sm p-3 text-indigo-500 font-medium">
        Get Sharable Link
      </a>
      <a class="inline-block text-sm p-3 text-pink-500 font-medium" @click.prevent="deleteFile(file.name)">
        Delete
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'appfile',
  props: {
    file: { type: Object, required: true }
  },
  methods: {
    ...mapActions({
      deleteFileAction: 'files/deleteFile',
      popToast: 'toast/popToast',
    }),
    ...mapMutations({
      addFile: 'files/ADD_FILE',
      decrementUsage: 'usage/DECREMENT_USAGE',
    }),
    async deleteFile (name) {
      const self = this;
      await self.$swal({
          title: 'Confirm File Delete',
          html: `Really Delete the file: <strong>${name}</strong>?`,
          type: "warning",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Confirm',
          confirmButtonColor: '#FF0000',
          showClass: {
            popup: '',
          },
          hideClass: {
            popup: '',
          },
      }).then((result) => {
        if (result.value) {
          self.deleteFileAction(self.file.uuid).then(() => {
            self.decrementUsage(self.file.size);
            self.popToast({ message: 'File Deleted Successfully' });
          });
        }
      });
    }
  },
}
</script>
