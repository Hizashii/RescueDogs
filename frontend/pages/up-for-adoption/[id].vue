<template>
  <div class="min-h-screen bg-[#FFFADF] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <div class="flex flex-col md:flex-row gap-32">
        
        <img src="/img/dogbg.png" alt="dog picture" class="w-[320px] h-[400px] object-cover drop-shadow-[20px_20px_0px_#FFD700]" />

        
        <div class="w-full">
          <h1 class="text-4xl font-bold text-[#2C3338] mb-8">{{ post.name }}</h1>
          
          
          <div class="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Status:</p>
              <p class="font-light text-[15px] text-black">{{ post.status }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Came in:</p>
              <p class="font-light text-[15px] text-black">{{ post.cameIn }}</p>
            </div>
            
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Location:</p>
              <p class="font-light text-[15px] text-black">{{ post.location }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Looking for owner:</p>
              <p class="font-light text-[15px] text-black">{{ post.lookingForOwner }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Age:</p>
              <p class="font-light text-[15px] text-black">{{ post.age }}</p>
            </div>
            
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Went out:</p>
              <p class="font-light text-[15px] text-black">{{ post.wentOut }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Breed:</p>
              <p class="font-light text-[15px] text-black">{{ post.breed }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Adapted:</p>
              <p class="font-light text-[15px] text-black">{{ post.adapted }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Size:</p>
              <p class="font-light text-[15px] text-black">{{ post.size }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Vaccination and chips:</p>
              <p class="font-light text-[15px] text-black">{{ post.vaccination }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Fur length:</p>
              <p class="font-light text-[15px] text-black">{{ post.furLength }}</p>
            </div>
            <div class="flex flex-row gap-2">
              <p class="text-black text-sm font-semibold">Relation to people</p>
              <p class="font-light text-[15px] text-black">{{ post.relationToPeople }}</p>
            </div>
          </div>

          <div class="mb-8">
            <p class="text-black leading-relaxed">{{ post.description }}</p>
          </div>
          <div class="mb-8">
            <p class="text-black text-sm font-semibold">More info:</p>
            <p class="text-black leading-relaxed">{{ post.moreInfo }}</p>
          </div>
          
          <button class="text-black px-6 py-5 font-bold border-2 border-[#FFD700] hover:bg-[#FFD700] transition-colors">
            Send an inquiry
          </button>
        </div>
      </div>

      
      <div class="mt-8">
        <div class="flex gap-4">
          <NuxtLink 
            v-for="thumbnail in post.thumbnails" 
            :key="thumbnail.id"
            :to="`/up-for-adoption/${thumbnail.id}`"
            class="w-[150px] h-[190px]  overflow-hidden cursor-pointer "
          >
            <img 
              :src="thumbnail.image"
              :alt="thumbnail.name"
              class="w-full h-full object-cover"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const route = useRoute()
const postId = route.params.id
const post = ref({})

const fakeBlogPosts = {
  'habkarika': {
    name: 'HABKARIKA',
    status: 'In progress',
    cameIn: 'Since Sep 15',
    location: 'Paris',
    lookingForOwner: 'Yes',
    age: '2 years',
    breed: 'Mixed',
    adapted: 'In progress',
    size: 'Bigger than most',
    vaccination: 'In progress',
    furLength: 'Short',
    relationToPeople: 'Shy, very curious',
    description: 'La Habkarika a deux de l\'âge, habite les services offerts pour toutes choses, malgré having habits qui indique un immense top spot sensationnel. Elle est une chienne très gentille qui aime jouer avec les autres chiens. Habite à notre centre pendant que nous préparons pour son adoption.',
    moreInfo: 'Good with dogs, Good with small children, Came from the streets',
    mainImage: '/img/dogbg.png',
    thumbnails: [
      {
        id: 'max',
        name: 'Max',
        image: '/img/doggo.png'
      },
      {
        id: 'luna',
        name: 'Luna',
        image: '/img/intro-dog.png'
      },
      {
        id: 'rocky',
        name: 'Rocky',
        image: '/img/doggo.png'
      }
    ]
  },
  'max': {
    name: 'MAX',
    status: 'Available',
    cameIn: 'Since Aug 20',
    location: 'Paris',
    lookingForOwner: 'Yes',
    age: '3 years',
    breed: 'German Shepherd',
    adapted: 'Yes',
    size: 'Large',
    vaccination: 'Complete',
    furLength: 'Medium',
    relationToPeople: 'Very friendly',
    description: 'Max is a loving German Shepherd who is great with families and other dogs.',
    moreInfo: 'Good with dogs, Good with children, Trained',
    mainImage: '/img/max-main.jpg',
    thumbnails: [
      {
        id: 'habkarika',
        name: 'Habkarika',
        image: '/img/dogbg.png'
      },
      {
        id: 'luna',
        name: 'Luna',
        image: '/img/intro-dog.png'
      },
      {
        id: 'rocky',
        name: 'Rocky',
        image: '/img/doggo.png'
      }
    ]
  },
  'luna': {
    name: 'LUNA',
    status: 'Available',
    cameIn: 'Since Oct 1',
    location: 'Paris',
    lookingForOwner: 'Yes',
    age: '1 year',
    breed: 'Labrador Mix',
    adapted: 'Yes',
    size: 'Medium',
    vaccination: 'Complete',
    furLength: 'Short',
    relationToPeople: 'Friendly',
    description: 'Luna is a playful young Labrador mix who loves to run and play fetch.',
    moreInfo: 'Good with dogs, Good with children, Energetic',
    mainImage: '/img/luna-main.jpg',
    thumbnails: [
      {
        id: 'habkarika',
        name: 'Habkarika',
        image: '/img/dogbg.png'
      },
      {
        id: 'max',
        name: 'Max',    
        image: '/img/doggo.png'
      },
      {
        id: 'rocky',
        name: 'Rocky',
        image: '/img/doggo.png'
      }
    ]
  },
  'rocky': {
    name: 'ROCKY',
    status: 'Available',
    cameIn: 'Since Sep 25',
    location: 'Paris',
    lookingForOwner: 'Yes',
    age: '4 years',
    breed: 'Pitbull Mix',
    adapted: 'In progress',
    size: 'Large',
    vaccination: 'In progress',
    furLength: 'Short',
    relationToPeople: 'Friendly with training',
    description: 'Rocky is a strong and loyal dog who needs an experienced owner.',
    moreInfo: 'Needs training, Good with experienced owners',
    mainImage: '/img/rocky-main.jpg',
    thumbnails: [
      {
        id: 'habkarika',
        name: 'Habkarika',
        image: '/img/dogbg.png'
      },
      {
        id: 'max',
        name: 'Max',
        image: '/img/doggo.png'
      },
      {
        id: 'luna',
        name: 'Luna',
        image: '/img/intro-dog.png'
      }
    ]
  }
}

onMounted(() => {
  post.value = fakeBlogPosts[postId] || {
    name: 'Dog Not Found',
    description: 'Sorry, we couldn\'t find this dog in our database.',
  }
})
</script>