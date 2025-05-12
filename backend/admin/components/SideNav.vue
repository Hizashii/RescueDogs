<template>
  <aside class="w-64 bg-white border-r border-gray-200 p-6 min-h-screen flex flex-col">
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
            to="/Blog" 
            class="block py-3 px-4 text-lg font-medium text-[#3D4836] hover:bg-[#FBF8E9] hover:text-[#3D4836] hover:pl-6 transition-all duration-200 ease-in-out"
          >
            Blog
          </NuxtLink>
        </li>

      
        <li>
          <NuxtLink 
            to="/CharityItems" 
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
            Report
          </NuxtLink>
        </li>
  
      </ul>
    </nav>

  </aside>
</template>

<script setup lang="ts">
</script>

<style scoped>
.router-link-active {
  color: black;
  background-color: #FFFADF;
  font-weight: 600;
}
</style>