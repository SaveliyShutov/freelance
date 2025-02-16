export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  // let isAuth = await authStore.checkAuth()

  // if (isAuth) {
  if (authStore.user?.role === 'worker') {
    abortNavigation();
    return navigateTo('/worker')
  }
  // }

  // if (isAuth) {
  if (authStore.user?.role === 'employer') {
    abortNavigation();
    return navigateTo('/employer')
  }
  // }

  return true

})