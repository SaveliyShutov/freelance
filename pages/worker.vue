<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Worker Dashboard</h1>
    
    <!-- Profile Section -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4">My Profile</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-medium mb-2">Skills</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">Web Development</span>
            <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">React</span>
            <span class="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">Node.js</span>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-medium mb-2">Experience</h3>
          <p class="text-gray-600">5 years of professional experience</p>
        </div>
      </div>
    </div>

    <!-- Available Work -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Available Work</h2>
      <div class="space-y-6">
        <div class="border-b pb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium">Frontend Developer Needed</h3>
              <p class="text-gray-600 mb-2">Posted: April 5, 2024</p>
              <p class="text-gray-700">Building a responsive e-commerce website using React and Tailwind CSS.</p>
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">React</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Tailwind CSS</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">E-commerce</span>
              </div>
              <p class="text-green-600 font-medium mt-2">$50-70/hour</p>
            </div>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Apply Now
            </button>
          </div>
        </div>

        <div class="border-b pb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium">Full Stack Developer</h3>
              <p class="text-gray-600 mb-2">Posted: April 4, 2024</p>
              <p class="text-gray-700">Developing a social media platform using Node.js and Vue.js.</p>
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Node.js</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Vue.js</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">MongoDB</span>
              </div>
              <p class="text-green-600 font-medium mt-2">$60-80/hour</p>
            </div>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Apply Now
            </button>
          </div>
        </div>

        <div class="border-b pb-4">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-medium">UI/UX Designer</h3>
              <p class="text-gray-600 mb-2">Posted: April 3, 2024</p>
              <p class="text-gray-700">Designing user interfaces for a mobile fitness application.</p>
              <div class="flex flex-wrap gap-2 mt-3">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Figma</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">UI Design</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Mobile</span>
              </div>
              <p class="text-green-600 font-medium mt-2">$45-65/hour</p>
            </div>
            <button class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>