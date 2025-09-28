<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-5 tw-mt-6">
    <div
      class="tw-max-w-[400px] tw-w-full"
      v-for="product in productFunctions.productData"
      :key="product.id"
    >
      <div class="tw-border-[1px] tw-rounded-[20px]">
        <div
          :class="[
            product.moreInfo?.branch
              ? 'tw-bg-red-400'
              : product.moreInfo?.city
              ? 'tw-bg-green-500'
              : product.moreInfo?.abroad
              ? 'tw-bg-blue-500'
              : product.moreInfo?.wareHouseInChina
              ? 'tw-bg-yellow-500'
              : product.moreInfo?.addedByClient
              ? 'tw-bg-gray-400'
              : '',
            'tw-p-2 tw-rounded tw-text-white',
          ]"
          class="tw-flex tw-justify-between tw-items-center tw-rounded-t-[15px] tw-px-3"
        >
          <div>
            <p class="tw-text-[18px] tw-font-[400]">
              {{ product.productid }}
            </p>
            <span class="tw-text-[13px] tw-text-stone-100 tw-font-[400]">{{
              new Date(product.createAt).toLocaleString()
            }}</span>
          </div>
          <div class="tw-flex tw-gap-[10px]">
            <img
              @click="updateProduct(product.id)"
              class="tw-w-[25px] tw-h-[25px] tw-object-contain tw-bg-transparent hover:tw-bg-stone-600 tw-transition-colors tw-duration-500 tw-rounded-lg tw-text-[320px] tw-p-1"
              src="/update.png"
              alt=""
            />
            <img
              @click="removeProduct(product.productid)"
              class="tw-w-[25px] tw-h-[25px] tw-object-contain tw-bg-transparent hover:tw-bg-stone-600 tw-transition-colors tw-duration-500 tw-rounded-lg tw-text-[320px] tw-p-[4px]"
              src="/delete.png"
              alt=""
            />
          </div>
        </div>
        <div class="tw-p-3">
          <p class="tw-text-[20px] tw-font-[400]">
            {{ product.productName }}
          </p>
          <div class="tw-flex tw-flex-col tw-gap-3 tw-mt-2">
            <div class="tw-flex tw-items-center">
              <span v-if="product.moreInfo?.addedByClient">
                <img class="tw-w-[25px] tw-h-[25px]" src="/check.png" alt="" />
              </span>
              <span
                v-else
                class="tw-w-[20px] tw-h-[20px] tw-mr-1 tw-bg-gray-400 tw-inline-block tw-rounded-[50%]"
              >
              </span>
              <div class="tw-ml-4 tw-my-0">
                <p
                  class="tw-text-[14px] tw-font-[400] tw-m-0 tw-text-green-500"
                >
                  Добавлено клиентом
                </p>
                <span v-if="product.createAt" class="tw-text-[11px] tw-m-0">{{
                  new Date(product.createAt).toLocaleString()
                }}</span>
              </div>
            </div>

            <div class="tw-flex tw-items-center">
              <span v-if="product.moreInfo?.wareHouseInChina">
                <img class="tw-w-[25px] tw-h-[25px]" src="/check.png" alt="" />
              </span>
              <span
                v-else
                class="tw-w-[20px] tw-h-[20px] tw-mr-1 tw-bg-gray-400 tw-inline-block tw-rounded-[50%]"
              >
              </span>
              <div class="tw-ml-4">
                <p class="tw-text-[14px] tw-font-[400]">На складе Китай</p>
              </div>
            </div>

            <div class="tw-flex tw-items-center">
              <span v-if="product.moreInfo?.abroad">
                <img class="tw-w-[25px] tw-h-[25px]" src="/check.png" alt="" />
              </span>
              <span
                v-else
                class="tw-w-[20px] tw-h-[20px] tw-mr-1 tw-bg-gray-400 tw-inline-block tw-rounded-[50%]"
              >
              </span>
              <div class="tw-ml-4">
                <p class="tw-text-[14px] tw-font-[400]">Граница</p>
              </div>
            </div>
            <div class="tw-flex tw-items-center">
              <span v-if="product.moreInfo?.city">
                <img class="tw-w-[25px] tw-h-[25px]" src="/check.png" alt="" />
              </span>
              <span
                v-else
                class="tw-w-[20px] tw-h-[20px] tw-mr-1 tw-bg-gray-400 tw-inline-block tw-rounded-[50%]"
              >
              </span>
              <div class="tw-ml-4">
                <p class="tw-text-[14px] tw-font-[400]">Тараз</p>
              </div>
            </div>

            <div class="tw-flex tw-items-center">
              <span v-if="product.moreInfo?.branch">
                <img class="tw-w-[25px] tw-h-[25px]" src="/check.png" alt="" />
              </span>
              <span
                v-else
                class="tw-w-[20px] tw-h-[20px] tw-mr-1 tw-bg-gray-400 tw-inline-block tw-rounded-[50%]"
              >
              </span>
              <div class="tw-ml-4">
                <p class="tw-text-[14px] tw-font-[400]">Филиал</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-dialog v-model="productDialog" width="400px">
        <div
          class="tw-bg-white tw-relative tw-p-5 tw-rounded-[10px] tw-flex tw-items-center tw-gap-2 tw-flex-col"
        >
          <p
            @click="productDialog = !productDialog"
            class="tw-absolute tw-top-5 tw-right-5"
          >
            ❌
          </p>
          <h1 class="tw-font-[400] tw-text-[17px] tw-mb-2">Update product</h1>

          <input
            v-model="productid"
            class="tw-max-w-[450px] tw-w-full tw-h-[50px] tw-border-[1px] tw-border-gray tw-rounded-lg tw-pl-3 tw-text-[15px]"
            type="text"
            placeholder="Трек код"
          />
          <input
            v-model="productName"
            class="tw-max-w-[450px] tw-w-full tw-h-[50px] tw-border-[1px] tw-border-gray tw-rounded-lg tw-pl-3 tw-text-[15px]"
            type="text"
            placeholder="название продукта"
          />
          <p
            class="tw-max-w-[450px] tw-w-full tw-text-[#CF1616] tw-text-start tw-text-[14px]"
          >
            {{ errorEmpty }}
          </p>
          <button
            @click="UpdateData"
            class="tw-bg-[#0FA0CD] tw-max-w-[450px] tw-w-full tw-h-[45px] tw-rounded-lg tw-text-white tw-text-[18px] tw-font-[400]"
          >
            Update
          </button>
        </div>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "#imports";
import { useProductStore } from "#imports";
const auth = useAuthStore();
const productFunctions = useProductStore();
const productData = ref([]);
const token = auth.token;
const productDialog = ref(false);
const productid = ref("");
const productName = ref("");
const selectId = ref();
const errorEmpty = ref("");
onMounted(async () => {
  await productFunctions.getData(token);
});

const removeProduct = async (id) => {
  await productFunctions.removeProduct(id, token);
};
const updateProduct = async (id) => {
  productDialog.value = !productDialog.value;
  selectId.value = id;
};
const UpdateData = async () => {
  if (!productid.value || !productName.value) {
    errorEmpty.value = "Вы должны заполнить всё";
    return;
  }
  productFunctions.updateProduct(
    selectId.value,
    token,
    productid.value,
    productName.value
  );
  productDialog.value = !productDialog.value;
};
</script>

<style lang="scss" scoped>
</style>
