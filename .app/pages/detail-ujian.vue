<script setup lang="ts">

const data = [
  {
    title: 'Ilmu Pengetahuan Alam',
    image: '/img/apps/1.jpg',
    name: '/1.jpg',
  },
]
</script>

<template>
  <div>

    <div class="relative">
      <!-- Grid -->
      
      <div class="grid grid-cols-12 gap-6">

        <div class="col-span-12">
          <div class="bg-primary-800 flex flex-col items-center rounded-2xl p-4 sm:flex-row">
            <div class="relative h-[168px] w-[280px] shrink-0">
              <img class="pointer-events-none absolute -start-6 -top-20 sm:-start-10"
                src="/img/illustrations/dashboards/health/doctor.svg" alt="Doctor illustration" />
            </div>
            <div class="mt-6 grow sm:mt-0">
              <div class="text-center sm:text-left">
                <BaseHeading tag="h1" class="text-white opacity-90">
                  <span>Ujian Sekolah</span>
                </BaseHeading>
                <BaseParagraph size="sm" class="text-white opacity-70">
                  <span>
                    Masukkan Token pada Mata Pelajaran yang Anda Pilih</span>
                </BaseParagraph>


              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="grid grid-cols-12 mt-6 gap-5">
        <BaseCard shadow="flat" class="col-span-8 p-3 h-fit">
          <div class="grid grid-cols-3">
            <div class="col-span-2">
              <BaseHeading class="text-[#5D87FF]">
                Ilmu Pengetahuan Alam
              </BaseHeading>
              <BaseParagraph class="">
                Tahun ajaran 2024/2025
              </BaseParagraph>
              <BaseParagraph class="mt-5">senin, 12 September 2023 Jam 08:00
                s/d Rabu, 12 September 2023 Jam 16:00</BaseParagraph>
              <BaseParagraph class="mt-3">60 Menit batas pengerjaan</BaseParagraph>
              <BaseParagraph class="mt-3">30 Soal</BaseParagraph>
            </div>
            <div class="col-span-1">
              <img src="/img/illustrations/dashboards/health/doctor.svg" alt="Ini Foto" class="">
            </div>

          </div>
          <div class="flex border rounded-lg bg-[#FEF5E5] outline-none p-2 justify-center items-center text-[#FFAE1F]">
            <p>Belum Dikerjakan</p>
          </div>
        </BaseCard>

        <BaseCard shadow="flat" class="col-span-4 p-3 h-fit">
          <BaseHeading>
            Kode Token
          </BaseHeading>
          <BaseParagraph class="mt-3">
            Masukkan token disini
            <BaseInput type="text" class="mt-3" />
            <BaseButton color="primary" class="mt-3 w-full">Mulai Ujian</BaseButton>
          </BaseParagraph>
        </BaseCard>
      </div>

      <div class="grid grid-cols-12 mt-6 gap-5">
        <BaseCard shadow="flat" class="col-span-8 p-3 h-fit">
          <div class="grid grid-cols-3">
            <div class="col-span-2">
              <BaseHeading class="text-[#5D87FF]">
                Ilmu Pengetahuan Alam
              </BaseHeading>
              <BaseParagraph class="">
                Tahun ajaran 2024/2025
              </BaseParagraph>
              <BaseParagraph class="mt-5">senin, 12 September 2023 Jam 08:00
                s/d Rabu, 12 September 2023 Jam 16:00</BaseParagraph>
              <BaseParagraph class="mt-3">60 Menit batas pengerjaan</BaseParagraph>
              <BaseParagraph class="mt-3">30 Soal</BaseParagraph>
            </div>
            <div class="col-span-1">
              <img src="/img/illustrations/dashboards/health/doctor.svg" alt="Ini Foto" class="">
            </div>

          </div>
          <div class="flex border rounded-lg bg-[#E6FFFA] outline-none p-2 justify-center items-center text-[#1EBB9E]">
            <p>Sudah Dikerjakan</p>
          </div>
        </BaseCard>

        <BaseCard shadow="flat" class="col-span-4 p-3 h-fit">
          <BaseHeading>
            Kode Token
          </BaseHeading>
          <BaseParagraph class="mt-3">
            Masukkan token disini
            <BaseInput type="text" class="mt-3" />
            <div
              class="flex border rounded-lg bg-[#E6FFFA] outline-none p-2 justify-center items-center text-[#1EBB9E] w-full mt-3 font-bold">
              <p>Selesai</p>
            </div>
          </BaseParagraph>
        </BaseCard>
      </div>



    </div>
  </div>
</template>
