<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth";

const auth = useAuthStore();

onMounted(() => {
  auth.loadToken();
});
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap");
* {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
}
</style>