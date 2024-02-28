<script setup lang="ts">

const isOpen = ref(true)
const value = ref('')

</script>

<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-9">
            <!-- Header -->
            <div class="bg-primary-800 flex flex-col items-center rounded-2xl p-4 sm:flex-row mb-6">
                <div class="relative h-[168px] w-[280px] shrink-0">
                    <img class="pointer-events-none absolute -start-6 -top-20 block dark:hidden sm:-start-10"
                        src="/img/illustrations/placeholders/flat/placeholder-search-1-dark.svg"
                        alt="Student Exam illustration" />
                    <img class="pointer-events-none absolute -start-6 -top-20 sm:-start-10 hidden dark:block"
                        src="/img/illustrations/placeholders/flat/placeholder-search-1.svg"
                        alt="Student Exam illustration" />
                </div>
                <div class="mt-6 grow sm:mt-0">
                    <div class="text-center sm:text-left">
                        <BaseHeading tag="h1" class="text-white opacity-90">
                            <span>Selamat Mengerjakan !</span>
                        </BaseHeading>
                        <BaseParagraph size="sm" class="text-white opacity-70">
                            <span>
                                Ujian adalah gerbang menuju pencapaianmu. Hadapilah dengan semangat, fokus, dan
                                keyakinan. Percayalah pada
                                kemampuanmu, karena kamu telah mempersiapkan diri dengan baik. Raihlah hasil terbaik
                                dengan ketenangan dan
                                kerja keras. Sukses selalu!
                            </span>
                        </BaseParagraph>
                    </div>
                </div>
            </div>

            <BaseCard shape="curved" class="overflow-hidden flex flex-col">
                <div class="w-full bg-primary-500 p-3 flex justify-between">
                    <BaseButton class="flex gap-2 font-semibold">
                        <span>1 Dari 30 Soal</span>
                    </BaseButton>
                    <BaseButton class="flex gap-2">
                        <Icon name="ph:clock-countdown-duotone" class="-ms-1 size-4" />

                        <span>00:45:59</span>
                    </BaseButton>
                </div>
                <div class="p-5">
                    <BaseParagraph class="mb-4 !text-slate-800 dark:!text-white">
                        Tairo is a powerful Nuxt / Tailwind CSS Admin and Webapp UI Kit, built with Vue 3 and TypeScript.
                        Tairo provides everything you need to build a modern web app or admin application. All basic
                        components are built with Tailwind CSS and powered by Nuxt.
                    </BaseParagraph>
                    <div class="flex flex-col gap-4">
                        <BaseRadio v-model="value" name="checkbox_colors" label="indigo" value="indigo" />
                        <BaseRadio v-model="value" name="checkbox_colors" label="indigo" value="indigo" />
                        <BaseRadio v-model="value" name="checkbox_colors" label="indigo" value="indigo" />
                        <BaseRadio v-model="value" name="checkbox_colors" label="indigo" value="indigo" />
                        <BaseRadio v-model="value" name="checkbox_colors" label="indigo" value="indigo" />
                    </div>
                </div>
                <div class="w-full flex justify-between p-3 border-t-[1px] border-slate-200 dark:border-slate-600">
                    <div class="flex gap-2">
                        <BaseButtonIcon color="info" rounded="md">
                            <Icon name="ph:caret-left-bold" class="size-8" />
                        </BaseButtonIcon>

                        <BaseButtonIcon color="info">
                            <Icon name="ph:caret-right-bold" class="size-8" />
                        </BaseButtonIcon>

                        <BaseButtonIcon color="warning">
                            <Icon name="ph:flag-duotone" class="size-8" />
                        </BaseButtonIcon>

                        <BaseButtonIcon color="danger">
                            <Icon name="lucide:flag-off" rounded="md" class="size-8" />
                        </BaseButtonIcon>
                    </div>
                    <BaseButtonIcon rounded="md" color="info" disabled>
                        <Icon name="ph:text-align-left-fill" class="size-5" />
                    </BaseButtonIcon>
                </div>
            </BaseCard>
        </div>
        <BaseCard class="col-span-12 lg:col-span-3 overflow-hidden">
            <div class="w-full bg-primary-500 p-2 text-center">
                <BaseHeading weight="semibold" size="md" class="text-white">
                    <span>Navigasi Soal</span>
                </BaseHeading>
            </div>
            <div class="w-full p-3 grid grid-cols-6 md:grid-cols-10 lg:grid-cols-5 gap-3">
                <BaseHeading class="col-span-6 md:col-span-10 lg:col-span-5" weight="semibold" size="md">
                    <span>Pilihan Ganda</span>
                </BaseHeading>
                <BaseButton to="#" color="info" rounded="sm" class="text-white max-w-8 h-auto">
                    1
                </BaseButton>
                <BaseButton to="#" color="default" rounded="sm" class="text-white max-w-8 h-auto">
                    2
                </BaseButton>
                <BaseButton to="#" color="success" rounded="sm" class="text-white max-w-8 h-auto">
                    3
                </BaseButton>
                <BaseButton to="#" badge badge-pulse color="default" rounded="sm" class="text-white max-w-8 h-auto">
                    4
                </BaseButton>
                <BaseButton to="#" badge badge-pulse color="info" rounded="sm" class="text-white max-w-8 h-auto">
                    5
                </BaseButton>
                <BaseButton to="#" color="info" rounded="sm" class="text-white max-w-8 h-auto">
                    1
                </BaseButton>
                <BaseButton to="#" color="default" rounded="sm" class="text-white max-w-8 h-auto">
                    2
                </BaseButton>
                <BaseButton to="#" color="success" rounded="sm" class="text-white max-w-8 h-auto">
                    3
                </BaseButton>
                <BaseButton to="#" badge badge-pulse color="default" rounded="sm" class="text-white max-w-8 h-auto">
                    4
                </BaseButton>
                <BaseButton to="#" badge badge-pulse color="info" rounded="sm" class="text-white max-w-8 h-auto">
                    5
                </BaseButton>
            </div>
            <div class="w-full p-3 grid grid-cols-6 md:grid-cols-10 lg:grid-cols-5 gap-3">
                <BaseHeading class="col-span-6 md:col-span-10 lg:col-span-5" weight="semibold" size="md">
                    <span>Soal Essay</span>
                </BaseHeading>
                <BaseButton to="#" color="info" rounded="sm" class="text-white max-w-8 h-auto">
                    1
                </BaseButton>
                <BaseButton to="#" color="default" rounded="sm" class="text-white max-w-8 h-auto">
                    2
                </BaseButton>
                <BaseButton to="#" color="success" rounded="sm" class="text-white max-w-8 h-auto">
                    3
                </BaseButton>
                <BaseButton to="#" badge badge-pulse color="default" rounded="sm" class="text-white max-w-8 h-auto">
                    4
                </BaseButton>
                <BaseButton to="#" badge badge-pulse color="info" rounded="sm" class="text-white max-w-8 h-auto">
                    5
                </BaseButton>
                <BaseButton to="#" color="info" rounded="sm" class="text-white max-w-8 h-auto">
                    1
                </BaseButton>
                <BaseButton to="#" color="default" rounded="sm" class="text-white max-w-8 h-auto">
                    2
                </BaseButton>
                <BaseButton to="#" color="success" rounded="sm" class="text-white max-w-8 h-auto">
                    3
                </BaseButton>
                <BaseButton to="#" badge badge-pulse color="default" rounded="sm" class="text-white max-w-8 h-auto">
                    4
                </BaseButton>
                <BaseButton to="#" badge badge-pulse color="info" rounded="sm" class="text-white max-w-8 h-auto">
                    5
                </BaseButton>
            </div>
        </BaseCard>
    </div>
</template>