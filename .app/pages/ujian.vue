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

const { data, pending, error, refresh } = await useFetch(
  'https://tairo.cssninja.io/api/company/projects',
  {
    query,
  },
)
</script>

<template>
  <div>
    <TairoContentWrapper>
      <div class="space-y-10">
        <div>
          <div v-if="!pending && data?.data.length === 0">
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
            <div>
              <h4
                class="text-muted-400 mb-4 font-sans text-xs font-semibold uppercase"
              >
                Home
              </h4>
            </div>
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
                  v-for="(item, index) in data?.data"
                  :key="index"
                  shape="curved"
                  elevated-hover
                  class="hover:!border-primary-500 p-5"
                >
                  <NuxtLink
                    class="group"
                    :to="`/layouts/projects/details/${item.slug}`"
                  >
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
                          name="ph:check-circle-duotone"
                          class="text-info-500 size-6"
                        />
                      </BaseListItem>

                      <BaseListItem subtitle="Meeting about next project steps">
                        <Icon
                          name="ph:timer-duotone"
                          class="text-success-500 size-6"
                        />
                      </BaseListItem>

                      <BaseListItem
                        subtitle="In preparation of next Friday's party"
                      >
                        <Icon
                          name="ph:confetti-duotone"
                          class="size-6 text-yellow-400"
                        />
                      </BaseListItem>

                      <BaseListItem
                        subtitle="Bill must be paid before next Tuesday"
                      >
                        <Icon
                          name="ph:receipt-duotone"
                          class="text-danger-500 size-6"
                        />
                      </BaseListItem>
                    </BaseList>
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
