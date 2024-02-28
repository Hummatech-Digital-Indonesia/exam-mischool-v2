<!-- eslint-disable prettier-vue/prettier -->
<script setup lang="ts">
type LayoutDisplay =
  | 'condensed'
  | 'horizontal-scroll'
  | 'expanded-sm'
  | 'expanded-md'
  | 'expanded-lg'
  | 'expanded-xl'

const props = withDefaults(
  defineProps<{
    display?: LayoutDisplay
  }>(),
  {
    display: 'expanded-lg',
  },
)

//@ts-ignore
const config = useAppConfig().tairo.topnav?.footer

const year = new Date().getFullYear()
</script>

<!-- eslint-disable prettier-vue/prettier -->
<template>
  <footer class="dark:bg-muted-900 border-muted-200 dark:border-muted-700 bg-muted-50 relative border-t">
    <NuxtLink v-if="config?.logoSeparator?.component" to="/" aria-label="Go to Homepage"
      class="dark:bg-muted-900 bg-muted-50 absolute inset-x-0 -top-4 mx-auto flex h-9 w-14 items-center justify-center">
      <TairoLogo class="max-w-24" />
    </NuxtLink>
    <div
      class=" ltablet:flex-row mx-auto flex flex-col items-center justify-between px-6 py-8 sm:flex md:flex-row lg:flex-row"
      :class="[
        props.display === 'expanded-sm' && 'mx-auto w-full max-w-5xl',
        props.display === 'expanded-md' && 'mx-auto w-full max-w-6xl',
        props.display === 'expanded-lg' && 'mx-auto w-full max-w-7xl',
        props.display === 'expanded-xl' && 'mx-auto w-full',
      ]">
      <NuxtLink v-if="config?.logo?.component" to="/" aria-label="Go to Homepage"
        class="ltablet:w-1/5 mx-auto flex md:mx-0 md:max-w-md lg:w-1/5">
        <TairoLogoText class="mx-auto md:mx-0" />
      </NuxtLink>
      <div v-else class="ltablet:w-1/5 block w-full lg:w-1/5"></div>

      <div
        class="text-muted-500 dark:text-muted-400 ltablet:w-1/5 ltablet:justify-end ltablet:mt-0 mt-6 flex w-full items-center justify-center text-sm lg:mt-0 lg:w-1/5 lg:justify-end">
        <span v-if="config?.copyright?.name && config?.copyright?.to" class="inline-flex gap-1">
          <span>©</span>
          <NuxtLink :to="config.copyright.to" target="_blank" rel="noopener"
            class="text-muted-600 hover:text-primary-500 dark:text-muted-200 dark:hover:text-primary-400 text-sm transition-colors duration-300">
            {{ config.copyright.name }}
          </NuxtLink>
          <span v-if="config?.copyright?.since">{{ config.copyright.since }}-{{ year }}.</span>
        </span>
      </div>
    </div>
  </footer>
</template>