export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  const token = localStorage.getItem('token')
  const router = useRouter()

  const { data: success, error } = await useFetch(
    `${config.public.apiUrl}/data-student`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  )

  if (success.value) {
    router.push('/dashboard')
  }
})
