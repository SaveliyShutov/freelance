export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = authStore?.user

  if (isAuth) {
    if (authStore?.user?.worker_name && authStore.currentRole == 'worker') {
      abortNavigation();
      return navigateTo('/worker/work')
    }

    if (authStore?.user?.employer_name && authStore.currentRole == 'employer') {
      abortNavigation();
      return navigateTo('/employer/work')
    }
  }
  return true

})