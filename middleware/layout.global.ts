export default defineNuxtRouteMiddleware(async () => {
  let authStore = useAuth()
  let isAuth = authStore?.user

  const roleCookie = useCookie('currentRole')
  authStore.currentRole = roleCookie.value || 'default'

  if (isAuth && authStore?.user?.employer_name && authStore.currentRole === 'employer') {
    return setPageLayout('employer')
  } else if (isAuth && authStore.user?.worker_name && authStore.currentRole === 'worker') {
    return setPageLayout('worker')
  } else {
    return setPageLayout('default')
  }
})