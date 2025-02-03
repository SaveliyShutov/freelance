<script setup>
    const { id } = useRoute().params
</script>
<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <v-container class="py-12">
        <v-row>
          <v-col cols="12" md="4" class="mb-6">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="p-8 text-center">
                <div class="mx-auto w-48 h-48 rounded-full overflow-hidden ring-4 ring-indigo-600/10 mb-6">
                  <img
                    src="https://i.pravatar.cc/300?img=1"
                    alt="Sarah Johnson"
                    class="w-full h-full"
                  />
                </div>
                <h1 class="text-2xl font-bold text-gray-800">Sarah Johnson</h1>
                <div class="flex items-center justify-center mt-3 bg-amber-50 px-3 py-1 rounded-full mx-auto w-fit">
                  <i class="mdi mdi-star text-amber-600 mr-1"></i>
                  <span class="text-amber-700 font-medium">4.8/5</span>
                </div>
              </div>
            </div>
          </v-col>
  
          <v-col cols="12" md="8">
            <div class="bg-white rounded-lg shadow-lg p-8">
              <div class="space-y-8">
                <!-- About Section -->
                <div>
                  <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="mdi mdi-account text-indigo-600 mr-2"></i>
                    About
                  </h2>
                  <p class="text-gray-600 leading-relaxed ml-2">
                    Passionate senior developer with over 8 years of experience in full-stack development. 
                    Specialized in building scalable web applications and mentoring junior developers. 
                    Strong advocate for clean code and best practices.
                  </p>
                </div>
  
                <!-- Contact Information -->
                <div>
                  <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="mdi mdi-card-account-details text-indigo-600 mr-2"></i>
                    Contact Information
                  </h2>
                  <div class="space-y-3 ml-2">
                    <div class="flex items-center text-gray-600">
                      <i class="mdi mdi-email text-indigo-600 mr-3"></i>
                      <a href="mailto:sarah.j@example.com" class="hover:text-indigo-600 transition-colors">
                        sarah.j@example.com
                      </a>
                    </div>
                    <div class="flex items-center text-gray-600">
                      <i class="mdi mdi-phone text-indigo-600 mr-3"></i>
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div class="flex items-center text-gray-600">
                      <i class="mdi mdi-map-marker text-indigo-600 mr-3"></i>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                </div>
  
                <!-- Skills -->
                <div>
                  <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="mdi mdi-lightning-bolt text-indigo-600 mr-2"></i>
                    Skills
                  </h2>
                  <div class="flex flex-wrap gap-2 ml-2">
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      Vue.js
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      React
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      Node.js
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      TypeScript
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      AWS
                    </span>
                    <span class="px-3 py-1 rounded-full text-sm font-medium bg-indigo-600/10 text-indigo-600">
                      Docker
                    </span>
                  </div>
                </div>
  
                <!-- Experience -->
                <div>
                  <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <i class="mdi mdi-briefcase text-indigo-600 mr-2"></i>
                    Experience
                  </h2>
                  <div class="space-y-4">
                    <div class="border-l-2 border-indigo-600/20 pl-4 ml-2">
                      <div class="font-semibold text-gray-800">Senior Developer</div>
                      <div class="text-indigo-600/80">TechCorp Inc.</div>
                      <div class="text-sm text-gray-600">2020 - Present</div>
                      <p class="mt-2 text-gray-600">
                        Lead developer for multiple high-impact projects, mentoring junior developers,
                        and implementing best practices across the development team.
                      </p>
                    </div>
                    <div class="border-l-2 border-indigo-600/20 pl-4 ml-2">
                      <div class="font-semibold text-gray-800">Full Stack Developer</div>
                      <div class="text-indigo-600/80">Innovation Labs</div>
                      <div class="text-sm text-gray-600">2018 - 2020</div>
                      <p class="mt-2 text-gray-600">
                        Developed and maintained various web applications using modern technologies
                        and frameworks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>