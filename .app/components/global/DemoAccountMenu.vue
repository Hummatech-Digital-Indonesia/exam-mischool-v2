<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const props = defineProps<{
  horizontal?: boolean
}>()

const config = useRuntimeConfig()
const toaster = useToaster()
const user = useUserData()
const isProccess = ref(false)
const token = localStorage.getItem('token')

const logout = async () => {
  isProccess.value = true

  const { data: success, error } = await useFetch(`${config.public.apiUrl}/logout`, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
    method: 'POST'
  })

  if (success.value) {
    //@ts-ignore
    localStorage.removeItem('token');
    toaster.show({
      title: 'Sukses!',
      message: 'Berhasil Logout!',
      icon: 'lucide:check',
      color: 'success'
    })
    navigateTo('/')

    return
  }

  if (error.value?.statusCode == 500) {
    toaster.show({
      title: 'Gagal!',
      message: 'Terjadi kesalahan di sisi server, coba hubungi developer!',
      icon: 'lucide:alert-octagon',
      color: 'danger'
    })

    throw createError({
      statusCode: 500,
      statusMessage: 'Server Error'
    })

  } else {
    toaster.show({
      title: 'Gagal!',
      message: error.value?.message,
      icon: 'lucide:alert-octagon',
      color: 'danger'
    })
  }
}
</script>

<template>
  <div class="group inline-flex items-center justify-center text-right">
    <Menu as="div" class="relative h-10 w-10 text-left" v-slot="{ close }">
      <MenuButton as="template">
        <button type="button"
          class="group-hover:ring-primary-500 dark:ring-offset-muted-800 inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-transparent transition-all duration-300 group-hover:ring-offset-4">
          <div class="relative inline-flex h-10 w-10 items-center justify-center rounded-full">
            <img :src="user.photo" class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
              alt="" />
          </div>
        </button>
      </MenuButton>

      <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems
          class="border-muted-200 dark:border-muted-700 dark:bg-muted-800 absolute mt-2 w-60 origin-bottom-right rounded-md border bg-white text-left shadow-lg focus:outline-none"
          :class="props.horizontal ? 'top-10 end-0' : 'bottom-0 -end-64'">
          <div class="bg-muted-50 dark:bg-muted-700/40 p-6">
            <div class="flex items-center">
              <div class="relative inline-flex h-14 w-14 items-center justify-center rounded-full">
                <img :src="user.photo" class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent"
                  alt="" />
              </div>
              <div class="ms-3">
                <h6 class="font-heading text-muted-800 text-sm font-medium dark:text-white">
                  {{ user.name }}
                </h6>
                <p class="text-muted-400 font-sans text-xs">Siswa</p>
              </div>
            </div>
          </div>
          <div class="p-2">
            <MenuItem as="div" v-slot="{ active }">
            <NuxtLink to="/layouts/profile"
              class="group flex w-full items-center rounded-md p-3 text-sm transition-colors duration-300" :class="[
                active
                  ? 'bg-muted-100 dark:bg-muted-700 text-primary-500'
                  : 'text-muted-400',
              ]" @click.passive="close">
              <Icon name="ph:user-circle-duotone" class="h-5 w-5" />
              <div class="ms-3">
                <h6 class="font-heading text-muted-800 text-xs font-medium leading-none dark:text-white">
                  Profil
                </h6>
                <p class="text-muted-400 font-sans text-xs">
                  Manage Profil
                </p>
              </div>
            </NuxtLink>
            </MenuItem>
            <MenuItem as="div" v-slot="{ active }" class="cursor-pointer">
            <NuxtLink @click="logout"
              class="group flex w-full items-center rounded-md p-3 text-sm transition-colors duration-300" :class="[
                active
                  ? 'bg-muted-100 dark:bg-muted-700 text-primary-500'
                  : 'text-muted-400',
              ]">
              <Icon name="ph:door-duotone" class="h-5 w-5" />
              <div class="ms-3">
                <h6 class="font-heading text-muted-800 text-xs font-medium leading-none dark:text-white">
                  Logout
                </h6>
                <p class="text-muted-400 font-sans text-xs">
                  Keluar Aplikasi
                </p>
              </div>
            </NuxtLink>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  </div>
</template>
