<script setup>
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="my-8">
        <BackButton />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <div class="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">Work Application</h1>
          <p class="text-lg text-gray-600 mb-12">Fill out the form below to apply for work opportunities</p>

          <form @submit.prevent="" class="space-y-16">
            <!-- Personal Information -->
            <div class="space-y-8">
              <div class="flex items-center gap-3 border-b border-gray-200 pb-4 mb-8">
                <div class="w-1.5 h-8 bg-indigo-600 rounded-full"></div>
                <h2 class="text-2xl font-semibold text-gray-900">Personal Information</h2>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="form-group">
                  <label class="block text-base font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" class="form-input" required />
                </div>
                <div class="form-group">
                  <label class="block text-base font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" class="form-input" required />
                </div>
              </div>

              <div class="form-group">
                <label class="block text-base font-medium text-gray-700 mb-2">Email</label>
                <input type="email" class="form-input" required />
              </div>

              <div class="form-group">
                <label class="block text-base font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" class="form-input" required />
              </div>
            </div>

            <div class="pt-8">
              <button type="submit"
                class="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>