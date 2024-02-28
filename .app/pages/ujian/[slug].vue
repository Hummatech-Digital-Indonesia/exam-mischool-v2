<script setup lang="ts">

const route = useRoute()
const router = useRouter()

const slug: string = route.params.slug.toString()
const breadcrumb = [
    {
        label: 'Ulangan',
        hideLabel: false,
        icon: 'ph:clipboard-duotone',
        to: '/ulangan',
    },
    {
        label: slug,
        hideLabel: false,
        icon: 'ph:clipboard-text-duotone',
        to: `/ulangan/${slug}`,
    },
]
</script>

<template>
    <div class="flex justify-between mb-8">
        <BaseBreadcrumb :items="breadcrumb">
            <Icon name="lucide:chevron-right" class="block size-3" />
        </BaseBreadcrumb>

        <BaseButton color="primary">
            <Icon name="ph:arrow-left-bold" class="-ms-1 size-4" />

            <span>Button</span>
        </BaseButton>
    </div>
    <KeepAlive>
        <component :is="resolveComponent('ExamAnswering')"></component>
    </KeepAlive>
</template>