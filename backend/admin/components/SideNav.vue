<template>
  <aside class="w-64 bg-white border-r border-gray-200 p-6 min-h-screen flex flex-col">
    <nav class="flex-grow">
      <ul class="space-y-1">
        <li>
          <NuxtLink 
            to="/" 
            class="block py-3 px-4 text-lg font-medium text-black hover:bg-blue-50 hover:text-[#1446A0] hover:pl-6 rounded transition-all duration-200 ease-in-out"
          >
            Dashboard
          </NuxtLink>
        </li>
        <li>
          <NuxtLink 
            to="/dogs/add" 
            class="block py-3 px-4 text-lg font-medium text-black hover:bg-blue-50 hover:text-[#1446A0] hover:pl-6 rounded transition-all duration-200 ease-in-out"
          >
            Dogs
          </NuxtLink>
        </li>

      
        <li>
          <NuxtLink 
            to="/Blog" 
            class="block py-3 px-4 text-lg font-medium text-black hover:bg-blue-50 hover:text-[#1446A0] hover:pl-6 rounded transition-all duration-200 ease-in-out"
          >
            Blog
          </NuxtLink>
        </li>

      
        <li>
          <NuxtLink 
            to="/CharityItems" 
            class="block py-3 px-4 text-lg font-medium text-black hover:bg-blue-50 hover:text-[#1446A0] hover:pl-6 rounded transition-all duration-200 ease-in-out"
          >
            Shop
          </NuxtLink>
        </li>

        <li>
          <NuxtLink 
            to="/report" 
            class="block py-3 px-4 text-lg font-medium text-black hover:bg-blue-50 hover:text-[#1446A0] hover:pl-6 rounded transition-all duration-200 ease-in-out"
          >
            Report
          </NuxtLink>
        </li>
  
      </ul>
    </nav>

  </aside>
</template>

<script setup lang="ts">
// No special logic needed yet
</script>

<style scoped>
/* NuxtLink that is active */
.router-link-active {
  color: #1446A0;
  background-color: rgba(20, 70, 160, 0.1);
  font-weight: 600;
}
</style>