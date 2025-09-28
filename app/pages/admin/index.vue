<template>
  <div class="tw-flex tw-items-center tw-gap-3 tw-mt-5">
    <div
      class="tw-border-[1px] tw-border-gray tw-flex tw-items-center tw-gap-3 tw-rounded-md tw-h-[40px] tw-max-w-[330px] tw-w-full tw-pl-3"
    >
      <span>&#128269;</span>
      <input
        v-model="searchAdmin"
        class="tw-outline-none tw-text-[15px]"
        type="text"
        placeholder="Поиск по названию"
      />
    </div>
    <button
      @click="searchAdminBtn"
      class="tw-w-[120px] tw-bg-[#0FA0CD] tw-h-[40px] tw-rounded-md tw-text-white"
    >
      Искать
    </button>
  </div>
  <productAdmin />
  <div></div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

import { useAuthStore } from "#imports";
import { watch } from "vue";
import { useRouter } from "vue-router";
import productAdmin from "./productAdmin.vue";
import { useProductStore } from "#imports";


const auth = useAuthStore();
const productFunction = useProductStore()
const router = useRouter();
const searchAdmin = ref('')
const token = auth.token

const searchAdminBtn = async()=>{
  await productFunction.searchProductAdmin(token,searchAdmin.value)
}

watch(
  () => auth.token,
  (newToken) => {
    if (!newToken) {
      router.push("/login");
    }
  }
);
</script>
