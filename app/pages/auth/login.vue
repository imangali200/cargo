<template>
  <div
    class="tw-flex tw-items-center tw-justify-center tw-h-[90vh] tw-px-[15px]"
  >
    <div
      class="loginContainer tw-max-w-[700px] tw-h-[400px] md:tw-h-[500px] tw-w-full tw-rounded-[15px] tw-flex tw-items-center tw-justify-center"
    >
      <div
        class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-w-full tw-px-[15px]"
      >
        <h1 class="tw-text-[37px] tw-font-semibold">Войти</h1>
        <input
          v-model="email"
          class="tw-max-w-[450px] tw-w-full tw-h-[50px] tw-border-[1px] tw-border-gray tw-rounded-lg tw-pl-3 tw-text-[15px]"
          type="text"
          placeholder="name.@example.com"
        />
        <p
          class="tw-max-w-[450px] tw-w-full tw-text-[#CF1616] tw-text-start tw-text-[14px]"
        >
          {{ emailError }}
        </p>
        <input
          v-model="password"
          class="tw-max-w-[450px] tw-w-full tw-h-[50px] tw-border-[1px] tw-border-gray tw-rounded-lg tw-pl-3 tw-text-[15px]"
          type="text"
          placeholder="Введите пароль"
        />
        <p
          class="tw-max-w-[450px] tw-w-full tw-text-[#CF1616] tw-text-start tw-text-[14px]"
        >
          {{ errorEmpty }}
        </p>
        <button
          @click="handleLogin"
          class="tw-bg-[#0FA0CD] tw-max-w-[450px] tw-w-full tw-h-[50px] tw-rounded-lg tw-text-white tw-text-[18px] tw-font-semibold"
        >
          Войти
        </button>
        <p class="word tw-font-[400]">
          Нет аккаунта?
          <nuxt-link class="tw-text-[#0FA0CD] tw-font-[600]" to="/auth/register"
            >Регистрация</nuxt-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: "login",
  layout: "auth",
});
import { useAuthStore } from "~/stores/auth";
const email = ref("");
const password = ref("");
const auth = useAuthStore();
const errorEmpty = ref("");
const emailError = ref("");

const emailCheck = /^[a-zA-Z0-9.%+-_]+gmail\.com$/;


const handleLogin = async () => {
  try {
    if (!email.value || !password.value) {
      errorEmpty.value = "Введите email и пароль";
      return;
    }
    if (!emailCheck.test(email.value)) {
      emailError.value = "Email должен быть в формате @gmail.com";
      return;
    }
    if (password.value.length < 7) {
      errorEmpty.value = "Пароль должен быть больше 7 символов";
      return;
    }
    errorEmpty.value = "";
    emailError.value = "";
    await auth.login(email.value, password.value);

    if (auth.token) {
      navigateTo("/user/");
    }
  } catch (error) {
    if (error.statusCode === 400) {
      emailError.value = "Ваш email неправильный";
    } else if (error.statusCode === 401) {
      errorEmpty.value = "Ваш пароль неправильный";
    }
  }
};
</script>
<style>
.loginContainer {
  box-shadow: 0 10px 20px 1px rgba(0, 0, 0, 0.4);
}
</style>