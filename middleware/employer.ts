export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = !!authStore.user

  if (isAuth) {
    if (authStore.user?.role === 'employer') {
      return true;
    }
  }
  return abortNavigation();
})