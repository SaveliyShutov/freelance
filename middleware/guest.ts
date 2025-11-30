export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuth()
  const isAuth = authStore?.user

  if (isAuth) {
    if (authStore?.user?.worker_name && authStore?.currentRole == 'worker') {
      abortNavigation();
      return navigateTo('/worker')
    }

    if (authStore?.user?.employer_name && authStore?.currentRole == 'employer') {
      abortNavigation();
      return navigateTo('/employer')
    }
  }
  return true

})