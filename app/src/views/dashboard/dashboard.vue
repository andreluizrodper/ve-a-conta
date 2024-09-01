<template>
  <FirstRestaurant v-if="restaurants.empty" />
  <div v-if="!restaurants.empty">
    <RestaurantStatus />
  </div>
</template>

<script>
import FirstRestaurant from "@/components/dashboard/first-restaurant.vue";
import RestaurantStatus from "@/components/dashboard/restaurant-status.vue";

export default {
  components: {
    FirstRestaurant,
    RestaurantStatus,
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    restaurants() {
      return this.$store.state.restaurants;
    },
  },
};
</script>
