export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = authStore.user

  if (isAuth) {
    if (authStore.user?.worker_name) {
      return true;
    }
    if (localStorage.getItem('role') == 'worker') {
      return true;
    }
  }
  return abortNavigation();
})