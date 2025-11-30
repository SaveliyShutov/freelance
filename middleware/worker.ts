export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuth()
  const isAuth = authStore?.user

  if (isAuth) {
    if (authStore.user?.worker_name) {
      return true;
    }
  }
  else {
    abortNavigation();
    return navigateTo('/')
  }
})