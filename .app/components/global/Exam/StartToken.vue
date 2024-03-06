<script setup lang="ts">
import type { exam } from '../../../types'
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'

const props = defineProps<exam>()
const toaster = useToaster()
const token = localStorage.getItem('token')
const status = useState('exam-status',() => checkExamSession(props.slug))
const config = useRuntimeConfig()

const VALIDATION_TEXT = {
  TOKEN_REQUIRED: 'Token harus diiisi',
}

// This is the Zod schema for the form input
// It's used to define the shape that the form data will have
const zodSchema = z.object({
  token: z.string().min(1, VALIDATION_TEXT.TOKEN_REQUIRED),
})

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = computed<FormInput>(() => ({
  token: '',
}))

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
} = useForm({
  validationSchema,
  //@ts-ignore
  initialValues,
})

const onSubmit = handleSubmit(async (values) => {

  const { data: success, error } = await useFetch(`${config.public.apiUrl}/student-exam/${props.id}`, {
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token
    },
    method: 'POST',
    body: values,
  })

  if (error.value?.statusCode == 500) {
    showError({
      statusCode: 500,
      statusMessage: "Terjadi kesalahan di sisi server, coba hubungi developer!"
    })

  } else {
    //@ts-ignore
    setFieldError('token', error.value?.meta.message)
  }

  if (success.value) {
    
    localStorage.setItem(`exam-${props.slug}`,'active');
    //@ts-ignore
    localStorage.setItem(`multiple-choice-${props.slug}`,JSON.stringify(success.value.data.question_multiple_choice))
    //@ts-ignore
    localStorage.setItem(`essay-${props.slug}`,JSON.stringify(success.value.data.question_essay))
    toaster.show({
      title: 'Sukses!',
      message: 'Selamat Mengerjakan!',
      icon: 'lucide:check',
      color: 'success'
    })

    status.value = true
  }
})
</script>

<template>
        <BaseCard shape="curved" elevated-hover class="hover:!border-primary-500 col-span-12 lg:col-span-4 overflow-hidden">
      <div class="bg-primary-500 py-2 w-full text-center">
        <BaseHeading as="h4" size="lg" weight="semibold" class="text-white">
          Masukkan Token
        </BaseHeading>
      </div>
      <form method="POST" @submit.prevent="onSubmit" class="w-full mt-8 flex items-center flex-col p-2">
        <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="token" class="flex-1">
          <BaseInput icon="lucide:key-square" size="md" rounded="md" :error="errorMessage" label="Token Ujian" placeholder="Ex: TOKEN123"
            @update:model-value="handleChange" @blur="handleBlur" />
        </Field>
        <BaseButton type="submit" :disabled="isSubmitting" :loading="isSubmitting" class="my-4" color="primary">
          <span>Mulai Ujian</span>

          <Icon name="lucide:arrow-right" class="me-1 size-4" />
        </BaseButton>
      </form>
    </BaseCard>
</template>