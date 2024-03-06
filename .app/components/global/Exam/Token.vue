<script setup lang="ts">
import type { exam } from '../../../types'

const props = defineProps<exam>()
const component = useState('token-component', () => {
  const isPunishment = localStorage.getItem('punishment')

  if (isPunishment == null) return 'ExamStartToken'

  return 'ExamPunishmentToken'
})

</script>

<template>
  <!-- Grid -->
  <div class="grid grid-cols-12 gap-6">
    <!-- Header -->
    <div class="col-span-12">
      <div class="bg-primary-800 flex flex-col items-center rounded-md p-4 sm:flex-row">
        <div class="relative h-[168px] w-[280px] shrink-0">
          <img class="pointer-events-none absolute -start-6 -top-20 block dark:hidden sm:-start-10"
            src="/img/illustrations/placeholders/flat/placeholder-search-1-dark.svg" alt="Student Exam illustration" />
          <img class="pointer-events-none absolute -start-6 -top-20 sm:-start-10 hidden dark:block"
            src="/img/illustrations/placeholders/flat/placeholder-search-1.svg" alt="Student Exam illustration" />
        </div>
        <div class="mt-6 grow sm:mt-0">
          <div class="text-center sm:text-left">
            <BaseHeading tag="h1" class="text-white opacity-90">
              <span>Selamat Mengerjakan !</span>
            </BaseHeading>
            <BaseParagraph size="sm" class="text-white opacity-70">
              <span>
                Ujian adalah gerbang menuju pencapaianmu. Hadapilah dengan semangat, fokus, dan keyakinan. Percayalah
                pada
                kemampuanmu, karena kamu telah mempersiapkan diri dengan baik. Raihlah hasil terbaik dengan ketenangan
                dan
                kerja keras. Sukses selalu!
              </span>
            </BaseParagraph>
          </div>
        </div>
      </div>
    </div>
    <!-- Token -->
    <BaseCard shape="curved" elevated-hover class="hover:!border-primary-500 p-5 col-span-12 lg:col-span-8">
      <NuxtLink class="grid grid-cols-2 gap-4">
        <div class="relative col-span-2 md:col-span-1">
          <img :src="getRandomImage()" alt="exam-name" class="w-full rounded-lg" />
        </div>
        <div class="group text-md col-span-2 md:col-span-1">
          <BaseHeading class="my-4">
            <span>{{ props.name }}</span>
          </BaseHeading>
          <BaseList>
            <BaseListItem :subtitle="props.lesson">
              <Icon name="ph:book-duotone" class="text-md size-5" />
            </BaseListItem>

            <BaseListItem :subtitle="`${props.time} Menit`">
              <Icon name="ph:alarm-duotone" class="text-md size-5" />
            </BaseListItem>

            <BaseListItem :subtitle="`${props.total_multiple_choice + props.total_essay} Soal`">
              <Icon name="ph:pen-nib-duotone" class="size-5" />
            </BaseListItem>

            <BaseListItem :subtitle="`Mulai , ${props.start_at}`">
              <Icon name="ph:calendar-check-duotone" class="size-5" />
            </BaseListItem>

            <BaseListItem :subtitle="`Selesai, ${props.end_at}`">
              <Icon name="ph:calendar-x-duotone" class="size-5" />
            </BaseListItem>
          </BaseList>
        </div>
      </NuxtLink>
    </BaseCard>
    <component v-bind="props" :is="resolveComponent(component)" />
  </div>
</template>