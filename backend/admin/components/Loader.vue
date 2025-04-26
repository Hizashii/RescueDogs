<template>
    <div class="loader-container">
      <!-- Simple dog house with paw print -->
      <svg class="dog-house" width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <!-- House/shelter shape -->
        <path d="M40,10 L10,35 L10,65 L70,65 L70,35 L40,10 Z" fill="none" stroke="#FFD700" stroke-width="3" />
        <!-- Door -->
        <path d="M32,65 L32,45 L48,45 L48,65" fill="none" stroke="#FFD700" stroke-width="3" />
        
        <!-- Paw print that moves into the house -->
        <g class="paw-print">
          <circle cx="40" cy="80" r="4" fill="#FFD700" />
          <circle cx="35" cy="76" r="2" fill="#FFD700" />
          <circle cx="45" cy="76" r="2" fill="#FFD700" />
          <circle cx="35" cy="84" r="2" fill="#FFD700" />
          <circle cx="45" cy="84" r="2" fill="#FFD700" />
        </g>
      </svg>
      
      <!-- Loading text -->
      <p class="loading-text">Loading...</p>
    </div>
  </template>
  
  <style scoped>
  .loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .dog-house {
    margin-bottom: 1rem;
  }
  
  .loading-text {
    color: #3D4836;
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  .paw-print {
    animation: enterHouse 1.8s infinite ease-in-out;
  }
  
  @keyframes enterHouse {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    70% {
      transform: translateY(-35px) scale(0.8);
      opacity: 1;
    }
    100% {
      transform: translateY(-50px) scale(0.6);
      opacity: 0;
    }
  }
  </style>