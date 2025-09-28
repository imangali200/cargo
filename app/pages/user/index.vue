<template>
  <div class="tw-pt-5">
    <h1 class="tw-text-[28px] tw-font-medium">Мои товары</h1>
    <div class="tw-flex tw-items-center tw-gap-3 tw-mt-3">
      <div
        class="tw-border-[1px] tw-border-gray tw-flex tw-items-center tw-gap-3 tw-rounded-md tw-h-[40px] tw-max-w-[330px] tw-w-full tw-pl-3"
      >
        <span>&#128269;</span>
        <input
          v-model="search"
          class="tw-outline-none tw-text-[15px]"
          type="text"
          placeholder="Поиск по названию"
        />
      </div>
      <button
      @click="searchBtn"
        class="tw-w-[120px] tw-bg-[#0FA0CD] tw-h-[40px] tw-rounded-md tw-text-white"
      >
        Искать
      </button>
    </div>
    <v-dialog v-model="showDialog" width="400px">
      <v-card
        class="tw-bg-white tw-text-center tw-relative"
        style="padding: 20px 0"
      >
        <span
          @click="showDialog = !showDialog"
          class="tw-text-red-600 tw-text-[28px] tw-absolute tw-right-4 tw-top-0"
          >&#215;</span
        >
        <h1>Добавить трек код</h1>
        <div class="tw-flex tw-flex-col tw-gap-2 tw-mt-3">
          <input
            v-model="productid"
            class="tw-border-[1px] tw-border-black tw-mx-4 tw-rounded-md tw-h-[40px] tw-pl-3 tw-text-[16px]"
            type="text"
            placeholder="Трек код"
          />
          <textarea
            v-model="productName"
            class="tw-border-[1px] tw-border-black tw-mx-4 tw-rounded-md tw-h-[80px] tw-pl-3 tw-text-[14px] tw-py-2"
            placeholder="название продукта"
          ></textarea>
          <p
            class="tw-max-w-[400px] tw-pl-4 tw-w-full tw-text-[#CF1616] tw-text-start tw-text-[14px]"
          >
            {{ productFunctions.errorEmpty }}
          </p>
          <button
            @click="addProduct"
            class="tw-bg-[#0FA0CD] tw-text-white tw-h-[40px] tw-mx-4 tw-rounded-md"
          >
            Create
          </button>
        </div>
      </v-card>
    </v-dialog>
    <div>
      <ProductComponent />
    </div>
    <img
      @click="showDialog = !showDialog"
      class="tw-w-[50px] tw-h-[50px] tw-fixed tw-bottom-7 tw-right-5"
      src="/logoA.png"
      alt=""
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
import ProductComponent from "~/components/product.vue";
import { useAuthStore } from "#imports";
import { useProductStore } from "#imports";
const productFunctions = useProductStore();
const search = ref('')

const auth = useAuthStore();
const token = auth.token;

const showDialog = ref(false);
const productid = ref("");
const productName = ref("");

const addProduct = async () => {
  await productFunctions.addProduct(productName.value, productid.value, token);
  if(!productName.value || !productid.value){
    return
  }
  showDialog.value = false;
  productid.value = "";
  productName.value = "";
};
const searchBtn = async ()=>{
  await productFunctions.searchByName(token,search.value)
}
</script>
<style>
.Vue-Toastification__toast {
  background-color: #0fa0cd;
  color: white;
}
</style>