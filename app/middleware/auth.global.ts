import { useAuthStore } from "#imports";

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  auth.loadToken();

  if (auth.token && to.path === "/auth/login") {
    return navigateTo("/user/");
  }

  if (!auth.token && to.path !== "/auth/login" && to.path !== "/auth/register") {
    return navigateTo("/auth/login");
  }

  if (to.path.startsWith("/admin")) {
    if (auth.user?.role !== "admin") {
      return navigateTo("/user");
    }
  }
  if (to.path.startsWith("/user")) {
    if (auth.user?.role !== "user") {
      return navigateTo("/admin");
    }
  }
});
