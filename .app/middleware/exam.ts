export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  const token = localStorage.getItem('token')
  const route = useRoute()
  const router = useRouter()

  const { data: success, error } = await useFetch(
    `${config.public.apiUrl}/exam/${route.params.slug}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  )

  if (error.value) {
    return abortNavigation()
  }
})
