<template>
  <div>
    <form @submit.prevent="submit">
      <div class="mb-6">
        <div
          v-for="plan in plans"
          :key="plan.slug"
          class="flex items-center mb-3"
        >
          <input
            v-if="canSelectPlan(plan)"
            v-model="form.plan"
            :value="plan.slug"
            :id="`plan_${plan.slug}`"
            type="radio"
            name="plan"
            class="mr-3 cursor-pointer"
          >
          <label
            :for="`plan_${plan.slug}`"
            class="flex-grow cursor-pointer"
          >
            <AppPlan
              :plan="plan"
              :enabled="canSelectPlan(plan)"
              :current-plan="currentPlan(plan)"
            />
          </label>
        </div>
      </div>
      <AppButton
        v-if="availablePlans.length > 0"
        :loading="submitting || !selectedPlan"
        :text="submitting ? 'Swapping' : 'Swap'"
        :icon="submitting ? 'fas fa-circle-notch fa-spin' : 'fas fa-check'"
        :disabled="!selectedPlan"
        type="submit"
      />
      <p
        v-if="availablePlans.length <= 0"
        class="bg-gray-100 rounded-lg p-3 text-gray-800 text-sm"
      >
        There are no availabled plans for you to swap to right now. becuase you're using too much storage.
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import AppPlan from '@/components/AppPlan';
import AppButton from '@/components/AppButton';
import { mapActions, mapGetters } from 'vuex';
import filesize from 'filesize';

export default {
  name: 'swap',
  components: { AppButton, AppPlan },
  props: {},
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
    availablePlans () {
      return this.plans.filter(p => p.slug !== this.user.plan.slug && this.planAvailability[p.slug]);
    },
    selectedPlan () {
      return this.plans.find(p => p.slug === this.form.plan);
    }
  },
  data () {
    return {
      plans: [],
      planAvailability: [],
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
    ...mapActions({
      me: 'auth/me',
      popToast: 'toast/popToast',
    }),
    canSelectPlan (plan) {
      if (this.availablePlans.find(p => p.slug === plan.slug)) {
        return true;
      }
      return false;
    },
    currentPlan (plan) {
      if (this.user.plan.slug == plan.slug) {
        return true;
      }
      return false;
    },
    async setupPlans () {
      let response = await axios.get('api/plans');
      this.plans = response.data.data;

      let planAvailability = await axios.get('api/user/plan/availability');
      this.planAvailability = planAvailability.data.data;
    },
    async submit () {
      const self = this;
      let oldPlan = self.user.plan;
      let newPlan = self.selectedPlan;
      await self.$swal({
          title: 'Confirm Plan Change',
          html: `Are you sure you want to change to the plan the following plan?
            <br>
            <br>
            <strong>${newPlan.name}</strong>
            <br>
            $${ parseInt(newPlan.price, 10) / 100 } / month / ${filesize(newPlan.storage)}
            <br>
            <br>
          `,
          icon: 'question',
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
          self.submitting = true;
          axios.patch('api/subscriptions', self.form).then(() => {
            self.me().then(() => {
              self.submitting = false;
              self.form.plan = null;
              self.popToast({
                message: `Plan successfully swapped from ${oldPlan.name} to ${newPlan.name}`,
                timer: 5000,
              });
              self.$router.replace({ name: 'account' });
            })
          });
        }
      });
    },
  }
}
</script>
