export default defineNuxtRouteMiddleware(async () => {
  let authStore = useAuth()
  let isAuth = !!authStore.user

  if (isAuth && authStore?.user?.employer_name) {
    return setPageLayout('employer')
  } else if (isAuth && authStore.user?.worker_name) {
    return setPageLayout('worker')
  } else {
    return setPageLayout('default')
  }
})