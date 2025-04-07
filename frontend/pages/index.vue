<template>
    <div class="bg-[url('/img/dogbg.png')] bg-cover bg-center bg-no-repeat md:h-screen h-[60vh] w-full">
        <!-- LANDING PAGE BUTTONS AND TEXT -->
        <div class="flex flex-col items-center justify-center md:h-full h-full">
            <img src="/img/logo_white.png" alt="Mancsmento logo" class="md:w-24 w-16 h-auto">
            <h1 class="md:text-6xl text-3xl font-bold text-white md:pt-4 pt-2">MancsMentő</h1>
            <h1 class="md:text-4xl text-sm text-white md:pt-5 pt-2 text-center">Animal protection association</h1>
            <div class="flex flex-wrap justify-center md:gap-16 gap-4 md:pt-24 pt-8">
                <button class="bg-white text-black font-bold text-sm border-logo-yellow md:border-4 border-2 md:w-52 md:min-h-14 w-40 min-h-10">Adopt</button>
                <button class="bg-white text-black font-bold text-sm border-logo-yellow md:border-4 border-2 md:w-52 md:min-h-14 w-40 min-h-10">Donate</button>
            </div>
        </div>
        <!-- END OF LANDING PAGE BUTTONS AND TEXT -->
       
    </div>
     <!-- CARDS -->
     <div class="flex flex-row flex-wrap justify-center items-center bg-[#FFE65E] md:h-[420px] h-auto pb-8 md:pb-0">
          <div class="md:mt-[-200px] mt-[-50px] flex flex-row flex-wrap justify-center items-center gap-y-8 md:gap-y-0">
            <div class="flex flex-col items-center justify-center md:h-[420px] h-auto md:w-80 w-[90%] bg-white border-4 border-black md:mx-8 mx-4 py-8 md:py-0">
            <img src="/img/dog_icon.png" alt="Dog icon" class="md:w-24 w-16 h-auto mt-4">
            <h1 class="text-2xl font-bold py-4">REPORT A STRAY</h1>
            <p class="text-sm py-8 max-w-52 text-center">If you see a stray dog in the 10 cities we are connected to, report them to us and we'll be on our way asap. Help us help them.</p>
            <button class="bg-white text-black font-bold text-sm border-logo-yellow md:border-4 border-2 md:w-52 md:min-h-14 w-40 min-h-10">REPORT</button>
           </div>
           <div class="flex flex-col items-center justify-center md:h-[420px] h-auto md:w-80 w-[90%] bg-white border-4 border-black md:mx-8 mx-4 py-8 md:py-0">
            <img src="/img/dog_icon.png" alt="Dog icon" class="md:w-24 w-16 h-auto mt-4">
            <h1 class="text-2xl font-bold py-4">ADOPT</h1>
            <p class="text-sm py-8 max-w-52 text-center">Consider adopting a pet from a shelter and give them a chance for a new,  loving life! You may be their key to having a loving family.</p>
            <button class="bg-white text-black font-bold text-sm border-logo-yellow md:border-4 border-2 md:w-52 md:min-h-14 w-40 min-h-10">ADOPT</button>
           </div>
           <div class="flex flex-col items-center justify-center md:h-[420px] h-auto md:w-80 w-[90%] bg-white border-4 border-black md:mx-8 mx-4 py-8 md:py-0">
            <img src="/img/dog_icon.png" alt="Dog icon" class="md:w-24 w-16 h-auto mt-4">
            <h1 class="text-2xl font-bold py-4">DONATE</h1>
            <p class="text-sm py-8 max-w-52 text-center">Consider supporting our work in helping strays and other animals. uhhh placeholder text here. Consider the 1% of tax as well. </p>
            <button class="bg-white text-black font-bold text-sm border-logo-yellow md:border-4 border-2 md:w-52 md:min-h-14 w-40 min-h-10">DONATE</button>
           </div>
          </div>
    </div>
    <!-- END OF CARDS -->
</template>