<script setup lang="ts">
definePageMeta({
  title: 'Project List',
  middleware : 'auth',
  preview: {
    title: 'Project list 3',
    description: 'For displaying a list of projects',
    src: '/img/screens/layouts-projects-3.png',
    srcDark: '/img/screens/layouts-projects-3-dark.png',
    order: 70,
  },
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
const router = useRouter()
const user = useUserData()

const page = computed(() => parseInt((route.query.page as string) ?? '1'))

const filter = ref('')
const perPage = ref(3)

watch([filter, perPage], () => {
  router.push({
    query: {
      page: undefined,
    },
  })
})

const query = computed(() => {
  return {
    filter: filter.value,
    perPage: perPage.value,
    page: page.value,
  }
})

const { data, pending, error, refresh } = await useFetch(
  '/api/exams',
  {
    query,
  },
)
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
    <div class="grid grid-cols-12 gap-4">
      <BaseCard class="p-4 lg:col-span-3 md:col-span-6 col-span-12">
        <div class="mb-1 flex items-center justify-between">
          <BaseHeading as="h5" size="sm" weight="medium" lead="tight" class="text-muted-500 dark:text-muted-400">
            <span>Total Ujian</span>
          </BaseHeading>
          <BaseIconBox size="xs"
            class="bg-success-100 text-success-500 dark:bg-success-500/20 dark:text-success-400 dark:border-success-500 dark:border-2"
            shape="full">
            <Icon name="ph:sketch-logo-duotone" class="h-5 w-5" />
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
            <Icon name="ph:sketch-logo-duotone" class="h-5 w-5" />
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
            <Icon name="ph:sketch-logo-duotone" class="h-5 w-5" />
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
            <Icon name="ph:sketch-logo-duotone" class="h-5 w-5" />
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
      <h4 class="text-muted-400 my-4 font-sans text-xs font-semibold uppercase">
        Ujian
      </h4>
    </div>
    <!-- Ujian Terbaru -->
    <div>
      <div v-if="!pending && data?.data.length === 0">
        <BasePlaceholderPage title="No matching results"
          subtitle="Looks like we couldn't find any matching results for your search terms. Try other search terms.">
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
              <img :src="item.image" :alt="item.name" class="rounded-lg" />
            </div>
            <div class="my-4 flex items-center justify-between">
              <div>
                <h4 class="mb-3 text-muted-800 dark:text-muted-100 font-sans text-base font-medium">
                  {{ item.name }}
                </h4>
                <div class="text-muted-400 flex items-center gap-1 my-4">
                  <Icon name="ph:calendar-blank-duotone" class="h-4 w-4" />
                  <p class="font-sans text-sm">
                    {{ item.dueDate }}
                  </p>
                </div>
                <div class="text-muted-400 flex items-center gap-1 my-4">
                  <Icon name="ph:calendar-blank-duotone" class="h-4 w-4" />
                  <p class="font-sans text-sm">
                    {{ item.dueDate }}
                  </p>
                </div>
                <div class="text-muted-400 flex items-center gap-1 my-4">
                  <Icon name="ph:calendar-blank-duotone" class="h-4 w-4" />
                  <p class="font-sans text-sm">
                    {{ item.dueDate }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <BaseButton shape="curved" class="w-full bg-primary-500">
                Mulai Ujian
              </BaseButton>
            </div>
          </BaseCard>
        </div>
        <div class="mt-6">
          <BasePagination :total-items="data?.total ?? 0" :item-per-page="perPage" :current-page="page" shape="curved" />
        </div>
      </div>
    </div>

  </div>
</template>
