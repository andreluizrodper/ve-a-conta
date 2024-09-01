<template>
  <div class="flex justify-between">
    <div class="flex gap-4 items-center">
      <div class="flex items-center justify-center size-4">
        <span v-if="isOpen" class="size-2 bg-green-600 rounded-full"></span>
        <span v-if="!isOpen" class="size-2 bg-red-600 rounded-full"></span>
      </div>
      <p class="text-xl">{{ restaurant.name }}</p>
    </div>
    <Button :variant="isOpen ? 'red' : 'green'" @click="toggleStatus">
      {{ isOpen ? "Fechar casa" : "Abrir casa" }}</Button
    >
  </div>
</template>

<script>
import { Button } from "@/components/ui/button";
import { restaurantSetOpen, restaurantSetClosed } from "@/utils/restaurant";
export default {
  components: {
    Button,
  },
  computed: {
    restaurant() {
      return this.$store.state.restaurant;
    },
    isOpen() {
      return this.restaurant.isOpen;
    },
  },
  methods: {
    toggleStatus() {
      this.$store.commit("setDialog", {
        title: this.isOpen ? "Quer fechar casa?" : "Quer abrir casa?",
        description: this.isOpen
          ? "Isso já vai gerar o fechamento do dia."
          : "",
        action: this.doToggleStatus,
      });
    },
    doToggleStatus() {
      if (this.isOpen) {
        restaurantSetClosed();
        this.$store.commit("setRestaurant", {
          ...this.restaurant,
          isOpen: false,
        });
      } else {
        restaurantSetOpen();
        this.$store.commit("setRestaurant", {
          ...this.restaurant,
          isOpen: true,
        });
      }
      this.$store.commit("setRestaurants", [
        ...new Set(...this.$store.state.restaurants, this.restaurant),
      ]);
    },
  },
};
</script>
