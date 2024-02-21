<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { Field, useForm } from 'vee-validate'
import { z } from 'zod'

definePageMeta({
  layout: 'empty',
  title: 'Login',
  preview: {
    title: 'Login 2',
    description: 'For authentication and sign in',
    categories: ['layouts', 'authentication'],
    src: '/img/screens/auth-login-2.png',
    srcDark: '/img/screens/auth-login-2-dark.png',
    order: 97,
  },
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
  trustDevice: z.boolean(),
})

// Zod has a great infer method that will
// infer the shape of the schema into a TypeScript type
type FormInput = z.infer<typeof zodSchema>

const validationSchema = toTypedSchema(zodSchema)
const initialValues = computed<FormInput>(() => ({
  email: '',
  password: '',
  trustDevice: false,
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
  // initialValues,
})

const router = useRouter()
const toaster = useToaster()

// This is where you would send the form data to the server
const onSubmit = handleSubmit(async (values) => {
  // here you have access to the validated form values
  console.log('auth-success', values)

  try {
    // fake delay, this will make isSubmitting value to be true
    await new Promise((resolve, reject) => {
      if (values.password !== 'password') {
        // simulate a backend error
        setTimeout(
          () => reject(new Error('Fake backend validation error')),
          2000,
        )
      }
      setTimeout(resolve, 4000)
    })

    toaster.clearAll()
    toaster.show({
      title: 'Success',
      message: `Welcome back!`,
      color: 'success',
      icon: 'ph:user-circle-fill',
      closable: true,
    })
  } catch (error: any) {
    // this will set the error on the form
    if (error.message === 'Fake backend validation error') {
      setFieldError('password', 'Invalid credentials (use "password")')
    }
    return
  }

  router.push('/dashboards')
})
</script>

<template>
  <div class="dark:bg-muted-800 flex min-h-screen bg-white">
    <div class="bg-muted-100 dark:bg-muted-900 relative hidden w-0 flex-1 items-center justify-center lg:flex lg:w-3/5">
      <div class="mx-auto w-full h-full flex items-center justify-center max-w-4xl">
        <!--Media image-->
        <img class="max-w-xl mx-auto" src="/assets/img/04.png" alt="" width="650" height="350" />
      </div>
    </div>
    <div class="relative flex flex-1 flex-col justify-center px-6 py-12 lg:w-2/5 lg:flex-none">
      <div class="dark:bg-muted-800 relative mx-auto w-full max-w-sm bg-white">
        <div class="flex justify-center mb-10">
          <img src="/assets/img/logo-mischool.png" alt="" width="250" height="50" class="mb-10 block dark:hidden">
          <img src="/assets/img/logo-mischool-dark.png" alt="" width="250" height="50" class="mb-10 hidden dark:block">
        </div>
        <!--Nav-->
        <div class="flex w-full items-center justify-between">
          <NuxtLink to="/dashboards"
            class="text-muted-400 hover:text-primary-500 flex items-center gap-2 font-sans font-medium transition-colors duration-300">
            <Icon name="gg:arrow-long-left" class="h-5 w-5" />
            <span>Kembali ke Dashboard</span>
          </NuxtLink>
          <!--Theme button-->
          <BaseThemeToggle />
        </div>
        <div>
          <BaseHeading as="h2" size="3xl" lead="relaxed" weight="medium" class="mt-6 font-medium">
            Selamat datang
          </BaseHeading>

        </div>

        <!--Form section-->
        <div class="mt-6">
          <div class="mt-5">
            <!--Form-->
            <form method="POST" action="" @submit.prevent="onSubmit" class="mt-6" novalidate>
              <div class="space-y-4">
                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="email">
                  <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="email"
                    label="Email" shape="curved" :classes="{
                      input: 'h-12',
                    }" @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>

                <Field v-slot="{ field, errorMessage, handleChange, handleBlur }" name="password">
                  <BaseInput :model-value="field.value" :error="errorMessage" :disabled="isSubmitting" type="password"
                    label="Password" shape="curved" :classes="{
                      input: 'h-12',
                    }" @update:model-value="handleChange" @blur="handleBlur"/>
                </Field>
              </div>

              <!--Remember-->
              <div class="mt-6 flex items-center justify-between">
                <Field v-slot="{ field, handleChange, handleBlur }" name="trustDevice">
                  <BaseCheckbox :model-value="field.value" :disabled="isSubmitting" shape="curved"
                    label="Tampilkan Password" color="primary" @update:model-value="handleChange" @blur="handleBlur" />
                </Field>

                <!-- <div class="text-xs leading-5">
                  <NuxtLink to="/auth/recover"
                    class="text-primary-600 hover:text-primary-500 font-sans font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline">
                    Forgot your password?
                  </NuxtLink>
                </div> -->
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

            <!-- No account link -->
            <!-- <p class="text-muted-400 mt-4 flex justify-between font-sans text-xs leading-5">
              <span>Don't have an account?</span>
              <NuxtLink to="/auth/signup-2"
                class="text-primary-600 hover:text-primary-500 font-medium underline-offset-4 transition duration-150 ease-in-out hover:underline">
                start your 14-day free trial
              </NuxtLink>
            </p> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
