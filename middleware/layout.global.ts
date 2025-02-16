export default defineNuxtRouteMiddleware(async () => {
  let authStore = useAuth()
  // let isAuth = await authStore.checkAuth()

  // if (isAuth && authStore.user?.roles[0] == 'employer') {
  //   return setPageLayout('employer')
  // } else if (isAuth && authStore.user?.roles[0] == 'worker') {
  //   return setPageLayout('worker')
  // } else {
  //   return setPageLayout('default')
  // }

  if (authStore.user?.role == 'employer') {
    return setPageLayout('employer')
  } else if (authStore.user?.role == 'worker') {
    return setPageLayout('worker')
  } else {
    return setPageLayout('default')
  }

})