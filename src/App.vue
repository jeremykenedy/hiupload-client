<template>
  <div class="w-full md:w-10/12 lg:w-8/12 mx-auto px-6 mt-6 md:mt-20">
    <AppNav />
    <router-view/>
    <AppToast />
  </div>
</template>

<script>
import AppNav from '@/components/AppNav';
import AppToast from '@/components/AppToast';

export default {
  components: {
    AppNav,
    AppToast,
  }
}
</script>

<style src="./assets/styles/app.css" />
