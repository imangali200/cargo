<template>
  <div
    class="tw-flex tw-items-center tw-justify-center tw-h-[90vh]  tw-px-[15px]"
  >
    <div
      class="loginContainer tw-max-w-[700px] tw-h-full tw-max-h-[520px] tw-w-full tw-rounded-[15px] tw-flex tw-items-center tw-justify-center"
    >
      <div
        class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-w-full tw-px-[15px] tw-py-[30px]"
      >
        <h1 class="tw-text-[37px] tw-font-semibold">Регистрация</h1>
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
          v-model="name"
          class="tw-max-w-[450px] tw-w-full tw-h-[50px] tw-border-[1px] tw-border-gray tw-rounded-lg tw-pl-3 tw-text-[15px]"
          type="text"
          placeholder="Введите имя"
        />
        <input
          v-model="phoneNumber"
          class="tw-max-w-[450px] tw-w-full tw-h-[50px] tw-border-[1px] tw-border-gray tw-rounded-lg tw-pl-3 tw-text-[15px]"
          type="text"
          placeholder="Введите номер телефона"
        />
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
          @click="registerButton"
          class="tw-bg-[#0FA0CD] tw-max-w-[450px] tw-w-full tw-h-[50px] tw-rounded-lg tw-text-white tw-text-[18px] tw-font-semibold"
        >
          Зарегистрироваться
        </button>
        <p class="word tw-font-[400]">
          Уже есть аккаунт?
          <nuxt-link class="tw-text-[#0FA0CD] tw-font-[600]" to="/user/login"
            >Войти</nuxt-link
          >
        </p>
      </div>
    </div>
    <v-dialog v-model="showSuccess" width="420px">
      <div
        class="tw-bg-white tw-w-full tw-rounded-lg tw-py-[50px] tw-flex tw-items-center tw-flex-col tw-gap-5"
      >
        <img class="tw-w-[60px] tw-h-[60px]" src="/correct.png" alt="" />
        <h1 class="tw-text-[18px]">Регистрация прошла успешно!</h1>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

const email = ref("");
const name = ref("");
const phoneNumber = ref("");
const password = ref("");
const showSuccess = ref(false);
const errorEmpty = ref("");
const emailError = ref("");

const emailCheck = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const phoneCheck = /^\+7\d{10}$/;
const registerButton = async () => {
  try {
    if (!email.value || !password.value || !name.value || !password.value) {
      errorEmpty.value = "Вы должны заполнить все поля";
      return;
    }
    if (!emailCheck.test(email.value)) {
      emailError.value = "Email должен быть в формате @gmail.com";
      return;
    }
    if (!phoneCheck.test(phoneNumber.value)) {
      emailError.value = "Номер должен начинаться с +7";
      return;
    }
    if(password.value.length < 7){
      errorEmpty.value = 'Пароль должен быть больше 7 символов'
      return
    }

    const data = await $fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: {
        email: email.value,
        name: name.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      },
    });

    if (data.statusCode === 201) {
      showSuccess.value = true;
      setTimeout(() => {
        navigateTo("/auth/login");
      }, 2000);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
</style>