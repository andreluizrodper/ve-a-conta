<template>
  <div class="flex items-center text-lg font-medium gap-2">
    <img
      v-if="!clear"
      src="@/assets/logo.svg"
      class="dark:invert"
      :class="size"
    />
    <img
      v-if="clear"
      src="@/assets/logo-clear.svg"
      class="dark:invert"
      :class="size"
    />
  </div>
</template>

<script>
export default {
  props: {
    clear: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "size-26",
    },
  },
};
</script>
