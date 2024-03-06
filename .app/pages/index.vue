<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
  layout: 'empty',
  title: 'Login',
  middleware: 'guest'
})

const VALIDATION_TEXT = {
  EMAIL_REQUIRED: 'A valid email is required',
  PASSWORD_REQUIRED: 'A password is required',
}

// This is the Zod schema for the form input
// It's used to define the shape that the form data will have
const zodSchema = z.object({
  email: z.string().email(VALIDATION_TEXT.EMAIL_REQUIRED),
  password: z.string().min(1, VALIDATION_TEXT.PASSWORD_REQUIRED),
})

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = computed<FormInput>(() => ({
  email: '',
  password: '',
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
  validationSchema,
  //@ts-ignore
  initialValues,
})

const toaster = useToaster()
const config = useRuntimeConfig()
const showPassword = ref(false)

const onSubmit = handleSubmit(async (values) => {

  const { data: success, error } = await useFetch(`${config.public.apiUrl}/login`, {
    headers: {
      'Accept': 'application/json'
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
    setFieldError('password', error.value?.data.meta.message)
  }

  if (success.value) {
    //@ts-ignore
    localStorage.setItem('token', success.value.data.token);
    toaster.show({
      title: 'Sukses!',
      message: 'Berhasil Login!',
      icon: 'lucide:check',
      color: 'success'
    })
    navigateTo('/dashboard')
  }
})
</script>

<template>
  <div class="dark:bg-muted-800 flex min-h-screen bg-white">
    <div class="bg-muted-100 dark:bg-muted-900 relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-3/5">
      <div class="mx-auto w-full h-full flex items-center justify-center max-w-4xl">
        <!--Media image-->
        <img class="max-w-2xl mx-auto" src="/img/illustrations/onboarding/bg-login.png" alt="logo-mischool" />
      </div>
    </div>
    <div class="relative flex flex-1 flex-col justify-center px-6 py-12 lg:w-2/5 lg:flex-none">
      <div class="dark:bg-muted-800 relative mx-auto w-full max-w-sm bg-white">
        <div class="flex justify-center mb-4">
          <img src="/img/logos/logo-text.png" alt="logo-mischool" width="250" height="50" class="mb-10 block dark:hidden">
          <img src="/img/logos/logo-text-dark.png" alt="logo-mischool" width="250" height="50"
            class="mb-10 hidden dark:block">
        </div>
        <!--Nav-->
        <div class="flex w-full items-center justify-end">
          <!--Theme button-->
          <BaseThemeToggle />
        </div>
        <div>
          <BaseHeading as="h2" size="xl" lead="relaxed" weight="medium" class="mt-6 font-medium">
            Selamat Datang
          </BaseHeading>

        </div>

        <!--Form section-->
        <div class="mt-6">
          <div class="mt-5">
            <!--Form-->
            <form method="POST" action="" @submit.prevent="onSubmit" class="mt-6" novalidate>
              <div class="space-y-4">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="email">
                  <BaseInput icon="ph:envelope-simple-duotone" :model-value="field.value" :error="errorMessage"
                    :disabled="isSubmitting" type="email" label="Email" shape="curved" :classes="{
                      input: 'h-12',
                    }" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>

                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="password">
                  <BaseInput icon="ph:lock-duotone" :model-value="field.value" :error="errorMessage"
                    :disabled="isSubmitting" label="Password" :type="showPassword ? 'text' : 'password'" shape="curved"
                    :classes="{
                      input: 'h-12',
                    }" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>
              </div>

              <div class="mt-6 flex items-center justify-between">
                <BaseCheckbox v-model="showPassword" :disabled="isSubmitting" shape="curved" label="Tampilkan Password"
                  color="primary" />

              </div>

              <!--Submit-->
              <div class="mt-6">
                <div class="block w-full rounded-md shadow-sm  text-white font-medium">
                  <BaseButton :disabled="isSubmitting" :loading="isSubmitting" color="primary" type="submit"
                    shape="curved" class="!h-11 w-full">
                    Masuk
                  </BaseButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
