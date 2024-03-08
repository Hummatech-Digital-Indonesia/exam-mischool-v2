<script setup lang="ts">

import type { exam } from '../../types'

definePageMeta({
  title: 'Ujian',
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const page = computed(() => parseInt((route.query.page as string) ?? '1'))
const config = useRuntimeConfig()
const token = localStorage.getItem('token')

const breadcrumb = [
  {
    label: 'Ujian',
    hideLabel: false,
    icon: 'ph:clipboard-text-duotone',
    to: '/ujian',
  },
]

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

function getButtonText(startIn : string,finished : string): string {

  if(finished != '') return 'Selesai..'

  const startInTimestamp = Date.parse(startIn); 
  const currentTimeStamp = Date.now();

  if (startInTimestamp > currentTimeStamp) {
    return 'Segara Dimulai...'
  } else {
    return 'Mulai Ujian...'
  }
}

function buttonClass(startIn: string, finished : string) {
  const startInTimestamp = Date.parse(startIn); 
  const currentTimeStamp = Date.now();
  let color : 'warning' | 'primary' | 'success' = 'primary'
  let disabled : boolean = false
  let variant : 'solid' | 'outline' = 'solid'

  if (startInTimestamp > currentTimeStamp){
    color = 'warning'
    disabled = true
  }

  if(finished != '') {
    color = 'success'
    disabled = true
    variant = 'outline'
  }

  return {
    color : color,
    disabled : disabled,
    variant : variant
  }
}
</script>

<template>
  <div>
    <BaseBreadcrumb :items="breadcrumb">
      <Icon name="lucide:chevron-right" class="block size-3" />
    </BaseBreadcrumb>
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
                <BaseButton :to="`/ujian/${item.slug}`" shape="curved" v-bind="buttonClass(item.start_in,item.finished)" class="w-full">
                  {{ getButtonText(item.start_in,item.finished) }}
                </BaseButton>
              </div>
            </BaseCard>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
