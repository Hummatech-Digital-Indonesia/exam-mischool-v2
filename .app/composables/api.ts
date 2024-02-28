const config = useRuntimeConfig()

export function useApiUrl() : string{
    return config.public.apiUrl
}