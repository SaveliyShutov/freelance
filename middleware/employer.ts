export default defineNuxtRouteMiddleware(async (to, from) => {
  let authStore = useAuth()
  let isAuth = authStore?.user

  if (isAuth) {
    if (authStore?.user?.employer_name) {
      return true;
    }
  } else {
    abortNavigation();
    return navigateTo('/')
  }
})