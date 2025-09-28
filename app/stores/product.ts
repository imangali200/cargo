import { defineStore } from "pinia";
import { useToast, POSITION } from "vue-toastification";

export const useProductStore = defineStore("product", () => {
  const productData = ref<any>([]);
  const toast = useToast();
  const errorEmpty = ref<string>("");
  const adminProducts = ref<any>([]);

  async function getData(token: string) {
    const products = await $fetch("http://localhost:8080/user/getProducts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    productData.value = products;
    console.log(productData.value);
  }

  async function searchByName(token: string, productName: string) {
    if (productName.length === 0) {
      await getData(token);
    }
    const datas = await $fetch(`http://localhost:8080/user/${productName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    productData.value = datas;

    console.log(productData.value);
  }
  async function addProduct(
    productName: string,
    productid: string,
    token: string
  ) {
    try {
      if (!productName || !productid) {
        errorEmpty.value = "Вы должны заполнить все пустые поля";
        return;
      }

      await $fetch("http://localhost:8080/user/createProduct", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          productid,
          productName,
        },
      });

      toast.success("create successfully", {
        position: POSITION.TOP_CENTER,
      });
      await getData(token);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProduct(id: string, token: string) {
    const res = await fetch(`http://localhost:8080/user/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await getData(token);
  }
  async function updateProduct(
    id: number,
    token: string,
    productid: string,
    productName: string
  ) {
    const res = await fetch(`http://localhost:8080/user/product/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productid: productid,
        productName: productName,
      }),
    });
    await getData(token);
  }
  const GetDataByAdmin = async(token: string) => {
    const res = await $fetch("http://localhost:8080/admin/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    adminProducts.value = res
    
  };
  const searchProductAdmin = async (token: string, name: string) => {
    const res = await $fetch(`http://localhost:8080/admin/search/${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    adminProducts.value = res;
    console.log(adminProducts.value)
  };
  return {
    getData,
    addProduct,
    productData,
    errorEmpty,
    removeProduct,
    searchByName,
    updateProduct,
    searchProductAdmin,
    adminProducts,
    GetDataByAdmin
  };
});
