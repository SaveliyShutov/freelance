import type { UseFetchOptions } from 'nuxt/app'

export function useApiFetch<T = any>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {},
) {
  const nuxtApp = useNuxtApp()
  const headers = useRequestHeaders(['cookie'])

  const mergedOptions = {
    ...(options || {}),
    headers: {
      ...(options.headers || {}),
      ...headers,
    },
    $fetch: nuxtApp.$apiFetch,
  }

  return useFetch(url, mergedOptions)
}
