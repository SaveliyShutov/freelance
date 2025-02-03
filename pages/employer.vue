<script setup>
const profiles = [
  {
    id: 1,
    name: 'James Taylor',
    description: 'Automating and optimizing deployment pipelines for seamless delivery.',
    email: 'james.t@example.com',
    avatar: 'https://i.pravatar.cc/300?img=6',
    rating: 4.9,
    skills: ['Docker', 'Jenkins', 'Terraform', 'Azure']
  }
]
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" class="text-center mb-12">
          <div class="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-400 pb-4">
            Our Amazing Team
          </div>
          <div class="mt-4 text-gray-600 text-lg">Meet the talented individuals behind our success</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="profile in profiles"
          :key="profile.id"
          cols="12"
          class="mb-6"
        >
          <div class="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]">
            <div class="flex flex-col sm:flex-row">
              <div class="p-6 flex items-center justify-center">
                <div class="w-[120px] h-[120px] rounded-full overflow-hidden ring-4 ring-indigo-600/10">
                  <img
                    :src="profile.avatar"
                    :alt="profile.name"
                    class="w-full h-full rounded-full"
                  />
                </div>
              </div>

              <div class="flex-grow p-6">
                <div class="flex items-center justify-between flex-wrap gap-4">
                  <div class="space-y-1">
                    <h3 class="text-2xl font-bold text-gray-800">
                      {{ profile.name }}
                    </h3>
                  </div>
                  <div class="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                    <i class="mdi mdi-star text-amber-600 mr-1 text-sm"></i>
                    <span class="text-amber-700 font-medium">{{ profile.rating }}/5</span>
                  </div>
                </div>

                <p class="mt-4 text-gray-600 leading-relaxed">{{ profile.description }}</p>

                <div class="mt-6 flex flex-wrap gap-2">
                  <span
                    v-for="skill in profile.skills"
                    :key="skill"
                    class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>