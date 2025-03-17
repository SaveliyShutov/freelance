export default defineNuxtRouteMiddleware(async () => {
  let authStore = useAuth()
  let isAuth = !!authStore.user

  if (isAuth && authStore.currentRole == 'employer') {
    return setPageLayout('employer')
  } else if (isAuth && authStore.currentRole == 'worker') {
    return setPageLayout('worker')
  } else {
    return setPageLayout('default')
  }
})