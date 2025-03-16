export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = !!authStore.user

  if (!isAuth ) {
    abortNavigation();
    return navigateTo('/')
  }
  if (!authStore.currentRole) {
    abortNavigation();
    return navigateTo('/')
  }
})