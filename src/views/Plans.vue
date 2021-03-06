<template>
  <div>
    <router-link
      :to="{ name: 'checkout', query: { plan: plan.slug } }"
      v-for="plan in buyablePlans" :key="plan.slug"
    >
      <AppPlan
        :plan="plan"
        class="mb-3"
      />
    </router-link>

  </div>
</template>

<script>
import axios from 'axios';
import AppPlan from '@/components/AppPlan';

export default {
  name: 'plans',
  components: { AppPlan },
  props: {},
  computed: {
    buyablePlans () {
      return this.plans.filter(p => !p.free);
    },
  },
  data () {
    return {
      plans: [],
    }
  },
  created () {},
  mounted () {
    this.setupPlan();
  },
  methods: {
    async setupPlan () {
      let response = await axios.get('api/plans');
      this.plans = response.data.data;
    }
  }
}
</script>
