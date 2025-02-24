export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = !!authStore.user

  if (isAuth) {
    if (authStore.user?.role === 'worker') {
      return true;
    }
  }
  return abortNavigation();
})