export default defineNuxtRouteMiddleware(async () => {
  let authStore = useAuth()
  let isAuth = authStore.user

  if (import.meta.client) {
    const role = localStorage.getItem('currentRole')
    if (role === 'employer') {
      authStore.currentRole = 'employer'
    }
    if (role === 'worker') {
      authStore.currentRole = 'worker'
    }
  }

  if (isAuth && authStore?.user?.employer_name && authStore.currentRole === 'employer') {
    return setPageLayout('employer')
  } else if (isAuth && authStore.user?.worker_name && authStore.currentRole === 'worker') {
    return setPageLayout('worker')
  } else {
    return setPageLayout('default')
  }
})