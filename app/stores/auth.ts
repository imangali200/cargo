import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<any | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const data = await $fetch<any>("http://localhost:8080/auth/login", {
        method: "POST",
        body: { email, password },
      });
      if (data.access_token) {
        token.value = data.access_token;
        if (token.value !== null) {
          localStorage.setItem("token", token.value);
        }

        if (token.value !== null) {
          user.value = jwtDecode(token.value);
        }
        return data
      }
    } catch (error) {
        console.log("Login failed:",error)
        throw error
    }
  };
  const loadToken = () => {
    if (process.client) {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          const decoded: any = jwtDecode(savedToken);
          console.log(decoded);
          const now = Date.now() / 1000;
          if (decoded.exp > now) {
            token.value = savedToken;
            user.value = decoded;
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          localStorage.removeItem("token");
        }
      } else {
        token.value = null;
        user.value = null;
      }
    }
  };

  const logOut = () => {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
  };
  return { token, user, login, loadToken, logOut };
});
