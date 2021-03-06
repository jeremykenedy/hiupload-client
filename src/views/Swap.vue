<template>
  <div>
    <form @submit.prevent="submit">
      <div class="mb-6">
        <div
          v-for="plan in plans"
          :key="plan.slug"
          class="flex items-center mb-3"
        >
          <input v-model="form.plan" :value="plan.slug" type="radio" name="plan" :id="`plan_${plan.slug}`" class="mr-3 cursor-pointer">
          <label :for="`plan_${plan.slug}`" class="flex-grow cursor-pointer">
            <AppPlan
              :plan="plan"
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        class="text-white px-4 py-3 leading-none rounded-md font-medium"
        :class="submitting ? 'bg-indigo-300' : 'bg-indigo-500 '"
        :disabled="submitting"
      >
        <span v-if="!submitting">
          Swap
          <i class="fas fa-check fa-fw"></i>
        </span>
        <span v-if="submitting">
          Swapping
          <i class="fas fa-circle-notch fa-spin fa-fw" />
        </span>
      </button>
    </form>
  </div>
</template>

<!-- HERE -->
<!-- https://codecourse.com/watch/build-a-file-sharing-saas-app?part=filtering-available-plans-to-swap-to -->

<script>
import axios from 'axios';
import AppPlan from '@/components/AppPlan';

export default {
  name: 'swap',
  components: { AppPlan },
  props: {},
  computed: {},
  data () {
    return {
      plans: null,
      submitting: false,
      form: {
        plan: null,
      }
    }
  },
  mounted () {
    this.setupPlans();
  },
  methods: {
    async setupPlans () {
      let response = await axios.get('api/plans');
      this.plans = response.data.data;
    },
    async submit () {

    },
  }
}
</script>
