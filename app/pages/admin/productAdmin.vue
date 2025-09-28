<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row tw-gap-5 tw-mt-6">
    <div
      class="tw-max-w-[400px] tw-w-full"
      v-for="product in productFunction.adminProducts"
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
              @click="removeProduct(product.productid)"
              class="tw-w-[25px] tw-h-[25px] tw-object-contain tw-bg-transparent hover:tw-bg-stone-600 tw-transition-colors tw-duration-500 tw-rounded-lg tw-text-[320px] tw-p-[4px]"
              src="/delete.png"
              alt=""
            />
          </div>
        </div>
        <div class="tw-p-3">
          <div class="tw-flex tw-items-center tw-gap-3">
            <p class="tw-text-[20px] tw-font-[400]">
              {{ product.productName }}
            </p>
            <p class="tw-text-[20px] tw-font-[400]">
              ({{ product.user.name }})
            </p>
          </div>

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
              <span
                @click="toggleMoreInfo(product, 'wareHouseInChina')"
                v-if="product.moreInfo?.wareHouseInChina"
              >
                <img class="tw-w-[25px] tw-h-[25px]" src="/check.png" alt="" />
              </span>
              <span
                @click="toggleMoreInfo(product, 'wareHouseInChina')"
                v-else
                class="tw-w-[20px] tw-h-[20px] tw-mr-1 tw-bg-gray-400 tw-inline-block tw-rounded-[50%]"
              >
              </span>
              <div class="tw-ml-4">
                <p class="tw-text-[14px] tw-font-[400]">На складе Китай</p>
              </div>
            </div>

            <div class="tw-flex tw-items-center">
              <span
                @click="toggleMoreInfo(product, 'abroad')"
                v-if="product.moreInfo?.abroad"
              >
                <img class="tw-w-[25px] tw-h-[25px]" src="/check.png" alt="" />
              </span>
              <span
                @click="toggleMoreInfo(product, 'abroad')"
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
                <img
                  @click="toggleMoreInfo(product, 'city')"
                  class="tw-w-[25px] tw-h-[25px]"
                  src="/check.png"
                  alt=""
                />
              </span>
              <span
                @click="toggleMoreInfo(product, 'city')"
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
                <img
                  @click="toggleMoreInfo(product, 'branch')"
                  class="tw-w-[25px] tw-h-[25px]"
                  src="/check.png"
                  alt=""
                />
              </span>
              <span
                @click="toggleMoreInfo(product, 'branch')"
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
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "#imports";
import { useProductStore } from "#imports";
const auth = useAuthStore();
const productFunction = useProductStore();

const productData = ref([]);
const token = auth.token;
console.log(productData.value);
onMounted(async() => {
  await productFunction.GetDataByAdmin(token);
});

const toggleMoreInfo = async (product, key) => {
  product.moreInfo[key] = !product.moreInfo[key];
  const res = await $fetch(
    `http://localhost:8080/admin/product/${product.productid}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: { ...product.moreInfo },
    }
  );
};
const removeProduct = async (id) => {
  await $fetch(`http://localhost:8080/admin/product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
</script>

<style lang="scss" scoped>
</style>
