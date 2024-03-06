<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import IMask, { type InputMask } from 'imask'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'

const VALIDATION_TEXT = {
  OLD_PASSWORD_REQUIRED: 'Your current password is required',
  PASSWORD_LENGTH: 'Password must be at least 6 characters',
  PASSWORD_MATCH: 'Passwords do not match',
}

definePageMeta({
  title: 'Settings',
  preview: {
    title: 'Edit profile 4',
    description: 'For editing a user profile',
    categories: ['layouts', 'profile', 'forms'],
    src: '/img/screens/layouts-subpages-profile-edit-4.png',
    srcDark: '/img/screens/layouts-subpages-profile-edit-4-dark.png',
    order: 79,
  },
})

const config = useRuntimeConfig()
const token = localStorage.getItem('token')
// This is the Zod schema for the form input
// It's used to define the shape that the form data will have
const zodSchema = z
  .object({
    current_password: z.string().min(1, VALIDATION_TEXT.OLD_PASSWORD_REQUIRED),
    password: z.string(),
    password_confirmation: z.string(),
  })
  .superRefine((data, ctx) => {
    // This is a custom validation function that will be called
    // before the form is submitted

    if (data.password) {
      if (data.password.length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.PASSWORD_LENGTH,
          path: ['password'],
        })
      }
      if (data.password !== data.password_confirmation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: VALIDATION_TEXT.PASSWORD_MATCH,
          path: ['password_confirmation'],
        })
      }
    }
  })

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>

const { data, pending, error, refresh } = await useFetch('/api/profile')

const validationSchema = toTypedSchema(zodSchema)
const initialValues = computed<FormInput>(() => ({
  current_password: '',
  password: '',
  password_confirmation: ''
}))

const {
  handleSubmit,
  isSubmitting,
  setFieldError,
  meta,
  values,
  errors,
  resetForm,
  setFieldValue,
  setErrors,
} = useForm({
  validationSchema
})

const success = ref(false)
const fieldsWithErrors = computed(() => Object.keys(errors.value).length)

// Ask the user for confirmation before leaving the page if the form has unsaved changes
onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    return confirm('You have unsaved changes. Are you sure you want to leave?')
  }
})

const toaster = useToaster()

// This is where you would send the form data to the server
const onSubmit = handleSubmit(
  async (values) => {
    success.value = false

    const { data, error } = await useFetch(`${config.public.apiUrl}/update-password`, {
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      method: 'PATCH',
      body: values
    })

    if (error.value?.statusCode == 500) {
      toaster.show({
        title: 'Gagal!',
        message: 'Terjadi kesalahan di sisi server, coba hubungi developer!',
        icon: 'lucide:alert-octagon',
        color: 'danger'
      })

      throw createError({
        statusCode: 500,
        statusMessage: 'Server Error'
      })

    } else if (error.value) {
      setFieldError('current_password', error.value?.data.meta.message)
    }

    if (data.value) {
      toaster.clearAll()
      toaster.show({
        title: 'Success',
        message: `Berhasil memperbarui password!`,
        color: 'success',
        icon: 'ph:check',
        closable: true,
      })
    }
    resetForm()
  }
)
</script>

<template>
  <form method="POST" action="" class="w-full pb-16" @submit.prevent="onSubmit">
    <BaseCard>
      <div class="flex items-center justify-between p-4">
        <div>
          <BaseHeading tag="h2" size="sm" weight="medium" lead="normal" class="uppercase tracking-wider">
            Settings
          </BaseHeading>
          <BaseText size="xs" class="text-muted-400">
            Edit your account password
          </BaseText>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton class="w-24" to="/layouts/profile">Cancel</BaseButton>
          <BaseButton type="submit" color="primary" class="w-24" :disabled="isSubmitting" :loading="isSubmitting">Save
          </BaseButton>
        </div>
      </div>
      <div class="p-4">
        <div class="mx-auto max-w-lg space-y-12 py-8">
          <BaseMessage v-if="success" @close="success = false">
            Your settings has been saved!
          </BaseMessage>
          <BaseMessage v-if="fieldsWithErrors" type="danger" @close="() => setErrors({})">
            This form has {{ fieldsWithErrors }} errors, please check them
            before submitting
          </BaseMessage>

          <TairoFormGroup label="Change Password" sublabel="For an improved account security">
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="current_password">
                  <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="password"
                    icon="ph:lock-duotone" placeholder="Old password" autocomplete="current-password"
                    @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="password">
                  <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="password"
                    icon="ph:lock-duotone" placeholder="New password" autocomplete="new-password"
                    @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>
              <div class="col-span-12">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="password_confirmation">
                  <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="password"
                    icon="ph:lock-duotone" placeholder="Repeat new password" @update:model-value="handleChange"
                    @blur="handleBlur" />
                </Field>
              </div>
            </div>
          </TairoFormGroup>
        </div>
      </div>
    </BaseCard>
    <TairoFormSave :disabled="isSubmitting" :loading="isSubmitting" @reset="resetForm" />
  </form>
</template>
