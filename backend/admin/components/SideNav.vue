<template>
  <aside class="w-64 bg-white border-r border-gray-200 p-6 min-h-screen flex flex-col">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-[#3D4836]">Admin Panel</h1>
    </div>
    <nav class="flex-grow">
      <ul class="space-y-1">
        <li>
          <NuxtLink 
            to="/" 
            class="block py-3 px-4 text-lg font-medium text-[#3D4836] hover:bg-[#FBF8E9] hover:text-[#3D4836] hover:pl-6 transition-all duration-200 ease-in-out"
          >
            Dashboard
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/dogs/add" 
            class="block py-3 px-4 text-lg font-medium text-[#3D4836] hover:bg-[#FBF8E9] hover:text-[#3D4836] hover:pl-6 transition-all duration-200 ease-in-out"
          >
            Dogs
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/blog" 
            class="block py-3 px-4 text-lg font-medium text-[#3D4836] hover:bg-[#FBF8E9] hover:text-[#3D4836] hover:pl-6 transition-all duration-200 ease-in-out"
          >
            Blog
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/charityitems" 
            class="block py-3 px-4 text-lg font-medium text-[#3D4836] hover:bg-[#FBF8E9] hover:text-[#3D4836] hover:pl-6 transition-all duration-200 ease-in-out"
          >
            Shop
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/report" 
            class="block py-3 px-4 text-lg font-medium text-[#3D4836] hover:bg-[#FBF8E9] hover:text-[#3D4836] hover:pl-6 transition-all duration-200 ease-in-out"
          >
            Reports
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="mt-auto pt-4 border-t border-gray-200">
      <button 
        @click="handleLogout" 
        class="w-full py-3 px-4 text-lg font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 ease-in-out"
      >
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'

const { logout } = useAuth()

async function handleLogout() {
  await logout()
}
</script>

<style scoped>
.router-link-active {
  color: black;
  background-color: #FFFADF;
  font-weight: 600;
}
</style>