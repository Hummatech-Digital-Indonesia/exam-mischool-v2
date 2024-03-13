<script setup lang="ts">
import type { exam } from '../../../types'

const props = defineProps<exam>()
const config = useRuntimeConfig()
const toaster = useToaster()
const status = useState<boolean | string>('exam-status', () => checkExamSession(props.slug))

interface question {
    lesson: string,
    level: string,
    employee: string,
    school_year: string,
    question: string,
    option1: string,
    option2: string,
    option3: string,
    option4: string,
    option5: string,
    question_number: string
}


const LOCAL_STORAGE_ITEM = {
    ESSAY_QUESTION: `essay-${props.slug}`,
    MULTIPLE_CHOICE_QUESTION: `multiple-choice-${props.slug}`,
    EXAM_STATUS: `exam-${props.slug}`,
    ANSWER_ESSAY: `ans-essay-${props.slug}`,
    ANSWER_MULTIPLE_CHOICE: `ans-mc-${props.slug}`,
    BADGE_MULTIPLE_CHOICE: `badge-mc-${props.slug}`,
    BADGE_ESSAY: `badge-essay-${props.slug}`,
    CURRENT_NUMBER: `current-number-${props.slug}`,
    CURRENT_TAB: `current-tab-${props.slug}`,
    DEADLINE : `deadline-${props.slug}`
}

// mengambil soal dari storage
const storageEssay: string | null = localStorage.getItem(LOCAL_STORAGE_ITEM.ESSAY_QUESTION)
const storageMultipleChoice: string | null = localStorage.getItem(LOCAL_STORAGE_ITEM.MULTIPLE_CHOICE_QUESTION)

let isEssayValid: boolean = true
let isMultipleChoiceValid: boolean = true

// mengecek apakah ada soal yang hilang
if (props.total_essay > 0 && storageEssay == null) isEssayValid = false
if (props.total_multiple_choice > 0 && storageMultipleChoice == null) isMultipleChoiceValid = false

// jika ada soal yang kurang, kembali memasukkan token
if (!isEssayValid || !isMultipleChoiceValid) {
    localStorage.removeItem(LOCAL_STORAGE_ITEM.EXAM_STATUS)
    status.value = false
}

//convert ke json
const essay: question[] = JSON.parse(storageEssay!)
const multipleChoice: question[] = JSON.parse(storageMultipleChoice!)

//ambil jawaban dan badge dari storage
const storageAnswerMultipleChoice: string | null = localStorage.getItem(LOCAL_STORAGE_ITEM.ANSWER_MULTIPLE_CHOICE)
const storageAnswerEssay: string | null = localStorage.getItem(LOCAL_STORAGE_ITEM.ANSWER_ESSAY)
const storageBadgeMultipleChoice: string | null = localStorage.getItem(LOCAL_STORAGE_ITEM.BADGE_MULTIPLE_CHOICE)
const storageBadgeEssay: string | null = localStorage.getItem(LOCAL_STORAGE_ITEM.BADGE_ESSAY)
const storageCurrentNumber: string | null = localStorage.getItem(LOCAL_STORAGE_ITEM.CURRENT_NUMBER)
const storageCurrentTab: string | null = localStorage.getItem(LOCAL_STORAGE_ITEM.CURRENT_TAB)


// inisiasi variable
const answerEssay = ref<string[]>([])
const answerMultipleChoice = ref<string[]>([])
const badgeMultipleChoice = ref<boolean[]>([])
const badgeEssay = ref<boolean[]>([])
const currentNumber = ref<number>(0)
const currentTab = ref<'essay' | 'multiple-choice'>(multipleChoice.length > 0 ? 'multiple-choice' : 'essay')
const token = localStorage.getItem('token')
const isSubmitting = ref<boolean>(false)
const deadline = props.deadline ? props.deadline : JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM.DEADLINE)!)

// ganti nilai dari localStorage jika ada
if (storageAnswerEssay != null) {
    answerEssay.value = JSON.parse(storageAnswerEssay!)
} else {
    answerEssay.value = Array(props.total_essay).fill('')
}

if (storageBadgeMultipleChoice != null) {
    badgeMultipleChoice.value = JSON.parse(storageBadgeMultipleChoice!)
} else {
    badgeMultipleChoice.value = Array(props.total_multiple_choice).fill(false)
}

if (storageAnswerMultipleChoice != null) {
    answerMultipleChoice.value = JSON.parse(storageAnswerMultipleChoice!)
} else {
    answerMultipleChoice.value = Array(props.total_multiple_choice).fill('')
}

if (storageBadgeMultipleChoice != null) {
    badgeMultipleChoice.value = JSON.parse(storageBadgeMultipleChoice!)
} else {
    badgeMultipleChoice.value = Array(props.total_multiple_choice).fill(false)
}

if (storageBadgeEssay != null) {
    badgeEssay.value = JSON.parse(storageBadgeEssay!)
} else {
    badgeEssay.value = Array(props.total_essay).fill(false)
}

if (storageCurrentNumber != null) currentNumber.value = parseInt(storageCurrentNumber)
//@ts-ignore
if (storageCurrentTab != null) currentTab.value = JSON.parse(storageCurrentTab)

const currentQuestion = ref<question>(multipleChoice.length > 0 ? multipleChoice[0] : essay[0]);

if (currentTab.value == 'essay') {
    currentQuestion.value = essay[currentNumber.value]
} else {
    currentQuestion.value = multipleChoice[currentNumber.value]
}

// fungsi fungsi ujian

function navigateMultipleChoice(number: number): void {
    currentNumber.value = number
    currentQuestion.value = multipleChoice[number]
    currentTab.value = 'multiple-choice'

    localStorage.setItem(LOCAL_STORAGE_ITEM.CURRENT_NUMBER, JSON.stringify(currentNumber.value))
    localStorage.setItem(LOCAL_STORAGE_ITEM.CURRENT_TAB, JSON.stringify(currentTab.value))
}

function navigateEssay(number: number): void {
    currentNumber.value = number
    currentQuestion.value = essay[number]
    currentTab.value = 'essay'
}

function previousQuestion(): void {
    if(currentTab.value == 'essay' && props.total_multiple_choice > 0 && currentNumber.value == 0){
        currentNumber.value = props.total_multiple_choice - 1
        currentTab.value = 'multiple-choice'
    }else{
        currentNumber.value--
    }

    currentQuestion.value = essay[currentNumber.value]
}

function nextQuestion(): void {
    if(currentTab.value == 'multiple-choice' && props.total_essay > 0 && currentNumber.value == props.total_multiple_choice - 1){
        currentTab.value = 'essay'
        currentNumber.value = 0
    }else{
        currentNumber.value++
    }

    currentQuestion.value = essay[currentNumber.value]
}

function disabledPrevious() {
    if(props.total_multiple_choice > 0){
        if(currentNumber.value == 0 && currentTab.value == 'multiple-choice') return true
    }else{
        if(currentNumber.value == 0 && currentTab.value == 'essay') return true
    }

    return false
}

function disabledNext() {
    if(props.total_essay > 0){
        if(currentNumber.value == (props.total_essay - 1) && currentTab.value == 'essay') return true
    }else{
        if(currentNumber.value == (props.total_multiple_choice - 1) && currentTab.value == 'multiple-choice') return true
    }

    return false
}

function buttonColor(number: number, tab: 'essay' | 'multiple-choice') {
    let color: 'default' | 'success' | 'primary' | 'info' = 'default'

    if (tab == 'multiple-choice') {

        if (answerMultipleChoice.value[number] != '') color = 'success'

    } else if (tab == 'essay') {

        if (answerEssay.value[number] != '') color = 'success'

    }

    if (number == currentNumber.value && tab == currentTab.value) color = 'info'

    return {
        'color': color,
    }
}

function addBadge() {
    if (currentTab.value == 'multiple-choice') {
        badgeMultipleChoice.value[currentNumber.value] = true
    } else {
        badgeEssay.value[currentNumber.value] = true
    }
}

function removeBadge() {
    if (currentTab.value == 'multiple-choice') {
        badgeMultipleChoice.value[currentNumber.value] = false
    } else {
        badgeEssay.value[currentNumber.value] = false
    }
}

function isHaveBadge(number: number, tab: 'essay' | 'multiple-choice') {
    if (tab == 'multiple-choice') return badgeMultipleChoice.value[number]
    return badgeEssay.value[number]
}

function checkBadge() {
    if (currentTab.value == 'multiple-choice') return badgeMultipleChoice.value[currentNumber.value]
    return badgeEssay.value[currentNumber.value]
}

watch(currentNumber, (newValue) => {
    localStorage.setItem(LOCAL_STORAGE_ITEM.CURRENT_NUMBER, JSON.stringify(newValue))
})

watch(currentTab, (newValue) => {
    localStorage.setItem(LOCAL_STORAGE_ITEM.CURRENT_TAB, JSON.stringify(newValue))
})

watch(() => answerEssay.value, (newValue) => {
    localStorage.setItem(LOCAL_STORAGE_ITEM.ANSWER_ESSAY, JSON.stringify(newValue))
}, {
    deep: true
})

watch(() => answerMultipleChoice.value, (newValue) => {
    localStorage.setItem(LOCAL_STORAGE_ITEM.ANSWER_MULTIPLE_CHOICE, JSON.stringify(newValue))
}, {
    deep: true
})

watch(() => badgeEssay.value, (newValue) => {
    localStorage.setItem(LOCAL_STORAGE_ITEM.BADGE_ESSAY, JSON.stringify(newValue))
}, {
    deep: true
})

watch(() => badgeMultipleChoice.value, (newValue) => {
    localStorage.setItem(LOCAL_STORAGE_ITEM.BADGE_MULTIPLE_CHOICE, JSON.stringify(newValue))
}, {
    deep: true
})

const isDone = (): boolean => {
    const unAnsweredMultipleChoice = answerMultipleChoice.value.filter(function (answer) {
        return answer === '';
    });

    const unAnsweredEssay = answerEssay.value.filter(function (answer) {
        return answer === '';
    });

    if (unAnsweredEssay.length > 0 || unAnsweredMultipleChoice.length > 0) return false

    return true
}

async function sendAnswer() {
    isSubmitting.value = true

    const { data: success, error } = await useFetch(`${config.public.apiUrl}/answer-student-exam/${props.id}?_method=PUT`, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token
        },
        method: 'POST',
        body: {
            answer: answerMultipleChoice.value,
            answer_essay: answerEssay.value
        },
    })

    isSubmitting.value = false

    if (error.value?.statusCode == 500) {
        showError({
            statusCode: 500,
            statusMessage: "Terjadi kesalahan di sisi server, coba hubungi developer!"
        })

    } else if(error.value){
        toaster.show({
            title: 'Gagal!',
            message: error.value?.message,
            icon: 'lucide:x',
            color: 'danger'
        })
    }

    if (success.value) {
        //@ts-ignore
        toaster.show({
            title: 'Sukses!',
            message: 'Berhasil Mengirim Jawaban!',
            icon: 'lucide:check',
            color: 'success'
        })

       status.value = 'done'
    }
}

const onSubmit = async () => {

    if (!isDone()) {
        toaster.show({
            title: 'Warning!',
            message: `Masih ada soal yang belum diselesaikan, mohon selesaikan dahulu`,
            icon: 'lucide:x',
            color: 'danger'
        })

        return
    }

    if (props.last_submit) {
        const isAbleSubmit = useState('able-submit', () => false)
        if (!isAbleSubmit.value) {
            const isModalWarningOpen = useState('last-submit', () => false)
            isModalWarningOpen.value = true
            return
        }
    }

    sendAnswer()
}

const timeOver = useState('time-over', () => false)

watch(timeOver, (newValue) => {
    if (newValue) sendAnswer()
})

if (props.cheating_detector) {
    window.addEventListener('blur', function () {
        const isModalCheatingOpen = useState('cheating-detector',() => false)
        const examStatus = useState('exam-status', () => checkExamSession(props.slug))
        const component = useState('token-component', () => 'ExamStartToken')
        localStorage.setItem('punishment','active')
        component.value = 'ExamPunishmentToken'
        localStorage.removeItem(`exam-${props.slug}`)
        examStatus.value = false
        isModalCheatingOpen.value = true
    })
}
</script>

<template>
    <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 lg:col-span-9">
            <!-- Header -->
            <div class="bg-primary-800 lg:flex items-center rounded-md p-4 hidden mb-6">
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
                        <span>{{ currentTab == 'essay' ? props.total_multiple_choice + currentNumber + 1 : currentNumber + 1 }} Dari {{ props.total_essay + props.total_multiple_choice }}
                            Soal</span>
                    </BaseButton>
                    <ExamTimer :deadline="deadline" :last-submit="props.last_submit" />
                </div>
                <div class="p-5">
                    <BaseParagraph class="mb-4 !text-slate-800 dark:!text-white" v-html="currentQuestion.question">
                        
                    </BaseParagraph>
                    <div class="flex flex-col gap-4" v-if="currentTab == 'multiple-choice'">
                        <BaseRadio :disabled="isSubmitting" v-model="answerMultipleChoice[currentNumber]"
                            color="primary" name="checkbox_colors" value="option1"><span
                                class="!text-slate-800 dark:!text-white" v-html="currentQuestion.option1"></span></BaseRadio>
                        <BaseRadio :disabled="isSubmitting" v-model="answerMultipleChoice[currentNumber]"
                            color="primary" name="checkbox_colors" value="option2"><span
                                class="!text-slate-800 dark:!text-white" v-html="currentQuestion.option2"></span></BaseRadio>
                        <BaseRadio :disabled="isSubmitting" v-model="answerMultipleChoice[currentNumber]"
                            color="primary" name="checkbox_colors" value="option3"><span
                                class="!text-slate-800 dark:!text-white" v-html="currentQuestion.option3"></span></BaseRadio>
                        <BaseRadio :disabled="isSubmitting" v-model="answerMultipleChoice[currentNumber]"
                            color="primary" name="checkbox_colors" value="option4"><span
                                class="!text-slate-800 dark:!text-white" v-html="currentQuestion.option4"></span></BaseRadio>
                        <BaseRadio :disabled="isSubmitting" v-model="answerMultipleChoice[currentNumber]"
                            color="primary" name="checkbox_colors" value="option5"><span
                                class="!text-slate-800 dark:!text-white" v-html="currentQuestion.option5"></span></BaseRadio>
                    </div>
                    <div class="w-full" v-else-if="currentTab == 'essay'">
                        <BaseTextarea :disabled="isSubmitting" v-model="answerEssay[currentNumber]" :rows="10"
                            :max="2048">
                        </BaseTextarea>
                    </div>
                </div>
                <div class="w-full flex justify-between p-3 border-t-[1px] border-slate-200 dark:border-slate-600">
                    <div class="flex gap-2">
                        <BaseButtonIcon @click="previousQuestion()" :disabled="disabledPrevious()" color="info" rounded="md">
                            <Icon name="ph:caret-left-bold" class="size-8" />
                        </BaseButtonIcon>

                        <BaseButtonIcon @click="nextQuestion()" :disabled="disabledNext()" color="info">
                            <Icon name="ph:caret-right-bold" class="size-8" />
                        </BaseButtonIcon>

                        <BaseButtonIcon v-show="!checkBadge()" @click="addBadge()" color="warning">
                            <Icon name="ph:flag-duotone" class="size-8" />
                        </BaseButtonIcon>

                        <BaseButtonIcon v-show="checkBadge()" @click="removeBadge()" color="danger">
                            <Icon name="lucide:flag-off" rounded="md" class="size-8" />
                        </BaseButtonIcon>
                    </div>
                    <BaseButton v-show="isDone" @click="onSubmit()" :disabled="isSubmitting" :loading="isSubmitting"
                        color="primary">Selesai</BaseButton>
                </div>
            </BaseCard>
        </div>
        <BaseCard class="col-span-12 lg:col-span-3 overflow-hidden">
            <div class="w-full bg-primary-500 p-2 text-center">
                <BaseHeading weight="semibold" size="md" class="text-white">
                    <span>Navigasi Soal</span>
                </BaseHeading>
            </div>
            <div v-if="props.total_multiple_choice"
                class="w-full p-3 grid grid-cols-6 md:grid-cols-10 lg:grid-cols-5 gap-3">
                <BaseHeading class="col-span-6 md:col-span-10 lg:col-span-5" weight="semibold" size="md">
                    <span>Pilihan Ganda</span>
                </BaseHeading>

                <BaseButton v-for="i in props.total_multiple_choice" :key="i" @click="navigateMultipleChoice(i - 1)"
                    v-bind="buttonColor(i - 1, 'multiple-choice')" rounded="sm" class="text-white max-w-8 h-auto">
                    {{ i }}

                    <span v-if="isHaveBadge(i - 1, 'multiple-choice')" class="nui-button-badge nui-badge-danger">
                        <span class="nui-button-badge-pulse"></span>
                        <span class="nui-button-badge-inner"></span>
                    </span>
                </BaseButton>
            </div>
            <div v-if="props.total_essay" class="w-full p-3 grid grid-cols-6 md:grid-cols-10 lg:grid-cols-5 gap-3">
                <BaseHeading class="col-span-6 md:col-span-10 lg:col-span-5" weight="semibold" size="md">
                    <span>Soal Essay</span>
                </BaseHeading>

                <BaseButton v-for="i in props.total_essay" :key="i" @click="navigateEssay(i - 1)"
                    v-bind="buttonColor(i - 1, 'essay')" rounded="sm" class="text-white max-w-8 h-auto">
                    {{ i }}

                    <span v-if="isHaveBadge(i - 1, 'essay')" class="nui-button-badge nui-badge-danger">
                        <span class="nui-button-badge-pulse"></span>
                        <span class="nui-button-badge-inner"></span>
                    </span>
                </BaseButton>
            </div>
            <div class="w-full flex justify-center mt-12 mb-4">
                <BaseButton @click="onSubmit()" :disabled="isSubmitting" :loading="isSubmitting" color="primary">Selesai
                </BaseButton>
            </div>
        </BaseCard>
    </div>
</template>