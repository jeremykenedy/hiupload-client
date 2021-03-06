<template>
    <AppFile v-for="file in files" :key="file.uuid" :file="file" />
</template>

<script>
import AppFile from '@/components/AppFile';

export default {
  name: 'appfiles',
  components: { AppFile },
  props: {
    files: { type: Array, required: true }
  },
}
</script>
