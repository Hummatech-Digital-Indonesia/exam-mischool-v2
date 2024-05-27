<script setup lang="ts">
import type { dailyExam, question } from '../../types'

definePageMeta({
    title: 'Ujian',
    middleware: ['auth']
})

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const token = localStorage.getItem('token')
const status = useState<boolean | string>('daily-exam-status', () => checkExamSession(route.params.slug.toString()))

const slug: string = route.params.slug.toString()

interface DailyExamResponse {
    meta: {
        code: number,
        status: 'success' | 'error',
        message?: string
    },
    data: dailyExam
}

const { data: success, error, pending } = await useFetch<DailyExamResponse>(`${config.public.apiUrl}/student-daily-exams/${slug}`, {
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

    if(success.value?.data.finished || status.value == 'done') return 'DailyExamFinish'

    return 'DailyExamAnswering'

})



const breadcrumb = [
    {
        label: 'Ulangan',
        hideLabel: false,
        icon: 'ph:clipboard-duotone',
        to: '/ulangan',
    },
    {
        label: success.value?.data.title,
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
</template>