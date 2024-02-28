export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  const token = localStorage.getItem('token')

  const { data: success, error } = await useFetch(
    `${config.public.apiUrl}/data-student`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  )

  if (error.value) {
    if (to.path !== '/') {
      return navigateTo('/')
    }
    return abortNavigation()
  }

  //@ts-ignore
  localStorage.setItem('user',JSON.stringify(success.value.data));
})
