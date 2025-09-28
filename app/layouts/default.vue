<template>
  <div>
    <mainHeader />
    <div class="tw-px-5 md:tw-px-24">
      <slot />
    </div>
  </div>
</template>

<script setup>
import mainHeader from "~/components/mainHeader.vue";
</script>
