<script setup lang="ts">

</script>


<template>
  <div class="col-span-12">
    <div class="bg-primary-800 flex flex-col items-center rounded-2xl p-4 sm:flex-row">
      <div class="relative h-[168px] w-[280px] shrink-0">
        <img class="pointer-events-none absolute" src="/assets/img/readers 1.png" alt="Doctor illustration" />
      </div>
      <div class="mt-6 grow sm:mt-0">
        <div class="text-center sm:text-left">
          <BaseHeading tag="h1" class="text-white opacity-90">
            <span>Selamat Mengerjakan</span>
          </BaseHeading>
          <BaseParagraph size="sm" class="text-white opacity-70">
            <span>
              Kerjakan dengan sungguh-sungguh dan jangan menyontek
            </span>
          </BaseParagraph>

        </div>
      </div>

    </div>

    <span class="mt-10 mb-10"></span>
  </div>
  <BaseCard rounded="lg" shadow="flat">
    <div class="bg bg-primary-800 p-3 text-white text-base font-medium rounded-lg">
      <BaseHeading class="primary">
        urutan soal
      </BaseHeading>
    </div>
    <BaseParagraph>
      soal
      <img src="" alt="foto soal">
    </BaseParagraph>
    <BaseRadio name="radioChoice" color="primary" label="first choice" />
    <BaseRadio name="radioChoice" color="primary" label="second choice" />
  </BaseCard>


  <div class="flex mt-6 gap-3">
    <BaseButton />
    <BaseButton />
    <BaseButton />
  </div>
</template>
