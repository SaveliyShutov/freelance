export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  // let isAuth = await authStore.checkAuth()

  // if (isAuth) {
    if (authStore.user?.role === 'worker') {
      return true;
    }
  // }
  return abortNavigation();
})