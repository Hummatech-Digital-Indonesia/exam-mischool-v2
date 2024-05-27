<script setup lang="ts">
definePageMeta({
  title: 'Edit Profile',
  preview: {
    title: 'Edit profile 1',
    description: 'For editing a user profile',
    categories: ['layouts', 'profile', 'forms'],
    src: '/img/screens/layouts-subpages-profile-edit-1.png',
    srcDark: '/img/screens/layouts-subpages-profile-edit-1-dark.png',
    order: 76,
  },
})

const user = useUserData()
</script>

<template>
  <div class="w-full pb-16">
    <BaseCard>
      <div class="flex items-center justify-between p-4">
        <div>
          <BaseHeading
            tag="h2"
            size="sm"
            weight="medium"
            lead="normal"
            class="uppercase tracking-wider"
          >
            General info
          </BaseHeading>
          <BaseText size="xs" class="text-muted-400">
            Edit your account's general information
          </BaseText>
        </div>
      </div>
      <div class="p-4">
        <div class="mx-auto max-w-lg space-y-12 py-8">
          <TairoFormGroup
            label="Profile picture"
            sublabel="This is how others will recognize you"
          >
            <div
              class="relative flex flex-col items-center justify-center gap-4"
            >
                <div class="relative h-24 w-24">
                  <img
                    
                    :src="user.photo"
                    alt="Upload preview"
                    class="bg-muted-200 dark:bg-muted-700/60 h-24 w-24 rounded-full object-cover object-center"
                  />
                </div>
            </div>
          </TairoFormGroup>

          <TairoFormGroup
            label="Profile Info"
            sublabel="Others diserve to know you more"
          >
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12">
                  <BaseInput
                    :model-value="user.name"
                    readonly
                    label="Nama"
                    type="text"
                    icon="ph:user-duotone"
                    placeholder="Ex : Jhonny Plate"
                  />
            </div>
              <div class="col-span-12">
                  <BaseInput
                    :model-value="user.email"
                    readonly
                    label="Email"
                    type="email"
                    icon="ph:envelope-simple-duotone"
                    placeholder="Ex : example@gmail.com"
                  />
              </div>
              <div class="col-span-12 md:col-span-6">
                  <BaseInput
                    :model-value="user.classroom"
                    readonly
                    label="Kelas"
                    type="text"
                    icon="ph:chalkboard-teacher-duotone"
                    placeholder="Kelas"
                  />
              </div>
              <div class="col-span-12 md:col-span-6">
                  <BaseInput
                    :model-value="user.nisn"
                    label="NISN"
                    type="text"
                    readonly
                    icon="ph:identification-card-duotone"
                    placeholder="No induk siswa nasional"
                  />
              </div>
            </div>
          </TairoFormGroup>
        </div>
      </div>
    </BaseCard>
  </div>
</template>