<template>
  <div class="flex flex-col">
    <NameDialog v-if="!hasName" />
    <NavBar />
    <div v-if="account" class="p-4">
      <RouterView />
    </div>
    <Dialog />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import NavBar from "@/components/dashboard/ui/nav-bar.vue";
import Dialog from "@/components/ui/dialog.vue";
import { getUserRestaurants } from "@/utils/restaurant";
import NameDialog from "@/components/dashboard/name-dialog.vue";

export default {
  components: {
    RouterView,
    NavBar,
    Dialog,
    NameDialog,
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    hasName() {
      return this.account.name.length > 0;
    },
  },
  async mounted() {
    const restaurants = await getUserRestaurants();
    this.$store.commit("setRestaurants", restaurants);
    this.$store.commit("setRestaurant", restaurants[0]);
  },
};
</script>
