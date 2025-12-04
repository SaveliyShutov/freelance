import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const route = useRoute()

  const apiFetch = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include',

    onRequest({ options }) {
      const token = useCookie('token').value
      if (token) {
        options.headers = options.headers || {}
        if (typeof options.headers === 'object' && !Array.isArray(options.headers)) {
          (options.headers as Record<string, any>).Authorization = `Bearer ${token}`
        }
      }
    },

    onResponse({ response }) {
      if (!response.ok) {
        return
      }
      const maybe = response._data
      if (maybe && typeof maybe === 'object' && 'message' in maybe) {
        const msg = (maybe as { message?: string }).message
        if (msg) {
          toast(msg, { type: 'success', autoClose: 1500 })
        }
      }
    },

    onResponseError({ response, error }) {
      const status = response?.status
      const data = (response as any)?._data
      const msg = data?.message || 'Ошибка'

      if (status === 400) {
        toast(msg, { type: 'error', autoClose: 2000 })
      }
      else if (status === 429) {
        toast('Слишком много запросов. Повторите позже.', { type: 'error', autoClose: 2000 })
      }
      else if (status === 401) {
        useState('authRedirect').value = route.path
        router.push('/login')
      }
      else {
        toast(msg, { type: 'error', autoClose: 2000 })
      }

      throw error
    },
  })

  return {
    provide: {
      apiFetch,
    },
  }
})
