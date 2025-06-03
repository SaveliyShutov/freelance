import { toast } from "vue3-toastify";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const $apiFetch = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include',
    onRequest({ request, options, error }) {

    },
    onResponse({ response }) {
      // response._data = new myBusinessResponse(response._data)
    },
    onResponseError({ response }) {
      // if (response._data.message) {
      // if (process.client)
      //   toast(response._data.message, { type: 'error' })
      // }
      if (response.status === 400) {
        console.log(response?._data?.message)
        toast(response?._data?.message, {
          type: "error",
          autoClose: 2000,
        });
      }
      if (response.status === 429) {
        toast("Слишком много попыток. Попробуйте через 5 минут.", {
          type: "error",
          autoClose: 2000,
        });
      }
      if (response.status === 401) {
        useState('authRedirect').value = useRoute().path
        navigateTo('/')
      }
    }
  })

  return {
    provide: {
      apiFetch: $apiFetch
    }
  }
})