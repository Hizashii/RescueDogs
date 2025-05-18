<template>
    <div class="loader-overlay fixed inset-0 flex items-center justify-center bg-amber-50 z-50">
      <div class="loader-container">
        <svg class="bone-loader" width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,15 L100,15" stroke="#FBBF24" stroke-width="5" stroke-linecap="round" />
          <circle cx="10" cy="10" r="8" fill="#FBBF24" />
          <circle cx="10" cy="20" r="8" fill="#FBBF24" />
          <circle cx="110" cy="10" r="8" fill="#FBBF24" />
          <circle cx="110" cy="20" r="8" fill="#FBBF24" />
          
          <circle class="moving-dot" cx="20" cy="15" r="6" fill="#D97706" />
        </svg>
                <p class="mt-6 text-amber-700 font-medium text-center">Loading...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .loader-overlay {
    background-color: #FFFBEB;
  }
  
  .loader-container {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: white;
  }
  
  .bone-loader {
    display: block;
  }
  
  .moving-dot {
    animation: moveAlong 2s infinite ease-in-out;
  }
  
  @keyframes moveAlong {
    0% {
      cx: 20;
      fill: #D97706;
    }
    50% {
      cx: 100;
      fill: #F59E0B;
    }
    100% {
      cx: 20;
      fill: #D97706;
    }
  }
  </style>