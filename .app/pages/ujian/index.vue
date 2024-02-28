<script setup lang="ts">
definePageMeta({
  title: 'Project List',
  preview: {
    title: 'Project list 3',
    description: 'For displaying a list of projects',
    src: '/img/screens/layouts-projects-3.png',
    srcDark: '/img/screens/layouts-projects-3-dark.png',
    order: 70,
  },
})

const route = useRoute()
const router = useRouter()
const page = computed(() => parseInt((route.query.page as string) ?? '1'))

const filter = ref('')
const perPage = ref(25)

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

const breadcrumb = [
  {
    label: 'Ujian',
    hideLabel: false,
    icon: 'ph:clipboard-text-duotone',
    to: '/ujian',
  },
]


const data = [
  {
    title: 'Ilmu Pengetahuan Alam',
    image: '/img/apps/1.jpg',
    name: '/1.jpg',
  },
  {
    title: 'Ilmu Pengetahuan Alam',
    image: '/img/apps/1.jpg',
    name: '/1.jpg',
  },
  {
    title: 'Ilmu Pengetahuan Alam',
    image: '/img/apps/1.jpg',
    name: '/1.jpg',
  },
  {
    title: 'Ilmu Pengetahuan Alam',
    image: '/img/apps/1.jpg',
    name: '/1.jpg',
  },
]
</script>

<template>
  <div>
    <BaseBreadcrumb :items="breadcrumb">
      <Icon name="lucide:chevron-right" class="block size-3" />
    </BaseBreadcrumb>
    <TairoContentWrapper class="mt-8">
      <div class="space-y-10">
        <div>
          <div v-if="data.length === 0">
            <BasePlaceholderPage
              title="No matching results"
              subtitle="Looks like we couldn't find any matching results for your search terms. Try other search terms."
            >
              <template #image>
                <img
                  class="block dark:hidden"
                  src="/img/illustrations/placeholders/flat/placeholder-search-4.svg"
                  alt="Placeholder image"
                />
                <img
                  class="hidden dark:block"
                  src="/img/illustrations/placeholders/flat/placeholder-search-4-dark.svg"
                  alt="Placeholder image"
                />
              </template>
            </BasePlaceholderPage>
          </div>
          <div v-else>
            <div
              class="ltablet:grid-cols-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              <TransitionGroup
                enter-active-class="transform-gpu"
                enter-from-class="opacity-0 -translate-x-full"
                enter-to-class="opacity-100 translate-x-0"
                leave-active-class="absolute transform-gpu"
                leave-from-class="opacity-100 translate-x-0"
                leave-to-class="opacity-0 -translate-x-full"
              >
                <BaseCard
                  v-for="(item, index) in data"
                  :key="index"
                  shape="curved"
                  elevated-hover
                  class="hover:!border-primary-500 p-5"
                >
                  <NuxtLink class="group">
                    <!-- <div class="p-5"> -->
                    <div class="relative mb-4">
                      <img
                        :src="item.image"
                        :alt="item.name"
                        class="w-full rounded-lg"
                      />
                    </div>
                    <!-- </div> -->
                    <BaseHeading class="my-4">
                      <span>Ilmu Pengetahuan Alam</span>
                    </BaseHeading>
                    <BaseList>
                      <BaseListItem subtitle="Close resubing pending tasks">
                        <Icon
                          name="ph:calendar-blank-bold"
                          class="text-sm size-5"
                        />
                      </BaseListItem>

                      <BaseListItem subtitle="Meeting about next project steps">
                        <Icon name="ph:timer-duotone" class="size-5" />
                      </BaseListItem>

                      <BaseListItem
                        subtitle="In preparation of next Friday's party"
                      >
                        <Icon name="ion:clipboard-outline" class="size-5" />
                      </BaseListItem>
                    </BaseList>
                    <BaseButton
                      variant="solid"
                      color="primary"
                      size="sm"
                      class="w-full mt-5"
                    >
                      Mulai Ujian
                    </BaseButton>
                  </NuxtLink>
                </BaseCard>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </TairoContentWrapper>
  </div>
</template>