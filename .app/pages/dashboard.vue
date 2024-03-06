<script setup lang="ts">

import type { exam } from '../types'

definePageMeta({
  title: 'Dashboard',
  middleware: 'auth',
})

const breadcrumb = [
  {
    label: 'Dashboard',
    hideLabel: false,
    icon: 'ph:house-duotone',
    to: '/dashboard',
  },
]

const route = useRoute()
const user = useUserData()
const config = useRuntimeConfig()
const token = localStorage.getItem('token')

interface ExamResponse {
  meta: {
    code: number,
    status: 'success' | 'error',
    message?: string
  },
  data: exam[]
}

const { data, pending, error, refresh } = await useFetch<ExamResponse>(`${config.public.apiUrl}/exam-students`, {
  headers: {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  },
  method: 'GET'
})

function checkTime(startIn: string): boolean {
  const startInTimestamp = Date.parse(startIn); 
  const currentTimeStamp = Date.now();

  if (startInTimestamp > currentTimeStamp) {
    return false
  } else {
    return true
  }
}

</script>

<template>
  <div class="grid w-full grid-cols-1">
    <!-- BreadCrumb -->
    <BaseBreadcrumb :items="breadcrumb">
      <Icon name="lucide:chevron-right" class="block size-3" />
    </BaseBreadcrumb>

    <!-- Header -->
    <div class="mb-8 flex flex-col justify-between md:flex-row md:items-center">
      <div
        class="ltablet:max-w-full flex max-w-[425px] flex-col items-center gap-4 text-center md:flex-row md:text-left lg:max-w-full">
        <BaseAvatar :src="user.photo" size="lg" />
        <div>
          <BaseHeading as="h2" size="xl" weight="light" lead="tight" class="text-muted-800 dark:text-white">
            <span>Selamat Datang Kembali, {{ user.name }}</span>
          </BaseHeading>
          <BaseParagraph>
            <span class="text-muted-500">
              Senang bertemu denganmu lagi di aplikasi ujian.
            </span>
          </BaseParagraph>
        </div>
      </div>
    </div>

    <!-- Counter -->
    <div class="md:grid grid-cols-12 gap-4 hidden">
      <BaseCard class="p-4 lg:col-span-3 md:col-span-6 col-span-12">
        <div class="mb-1 flex items-center justify-between">
          <BaseHeading as="h5" size="sm" weight="medium" lead="tight" class="text-muted-500 dark:text-muted-400">
            <span>Total Ujian</span>
          </BaseHeading>
          <BaseIconBox size="xs"
            class="bg-success-100 text-success-500 dark:bg-success-500/20 dark:text-success-400 dark:border-success-500 dark:border-2"
            shape="full">
            <Icon name="ph:clipboard-text-duotone" class="h-5 w-5" />
          </BaseIconBox>
        </div>
        <div class="mb-2">
          <BaseHeading as="h4" size="3xl" weight="bold" lead="tight" class="text-muted-800 dark:text-white">
            <span>7,549</span>
          </BaseHeading>
        </div>
      </BaseCard>
      <BaseCard class="p-4 lg:col-span-3 md:col-span-6 col-span-12">
        <div class="mb-1 flex items-center justify-between">
          <BaseHeading as="h5" size="sm" weight="medium" lead="tight" class="text-muted-500 dark:text-muted-400">
            <span>Total Ulangan</span>
          </BaseHeading>
          <BaseIconBox size="xs"
            class="bg-blue-100 text-blue-500 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500 dark:border-2"
            shape="full">
            <Icon name="ph:clipboard-duotone" class="h-5 w-5" />
          </BaseIconBox>
        </div>
        <div class="mb-2">
          <BaseHeading as="h4" size="3xl" weight="bold" lead="tight" class="text-muted-800 dark:text-white">
            <span>7,549</span>
          </BaseHeading>
        </div>
      </BaseCard>
      <BaseCard class="p-4 lg:col-span-3 md:col-span-6 col-span-12">
        <div class="mb-1 flex items-center justify-between">
          <BaseHeading as="h5" size="sm" weight="medium" lead="tight" class="text-muted-500 dark:text-muted-400">
            <span>Ujian Belum Dikerjakan</span>
          </BaseHeading>
          <BaseIconBox size="xs"
            class="bg-red-100 text-red-500 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500 dark:border-2"
            shape="full">
            <Icon name="ph:clipboard-text-duotone" class="h-5 w-5" />
          </BaseIconBox>
        </div>
        <div class="mb-2">
          <BaseHeading as="h4" size="3xl" weight="bold" lead="tight" class="text-muted-800 dark:text-white">
            <span>7,549</span>
          </BaseHeading>
        </div>
      </BaseCard>
      <BaseCard class="p-4 lg:col-span-3 md:col-span-6 col-span-12">
        <div class="mb-1 flex items-center justify-between">
          <BaseHeading as="h5" size="sm" weight="medium" lead="tight" class="text-muted-500 dark:text-muted-400">
            <span>Ulangan Belum Dikerjakan</span>
          </BaseHeading>
          <BaseIconBox size="xs"
            class="bg-orange-100 text-orange-500 dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500 dark:border-2"
            shape="full">
            <Icon name="ph:clipboard-duotone" class="h-5 w-5" />
          </BaseIconBox>
        </div>
        <div class="mb-2">
          <BaseHeading as="h4" size="3xl" weight="bold" lead="tight" class="text-muted-800 dark:text-white">
            <span>7,549</span>
          </BaseHeading>
        </div>
      </BaseCard>
    </div>

    <div>
      <h4 @click="refresh()" class="text-muted-400 my-4 font-sans text-xs font-semibold uppercase">
        Ujian
      </h4>
    </div>
    <!-- Ujian Terbaru -->
    <div>
      <template v-if="pending">
        <div class="ltablet:grid-cols-3 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <BaseCard v-for="i in 3" :key="i" shape="curved" class="p-4">
            <div>
              <BasePlaceload class="h-72 rounded-md"></BasePlaceload>
            </div>
            <div class="my-4 flex items-center justify-between">
              <div class="w-full">
                <h4 class="mb-3 text-muted-800 dark:text-muted-100 font-sans text-base font-medium">
                  <BasePlaceload class="w-[80%] py-3 rounded-md"></BasePlaceload>
                </h4>
                <div class="text-muted-400 flex w-full gap-1 my-4">
                  <BasePlaceload class="h-4 w-4 rounded-md"></BasePlaceload>
                  <BasePlaceload class="w-[70%] py-2 rounded-md"></BasePlaceload>
                </div>
                <div class="text-muted-400 flex w-full gap-1 my-4">
                  <BasePlaceload class="h-4 w-4 rounded-md"></BasePlaceload>
                  <BasePlaceload class="w-[70%] py-2 rounded-md"></BasePlaceload>
                </div>
                <div class="text-muted-400 flex w-full gap-1 my-4">
                  <BasePlaceload class="h-4 w-4 rounded-md"></BasePlaceload>
                  <BasePlaceload class="w-[70%] py-2 rounded-md"></BasePlaceload>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2 w-full">
              <BasePlaceload class="w-full rounded-md py-5"></BasePlaceload>
            </div>
          </BaseCard>
        </div>
      </template>
      <template v-else>
        <div v-if="data?.data.length === 0">
          <BasePlaceholderPage title="Ujian tidak ditemukan" subtitle="Sepertinya sedang tidak ada ujian saat ini.">
            <template #image>
              <img class="block dark:hidden" src="/img/illustrations/placeholders/flat/placeholder-search-7.svg"
                alt="Placeholder image" />
              <img class="hidden dark:block" src="/img/illustrations/placeholders/flat/placeholder-search-7-dark.svg"
                alt="Placeholder image" />
            </template>
          </BasePlaceholderPage>
        </div>
        <div v-else>
          <div class="ltablet:grid-cols-3 grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <BaseCard v-for="item in data?.data" :key="item.id" shape="curved" class="p-4">
              <div>
                <img :src="getRandomImage()" :alt="item.name" class="rounded-lg" />
              </div>
              <div class="my-4 flex items-center justify-between">
                <div>
                  <h4 class="mb-3 text-muted-800 dark:text-muted-100 font-sans text-base font-medium">
                    {{ item.name }}
                  </h4>
                  <div class="text-muted-400 flex items-center gap-1 my-4">
                    <Icon name="ph:book-duotone" class="h-4 w-4 rounded-md" />
                    <p class="font-sans text-sm">
                      Mapel : {{ item.lesson }}
                    </p>
                  </div>
                  <div class="text-muted-400 flex items-center gap-1 my-4">
                    <Icon name="ph:calendar-check-duotone" class="h-4 w-4" />
                    <p class="font-sans text-sm">
                      Mulai : {{ item.start_at }}
                    </p>
                  </div>
                  <div class="text-muted-400 flex items-center gap-1 my-4">
                    <Icon name="ph:calendar-x-duotone" class="h-4 w-4" />
                    <p class="font-sans text-sm">
                      Selesai : {{ item.end_at }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <BaseButton :to="checkTime(item.start_in) ? `/ujian/${item.slug}` : ''" shape="curved" :disabled="!checkTime(item.start_in)" :color="checkTime(item.start_in) ? 'primary' : 'warning'" class="w-full">
                  {{ checkTime(item.start_in) ? 'Mulai Ujian' : 'Segera Dimulai' }}
                </BaseButton>
              </div>
            </BaseCard>
          </div>
        </div>
      </template>
    </div>

  </div>
</template>
