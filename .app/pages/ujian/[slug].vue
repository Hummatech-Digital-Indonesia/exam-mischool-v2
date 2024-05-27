<script setup lang="ts">

import type { exam } from '../../types'

definePageMeta({
    title: 'Ujian',
    middleware: ['auth']
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const token = localStorage.getItem('token')
const status = useState<boolean | string>('exam-status', () => checkExamSession(route.params.slug.toString()))
const isModalWarningOpen = useState('last-submit', () => false)
const isModalCheatingOpen = useState('cheating-detector', () => false)

const slug: string = route.params.slug.toString()

interface ExamResponse {
    meta: {
        code: number,
        status: 'success' | 'error',
        message?: string
    },
    data: exam
}

const { data: success, error, pending } = await useFetch<ExamResponse>(`${config.public.apiUrl}/exam/${route.params.slug}`, {
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
    },
    method: 'GET'
})

if (error.value?.statusCode == 404) {

    showError({
        statusCode: 404,
        statusMessage: "Page Not Found"
    })

}

const pages = computed(() => {

    if(success.value?.data.finished || status.value == 'done') return 'ExamFinish'
    
    if (status.value) return 'ExamAnswering'
    
    return 'ExamToken'
})

const breadcrumb = [
    {
        label: 'Ulangan',
        hideLabel: false,
        icon: 'ph:clipboard-duotone',
        to: '/ulangan',
    },
    {
        label: success.value?.data.name,
        hideLabel: false,
        icon: 'ph:clipboard-text-duotone',
        to: `/ulangan/${slug}`,
    },
]
</script>

<template>
    <div class="flex justify-between mb-8">
        <BaseBreadcrumb v-if="!pending" :items="breadcrumb">
            <Icon name="lucide:chevron-right" class="block size-3" />
        </BaseBreadcrumb>

        <BaseButton @click="router.back()" color="primary">
            <Icon name="ph:arrow-left-bold" class="-ms-1 size-4" />
            <span>Kembali</span>
        </BaseButton>
    </div>
    <template v-if="!pending">
        <KeepAlive>
            <component v-bind="success?.data" :is="resolveComponent(pages)"></component>
        </KeepAlive>
    </template>

    <TairoModal v-if="success?.data.last_submit" :open="isModalWarningOpen" size="md"
        @close="isModalWarningOpen = false">

        <template #header>
            <!-- Header -->
            <div class="flex w-full items-center justify-between p-4 md:p-6">
                <h3 class="font-heading text-muted-900 text-lg font-medium leading-6 dark:text-white">
                    Warning
                </h3>
            </div>
        </template>

        <!-- Body -->
        <div class="p-4 md:p-6">
            <div class="mx-auto w-full max-w-xs text-center">
                <div class="relative mx-auto mb-4 flex size-24">
                    <img src="/img/illustrations/onboarding/2fa-web.svg"
                        class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent" alt="">
                </div>

                <h3 class="font-heading text-muted-800 text-lg font-medium leading-6 dark:text-white">
                    Belum bisa mengumpulkan ujian.
                </h3>

                <p class="font-alt text-muted-500 dark:text-muted-400 text-sm leading-5">
                    Ujian hanya bisa dikumpulkan 5 menit sebelum waktu berakhir, tolong periksa lagi jawaban anda baik
                    baik
                </p>
            </div>
        </div>

        <template #footer>
            <!-- Footer -->
            <div class="p-4 md:p-6">
                <div class="flex gap-x-2">

                    <BaseButton color="primary" variant="solid" @click="isModalWarningOpen = false">
                        Lanjutkan Ujian
                    </BaseButton>
                </div>
            </div>
        </template>
    </TairoModal>

    <TairoModal v-if="success?.data.cheating_detector" :open="isModalCheatingOpen" size="md"
        @close="isModalCheatingOpen = false">

        <template #header>
            <!-- Header -->
            <div class="flex w-full items-center justify-between p-4 md:p-6">
                <h3 class="font-heading text-muted-900 text-lg font-medium leading-6 dark:text-white">
                    Warning
                </h3>
            </div>
        </template>

        <!-- Body -->
        <div class="p-4 md:p-6">
            <div class="mx-auto w-full max-w-xs text-center">
                <div class="relative mx-auto mb-4 flex size-24">
                    <img src="/img/illustrations/onboarding/2fa-web.svg"
                        class="max-w-full rounded-full object-cover shadow-sm dark:border-transparent" alt="">
                </div>

                <h3 class="font-heading text-muted-800 text-lg font-medium leading-6 dark:text-white">
                    Anda Terdeteksi Membuka Tab Lain
                </h3>

                <p class="font-alt text-muted-500 dark:text-muted-400 text-sm leading-5">
                    Segera hubungi pengawas ujian / admin ujian di sekolah anda , lalu masukkan token yang baru.
                </p>
            </div>
        </div>

        <template #footer>
            <!-- Footer -->
            <div class="p-4 md:p-6">
                <div class="flex gap-x-2">

                    <BaseButton color="primary" variant="solid" @click="isModalCheatingOpen = false">
                        Lanjutkan Ujian
                    </BaseButton>
                </div>
            </div>
        </template>
    </TairoModal>
</template>