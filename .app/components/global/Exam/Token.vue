<template>
  <!-- Grid -->
  <div class="grid grid-cols-12 gap-6">
    <!-- Header -->
    <div class="col-span-12">
      <div class="bg-primary-800 flex flex-col items-center rounded-2xl p-4 sm:flex-row">
        <div class="relative h-[168px] w-[280px] shrink-0">
          <img class="pointer-events-none absolute -start-6 -top-20 block dark:hidden sm:-start-10"
            src="/img/illustrations/placeholders/flat/placeholder-search-1-dark.svg" alt="Student Exam illustration" />
          <img class="pointer-events-none absolute -start-6 -top-20 sm:-start-10 hidden dark:block"
            src="/img/illustrations/placeholders/flat/placeholder-search-1.svg" alt="Student Exam illustration" />
        </div>
        <div class="mt-6 grow sm:mt-0">
          <div class="text-center sm:text-left">
            <BaseHeading tag="h1" class="text-white opacity-90">
              <span>Selamat Mengerjakan !</span>
            </BaseHeading>
            <BaseParagraph size="sm" class="text-white opacity-70">
              <span>
                Ujian adalah gerbang menuju pencapaianmu. Hadapilah dengan semangat, fokus, dan keyakinan. Percayalah pada
                kemampuanmu, karena kamu telah mempersiapkan diri dengan baik. Raihlah hasil terbaik dengan ketenangan dan
                kerja keras. Sukses selalu!
              </span>
            </BaseParagraph>
          </div>
        </div>
      </div>
    </div>
    <!-- Token -->
    <BaseCard shape="curved" elevated-hover class="hover:!border-primary-500 p-5 col-span-12 lg:col-span-8">
      <NuxtLink class="grid grid-cols-2 gap-4">
        <div class="relative col-span-2 md:col-span-1">
          <img src="/img/apps/6.png" alt="exam-name" class="w-full rounded-lg" />
        </div>
        <div class="group text-md col-span-2 md:col-span-1">
          <BaseHeading class="my-4">
            <span>Ilmu Pengetahuan Alam</span>
          </BaseHeading>
          <BaseList>
            <BaseListItem subtitle="Ilmu Pengatahuan Alam">
              <Icon name="ph:book-duotone" class="text-md size-5" />
            </BaseListItem>

            <BaseListItem subtitle="40 Menit">
              <Icon name="ph:alarm-duotone" class="text-md size-5" />
            </BaseListItem>

            <BaseListItem subtitle="40 Soal">
              <Icon name="ph:pen-nib-duotone" class="size-5" />
            </BaseListItem>

            <BaseListItem subtitle="Mulai , Jam 10:00 29 Februari 2024">
              <Icon name="ph:calendar-check-duotone" class="size-5" />
            </BaseListItem>

            <BaseListItem subtitle="Selesai, Jam 16:00 29 Februari 2024">
              <Icon name="ph:calendar-x-duotone" class="size-5" />
            </BaseListItem>
          </BaseList>
        </div>
      </NuxtLink>
    </BaseCard>
    <BaseCard shape="curved" elevated-hover class="hover:!border-primary-500 col-span-12 lg:col-span-4 overflow-hidden">
      <div class="bg-primary-500 py-2 w-full text-center">
        <BaseHeading as="h4" size="lg" weight="semibold" class="text-white">
          Masukkan Token
        </BaseHeading>
      </div>
      <div class="w-full mt-8 flex items-center flex-col p-2">
        <div class="flex-1">
          <BaseInput icon="lucide:key-square" size="md" rounded="md" label="Token Ujian" placeholder="Ex: TOKEN123" />
        </div>
        <BaseButton class="my-4" color="primary">
          <span>Mulai Ujian</span>

          <Icon name="lucide:arrow-right" class="me-1 size-4" />
        </BaseButton>
      </div>
    </BaseCard>
  </div>
</template>