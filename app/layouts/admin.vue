<template>
  <div>
    <adminHeaders />
    <div class="tw-px-5 md:tw-px-24">
      <slot />
    </div>
  </div>
</template>

<script setup>
import adminHeaders from "~/components/adminHeaders.vue";
</script>