<template>
  <v-container class="py-12">
    <v-row>
      <v-col cols="12">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Job Requests</h1>
      </v-col>
    </v-row>

    <!-- Job Applications -->
    <v-row class="mb-8">
      <v-col cols="12">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">My Applications</h2>
          <div class="space-y-6">
            <div class="border-b pb-4">
              <h3 class="text-lg font-medium">Senior Frontend Developer</h3>
              <p class="text-gray-600 mb-2">Applied on: April 1, 2024</p>
              <p class="text-gray-700 mb-3">Building modern web applications using React and Vue.js</p>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Under Review</span>
            </div>
            <div class="border-b pb-4">
              <h3 class="text-lg font-medium">UI/UX Designer</h3>
              <p class="text-gray-600 mb-2">Applied on: March 28, 2024</p>
              <p class="text-gray-700 mb-3">Creating user-centered designs for web and mobile applications</p>
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full">Interview Scheduled</span>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- Received Applications -->
    <v-row>
      <v-col cols="12">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold mb-4">Received Applications</h2>
          <div class="space-y-6">
            <div class="border-b pb-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium">John Doe</h3>
                  <p class="text-gray-600">Applied for: Full Stack Developer</p>
                  <p class="text-gray-700 mt-2">5 years of experience in web development</p>
                </div>
                <div class="flex gap-2">
                  <button class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                    Accept
                  </button>
                  <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Decline
                  </button>
                </div>
              </div>
            </div>
            <div class="border-b pb-4">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium">Jane Smith</h3>
                  <p class="text-gray-600">Applied for: UI Designer</p>
                  <p class="text-gray-700 mt-2">3 years of experience in UI/UX design</p>
                </div>
                <div class="flex gap-2">
                  <button class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                    Accept
                  </button>
                  <button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>