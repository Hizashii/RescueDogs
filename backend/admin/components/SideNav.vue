<template>
    <aside class="w-64 bg-gray-200 dark:bg-gray-700 p-4 min-h-screen">
      <nav>
        <ul class="space-y-2">
          <li><NuxtLink to="/">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/dogs/add">dogs</NuxtLink></li>
          <li><NuxtLink to="/users">Users</NuxtLink></li>
          <li><NuxtLink to="/statistics">Statistics</NuxtLink></li>
          <li><NuxtLink to="/blog">Blog</NuxtLink></li>
          <li><NuxtLink to="/donations">Donation</NuxtLink></li>
          <li><NuxtLink to="/report">Report</NuxtLink></li>
          <li><NuxtLink to="/email">Email</NuxtLink></li>
          <li><NuxtLink to="/settings">Settings</NuxtLink></li>
        </ul>
      </nav>
    </aside>
  </template>
  
  <script setup lang="ts">
  // No special logic needed yet
  </script>
  
  <style scoped>
  /* Add any extra styling if needed */
  </style>
  