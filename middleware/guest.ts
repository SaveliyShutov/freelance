export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = !!authStore.user

  if (isAuth) {
    if (authStore?.user?.worker_name || localStorage.getItem('role') == 'worker') {
      abortNavigation();
      return navigateTo('/worker')
    }

    if (authStore?.user?.employer_name || localStorage.getItem('role') == 'employer') {
      abortNavigation();
      return navigateTo('/employer')
    }
  }
  return true

})