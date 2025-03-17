export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = !!authStore.user

  if (isAuth) {
    if (authStore.currentRole === 'worker') {
      abortNavigation();
      return navigateTo('/worker')
    }
  }

  if (isAuth) {
    if (authStore.currentRole === 'employer') {
      abortNavigation();
      return navigateTo('/employer')
    }
  }
  return true

})