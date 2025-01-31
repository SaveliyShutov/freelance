<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Employer Dashboard</h1>

    <!-- Active Projects -->
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4">Active Projects</h2>
      <div class="space-y-6">
        <div class="border-b pb-4">
          <h3 class="text-lg font-medium">Website Redesign</h3>
          <p class="text-gray-600 mb-2">Due: April 30, 2024</p>
          <p class="text-gray-700">Complete overhaul of company website with modern design principles.</p>
          <div class="mt-3">
            <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full">In Progress</span>
          </div>
        </div>
        <div class="border-b pb-4">
          <h3 class="text-lg font-medium">API Development</h3>
          <p class="text-gray-600 mb-2">Due: May 15, 2024</p>
          <p class="text-gray-700">Building RESTful API for mobile application backend.</p>
          <div class="mt-3">
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">Planning</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Post New Job -->
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-xl font-semibold mb-4">Post a New Job</h2>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Job Title</label>
          <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
        </div>
        <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Post Job
        </button>
      </form>
    </div>
  </div>
</template>