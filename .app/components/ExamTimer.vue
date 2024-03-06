<script setup lang="ts">
const props = defineProps<{
    deadline: string
    lastSubmit : boolean
}>()

const deadlineTime = new Date(props.deadline).getTime()
const text = ref<string>('')
const color = ref<'nui-badge-warning' | 'nui-badge-danger' | ''>('')
const timeOver = useState('time-over', () => false)

function updateCountdown() {
    const now = new Date().getTime()
    const timeDifference = deadlineTime - now

    if (timeDifference <= (1000 * 60 * 5)) {
        color.value = 'nui-badge-warning'
        if(props.lastSubmit){
            const isAbleSubmit = useState('able-submit',() => false)
            isAbleSubmit.value = true
        }
    } else if (timeDifference <= (1000 * 60)) {
        color.value = 'nui-badge-danger'
    }
    if (timeDifference > 0) {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60))
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

        const formattedHours = hours.toString().padStart(2, '0')
        const formattedMinutes = minutes.toString().padStart(2, '0')
        const formattedSeconds = seconds.toString().padStart(2, '0')

        text.value = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    } else {
        text.value = 'Waktu Habis'
        timeOver.value = true
    }
}

updateCountdown();
setInterval(updateCountdown, 1000)
</script>

<template>
    <BaseButton class="flex gap-2">
        <Icon name="ph:clock-countdown-duotone" class="-ms-1 size-4" />

        <span>{{ text }}</span>

        <span v-show="color != ''" class="nui-button-badge" :class="color">
            <span class="nui-button-badge-pulse"></span>
            <span class="nui-button-badge-inner"></span>
        </span>
    </BaseButton>
</template>