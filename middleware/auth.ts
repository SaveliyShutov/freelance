export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuth()
  const isAuth = authStore?.user

  if (!isAuth) {
    abortNavigation();
    return navigateTo('/')
  }
})