export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuth()
  const isAuth = authStore?.user

  const roleCookie = useCookie('currentRole')
  authStore.currentRole = roleCookie?.value || 'default'

  if (isAuth && authStore?.user?.employer_name && authStore?.currentRole === 'employer') {
    return setPageLayout('employer')
  } else if (isAuth && authStore.user?.worker_name && authStore?.currentRole === 'worker') {
    return setPageLayout('worker')
  } else {
    return setPageLayout('default')
  }
})