<template>
  <div class="w-full md:w-8/12 lg:w-6/12 mx-auto px-6 mt-6 md:mt-20">
    <app-nav />
    <router-view/>
  </div>
</template>

<script>
import AppNav from '@/components/AppNav';
export default {
  components: {
    AppNav
  }
}
</script>

<style src="./assets/styles/app.css" />
