<script setup lang="ts">
const router = useRouter()

const job = ref(
  {
    id: 1,
    title: 'Уборка снега',
    organization: {
      name: 'ООО Жек',
      rating: '4.5',
      shortDescription: 'Жилищно-эксплуатационная контора (ЖЭК) — предприятие жилищно-коммунального хозяйства (ЖКХ), существовавшее в Советском Союзе, а затем в Российской Федерации',
      avatar: 'https://i.pravatar.cc/300',
    },
    postedDate: '2024-04-05',
    workingHours: '08.00-12.00',
    duration: '6 часов',
    adress: 'Пермь, ул. петропавловская д 21',
    description: `Уборка снега — это важная и ответственная задача, особенно в зимний период, когда снежные покровы могут достигать значительных размеров. Она требует профессионального подхода и хорошей организации. Начинается работа с оценки окружающей территории: обходятся дворы, дороги и тротуары, определяются зоны, которые требуют срочной очистки. Команда опытных работников и специализированная техника, такие как снегоуборщики и тракторы, обеспечивают быструю и эффективную уборку. Важным аспектом является не только удаление снега, но и предотвращение образования льда, для чего применяются реагенты и соль. Также стоит отметить необходимость обеспечения безопасности во время работы: важно информировать жителей о проводимых мероприятиях и ограничениях. Уборка снега — это не просто физический труд, а целый комплекс мероприятий, направленных на создание комфортных условий для жизни и работы людей в зимнее время года. Своевременная уборка помогает избежать транспортных заторов и обеспечивает безопасность pedestrians на заснеженных участках.`,
    salaryRange: '500'
  }
)
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="my-8">
        <BackButton />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <v-col cols="12" class="flex justify-between">
            <p class="text-4xl font-bold text-gray-900">{{ job.title }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ job.salaryRange }} ₽ / {{ job.duration }}</p>
          </v-col>
          <v-col cols="12">
            <p>{{ job.description }}</p>
          </v-col>
          <v-col cols="12">
            <div class="flex flex-row justify-between">
              <div class="flex items-center gap-2 mb-2">
                <i class="mdi mdi-map-marker text-indigo-600"></i>
                <p class="font-semibold">{{ job.adress }}</p>
              </div>
              <ApplyButton />
            </div>
            <div class="flex flex-wrap gap-x-6 gap-y-2 mb-3">
              <div class="flex items-center gap-2">
                <i class="mdi mdi-clock-time-three text-indigo-600"></i>
                <p class="font-semibold">{{ job.workingHours }}</p>
              </div>
              <div class="flex items-center gap-2">
                <i class="mdi mdi-calendar-range text-indigo-600"></i>
                <p class="font-semibold"> {{ job.postedDate }}</p>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <ShortProfileCard @click="router.push('/profile/1')" :profile="job.organization" />
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>