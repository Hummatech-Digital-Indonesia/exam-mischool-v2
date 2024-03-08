<script setup lang="ts">
import type { exam } from '../../../types'
const props = defineProps<exam>()
const router = useRouter()
</script>

<template>
    <!-- Grid -->
    <div class="grid grid-cols-12 gap-6">
        <!-- Header -->
        <div class="col-span-12 md:col-span-6 h-full">
            <div class="bg-primary-800 flex flex-col items-center rounded-md p-4">
                <div class="relative h-[168px] w-[280px] shrink-0">
                    <img class="pointer-events-none absolute -start-6 -top-20 block dark:hidden sm:-start-10"
                        src="/img/illustrations/placeholders/flat/placeholder-search-1-dark.svg"
                        alt="Student Exam illustration" />
                    <img class="pointer-events-none absolute -start-6 -top-20 sm:-start-10 hidden dark:block"
                        src="/img/illustrations/placeholders/flat/placeholder-search-1.svg"
                        alt="Student Exam illustration" />
                </div>
                <div class="mt-8 grow">
                    <div class="text-center sm:text-left">
                        <BaseHeading tag="h1" class="text-white opacity-90">
                            <span>Terimakasih Sudah Mengerjakan !</span>
                        </BaseHeading>
                        <BaseParagraph size="sm" class="text-white opacity-70">
                            <span>
                                Selamat telah menyelesaikan ujian! Semoga hasilnya memuaskan dan membawa kebahagiaan.
                                Istirahat yang cukup dan jangan ragu untuk merayakan pencapaianmu. Sukses selalu!
                            </span>
                        </BaseParagraph>
                    </div>
                </div>
            </div>
        </div>
        <!-- Content -->
        <BaseCard class="col-span-12 md:col-span-6 py-2 px-6 flex flex-col h-full">
            <div class="w-full flex-col text-center mt-4">
                <TairoCheckAnimated class="mx-auto mb-2" color="success" size="lg" />
                <BaseHeading class="text-muted-700 dark:text-muted-400">{{ props.name }}</BaseHeading>
            </div>
            <div class="my-2 max-w-2xl w-full mx-auto flex items-start justify-start">
                <div>
                    <div class="text-muted-700 dark:text-muted-400 flex items-start gap-1 my-4">
                        <Icon name="ph:book-duotone" class="h-4 w-4 rounded-md" />
                        <p class="font-sans text-sm">
                            Mapel : {{ props.lesson }}
                        </p>
                    </div>
                    <div class="text-muted-700 dark:text-muted-400 flex items-start gap-1 my-4">
                        <Icon name="ph:calendar-check-duotone" class="h-4 w-4" />
                        <p class="font-sans text-sm">
                            Mulai Mengerjakan : {{ props.started }}
                        </p>
                    </div>
                    <div class="text-muted-700 dark:text-muted-400 flex items-start gap-1 my-4">
                        <Icon name="ph:calendar-x-duotone" class="h-4 w-4" />
                        <p class="font-sans text-sm">
                            Selesai Mengerjakan : {{ props.finished }}
                        </p>
                    </div>
                </div>
            </div>
            <BaseButton @click="router.back()" color="primary" class="max-w-2xl w-full mx-auto mb-4">
                Kembali
            </BaseButton>
        </BaseCard>
    </div>
</template>