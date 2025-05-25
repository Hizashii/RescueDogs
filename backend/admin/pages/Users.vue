<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Users</h1>
      <p>This is the user management page. Here you can manage user accounts.</p>
    </div>
  </template>
  
  <script setup lang="ts">
const isAdmin = useCookie('isAdmin').value
if (!isAdmin) {
  navigateTo('/login')
}  </script>

