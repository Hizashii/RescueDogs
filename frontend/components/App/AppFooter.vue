<template>
    <footer class="flex justify-center items-center bg-[#3D4836] w-full py-12 px-4 md:px-8">
        <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <!------------------------------------------------------------------ LEFT SIDE OF INFO ------------------------------------------------------------------ -->
            <div class="text-white text-center md:text-left">
                <h2 class="font-semibold text-xl mb-4 pt-12 md:pt-0 font-poppins">PAW RESCUE ASSOCIATION:</h2>
                <p class="text-base">4163 Szerep,</p>
                <p class="text-base">Kemenyi Street 13</p>
                <div class="mt-4">
                    <p class="text-base">1% of Tax number:</p>
                    <p class="text-base">19317988-1-09</p>
                </div>
                <div class="mt-8">
                    <h2 class="font-semibold text-xl mb-2 font-poppins">SUPPORT US:</h2>
                    <p class="text-base">Mancsmentő Állatvédő Egyesület</p>
                    <p class="text-base">50436604-10003671-00000000</p>
                </div>
            </div>
            <!------------------------------------------------------------------ YELLOW COLUMN ------------------------------------------------------------------ -->
            <div class="bg-[#FFD700] order-first md:order-none -my-12 md:-my-12 mx-auto w-full max-w-[500px]">
                <div class="flex flex-col items-center justify-between h-full py-8 px-4">
                    <div class="flex flex-col items-center">
                        <img src="/img/logo.png" alt="MancsMentő" class="w-12 mb-4">
                        <h1 class="text-2xl font-bold mb-8 font-poppins">MancsMentő</h1>
                        <img src="/img/doggy.png" alt="Dog Silhouette" class="w-32">
                    </div>
                    <p class="text-sm font-poppins">&copy; 2025 MancsMentő</p>
                </div>
            </div>
            <!------------------------------------------------------------------ RIGHT SIDE OF INFO ------------------------------------------------------------------ -->
            <div class="text-white text-center md:text-right">
                <h2 class="font-semibold text-xl mb-4 font-poppins">CONTACT US:</h2>
                <a href="mailto:info@mancsmentő.hu" class="block text-base hover:underline">info@mancsmentő.hu</a>
                <a href="tel:+36209183117" class="block text-base hover:underline">+36 20 918 3117</a>
                
                <div class="flex justify-center md:justify-end gap-4 mt-4">
                    <!-- TODO: Add social links -->
                    <a href="#" class="text-white hover:text-[#FFD700] transition-colors">
                        <i class="fab fa-facebook-f text-2xl"></i>
                    </a>
                    <a href="#" class="text-white hover:text-[#FFD700] transition-colors">
                        <i class="fab fa-instagram text-2xl"></i>
                    </a>
                </div>
                <div class="mt-8">
                    <h2 class="font-semibold text-xl mb-4 font-poppins">OPENING HOURS:</h2>
                    <p class="text-base">Monday - Friday: 8:30 - 10:30</p>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
useHead({
    link: [
        {
            rel: 'stylesheet',
            href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
        }
    ]
})
</script>
