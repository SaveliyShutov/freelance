export default defineNuxtRouteMiddleware(async () => {
  let authStore = useAuth()
  let isAuth = !!authStore.user

  if (isAuth && authStore.user?.role == 'employer') {
    return setPageLayout('employer')
  } else if (isAuth && authStore.user?.role == 'worker') {
    return setPageLayout('worker')
  } else {
    return setPageLayout('default')
  }
})