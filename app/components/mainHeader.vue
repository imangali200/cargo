<template>
  <header
    class="tw-h-[70px]  tw-flex tw-items-center"
  >
    <div class="tw-flex tw-items-center tw-px-5 md:tw-px-24 tw-justify-between tw-w-full">
      <img
        class="tw-w-[100px] tw-h-[18px] md:tw-w-[140px] md:tw-h-[27px] tw-m-0"
        src="/cargo.png"
        alt=""
      />

      <p @click="drawer = !drawer" class="tw-text-[28px]">&#9776;</p>
    </div>
    <v-app>
      <v-navigation-drawer
        class="tw-relative"
        app
        v-model="drawer"
        temporary
        location="end"
      >
        <p
          @click="drawer = !drawer"
          class="tw-absolute tw-right-3 tw-top-0 tw-z-10 tw-text-[25px] tw-pt-2"
        >
          &#215;
        </p>
        <v-list style="padding-top: 40px">
          <div @click="logOut">
            <v-list-item class="v-list-item">
              <v-list-item-title>Выйты из аккаунта</v-list-item-title>
            </v-list-item>
          </div>

          <v-list-item class="v-list-item">
            <v-list-item-title>Профиль</v-list-item-title>
          </v-list-item>
          <v-list-item class="v-list-item">
            <v-list-item-title>brbale</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </header>
</template>

<script setup>
const drawer = ref(false);
import { useAuthStore } from "#imports";
const auth = useAuthStore();

watch(
  ()=>auth.token,
  (newtoken)=>{
    if(!newtoken){
      navigateTo('/user/login')
    }
  }
)

const logOut = () => {
  auth.logOut()
}
</script>

<style>
.v-list-item:hover {
  color: white;
  background-color: #0fa0cd;
}
</style>