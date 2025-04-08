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
     <!-- INTRODUCTION -->
      <!-- TODO: Make the intro section responsive -->
       <!-- TODO: add the read more button -->
     <div class="flex flex-col md:flex-row items-center justify-start bg-[#FFFADF] md:h-[700px] h-auto pb-8 md:pb-0">
       <img src="/img/intro-dog.png" alt="Dog icon" class="w-auto md:h-[700px] h-[300px] object-contain">
       <div class="hidden md:block ml-4"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="700" fill="none"><path stroke="gold" stroke-dasharray="10 10" stroke-width="5" d="M3 0v655"/></svg></div>
       <div class="flex flex-col items-center md:items-start justify-center md:ml-8 px-4 md:px-0">
        <h1 class="text-[24px] md:text-[32px] font-bold py-4 text-center md:text-left">Introducing the <span class="text-[#3D4836]"> PawsSave Animal Protection Association</span></h1>
        <p class="text-[16px] md:text-[20px] py-8 max-w-[500px] text-center md:text-left">Our association was founded in November 2021 because we have helped individually where we could, but we have always believed that we can be more effective by working together, as there are many stray/stray animals and animals living in poor conditions in the area. </p>
       <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <button class="bg-white text-black font-bold text-sm border-logo-yellow md:border-4 border-2 md:w-52 md:min-h-14 w-40 min-h-10">Support our work</button>
        <button class="bg-white text-black font-bold text-sm border-logo-yellow md:border-4 border-2 md:w-52 md:min-h-14 w-40 min-h-10">Apply to volunteer</button>
       </div>
    </div>
     </div>
     <!-- END OF INTRODUCTION -->
        <!-- ANIMALS IN OUR CARE SECTION -->
        <div class="w-full bg-white flex flex-col items-center justify-center py-16 md:py-0 h-[450px] md:h-screen">
            <h1 class="text-3xl md:text-[32px] font-bold text-center text-[#3D4836] pb-8 md:pb-[100px]">Animals in our care</h1>
            <div class="flex flex-row items-center justify-center gap-12 md:gap-0 w-full px-4">

                <div class="flex flex-col items-center justify-center">
                    <img src="/img/yellow-dog-icon.png" alt="Dog icon" class="w-12 md:w-auto h-auto pb-8 md:pb-14">
                    <h1 class="text-2xl md:text-[40px] font-bold text-center text-[#3D6625]">4699</h1>
                    <p class="text-[11px] md:text-[20px] font-semibold text-center">Dogs altogether</p>
                </div>

                <div class="flex flex-col items-center justify-center">
                    <img src="/img/yellow-paw-icon.png" alt="Paw icon" class="w-12 md:w-auto h-auto pb-8 md:pb-14 md:px-16 lg:px-32 xl:px-[300px]">
                    <h1 class="text-2xl md:text-[40px] font-bold text-center text-[#3D6625]">2699</h1>
                    <p class="text-[11px] md:text-[20px] font-semibold text-center">Dogs to adopt</p>
                </div>

                <div class="flex flex-col items-center justify-center">
                    <img src="/img/yellow-trophy-icon.png" alt="Trophy icon" class="w-12 md:w-auto h-auto pb-8 md:pb-14">
                    <h1 class="text-2xl md:text-[40px] font-bold text-center text-[#3D6625]">999</h1>
                    <p class="text-[11px] md:text-[20px] font-semibold text-center">Adopted dogs</p>
                </div>

            </div>
        </div>
        <!-- END OF ANIMALS IN OUR CARE SECTION -->
        <!-- QUOTE -->
         <div class="bg-[#FFE86B] h-[400px] w-full flex flex-row items-center md:justify-around justify-between gap-4 md:gap-8 py-8 md:py-0">

             <div class="md:hidden block mt-[-450px]"><svg xmlns="http://www.w3.org/2000/svg" width="76" height="6" fill="none"><path fill="#3D6625" d="M76 6H0V0h76z"/></svg></div>
             <div class="hidden md:block mt-[-400px]"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="298" fill="none"><path fill="#3D6625" d="M6 0v298H0V0z"/></svg></div>

             <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4 md:px-0">
                  <img src="/img/black-dog.png" alt="Quote icon" class="w-32 md:w-64 h-auto">
                  <h2 class="text-lg md:text-[24px] text-center md:text-start">"Don't just love, <span class="text-[#3D6625] font-bold">protect them</span>.<br>And save them from the dogcatcher."</h2>
             </div>

             <div class="hidden md:block mt-[400px]"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="298" fill="none"><path fill="#3D6625" d="M6 0v298H0V0z"/></svg></div>
             <div class="md:hidden block mt-[450px]"><svg xmlns="http://www.w3.org/2000/svg" width="76" height="6" fill="none"><path fill="#3D6625" d="M76 6H0V0h76z"/></svg></div>
             
         </div>
         <!-- END OF QUOTE -->
          <!-- LATEST NEWS SECTION -->
          <div class="w-full bg-white flex flex-col items-center justify-center py-16 md:py-0 h-auto md:h-screen gap-10">
           <h2 class="text-2xl md:text-[32px] font-semibold text-center md:text-start w-[90%] md:w-[1000px]">SEE OUR LATEST <span class="text-logo-yellow font-bold">NEWS AND <br>EVENTS!</span></h2>

           <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-14 w-[90%] md:w-auto">
            <div class="flex flex-col gap-4 w-full max-w-[200px] mx-auto">
                <div class="aspect-square w-full bg-[url('/img/dogbg.png')] bg-cover bg-center bg-no-repeat"></div>
                <h3 class="text-base md:text-[16px] font-semibold text-start">Free neutering in City</h3>
                <p class="text-sm md:text-[13px] font-light">Elsődleges célunk egy új <br> állatotthon és kutyafuttató <br> létrehozása volt,  ahol a <br> gyepmesteri telepekről vagy <br> túlterhelt menhelyekről .....  </p>
                <button class="font-medium text-sm md:text-[13px] border-[#3D6625] border-2 w-[100px] h-[30px]">Read more</button>
            </div>

            <div class="flex flex-col gap-4 w-full max-w-[200px] mx-auto">
                <div class="aspect-square w-full bg-[url('/img/dogbg.png')] bg-cover bg-center bg-no-repeat"></div>
                <h3 class="text-base md:text-[16px] font-semibold text-start">Free neutering in City</h3>
                <p class="text-sm md:text-[13px] font-light">Elsődleges célunk egy új <br> állatotthon és kutyafuttató <br> létrehozása volt,  ahol a <br> gyepmesteri telepekről vagy <br> túlterhelt menhelyekről .....  </p>
                <button class="font-medium text-sm md:text-[13px] border-[#3D6625] border-2 w-[100px] h-[30px]">Read more</button>
            </div>

            <div class="flex flex-col gap-4 w-full max-w-[200px] mx-auto">
                <div class="aspect-square w-full bg-[url('/img/dogbg.png')] bg-cover bg-center bg-no-repeat"></div>
                <h3 class="text-base md:text-[16px] font-semibold text-start">Free neutering in City</h3>
                <p class="text-sm md:text-[13px] font-light">Elsődleges célunk egy új <br> állatotthon és kutyafuttató <br> létrehozása volt,  ahol a <br> gyepmesteri telepekről vagy <br> túlterhelt menhelyekről .....  </p>
                <button class="font-medium text-sm md:text-[13px] border-[#3D6625] border-2 w-[100px] h-[30px]">Read more</button>
            </div>

            <div class="flex flex-col gap-4 w-full max-w-[200px] mx-auto">
                <div class="aspect-square w-full bg-[url('/img/dogbg.png')] bg-cover bg-center bg-no-repeat"></div>
                <h3 class="text-base md:text-[16px] font-semibold text-start">Free neutering in City</h3>
                <p class="text-sm md:text-[13px] font-light">Elsődleges célunk egy új <br> állatotthon és kutyafuttató <br> létrehozása volt,  ahol a <br> gyepmesteri telepekről vagy <br> túlterhelt menhelyekről .....  </p>
                <button class="font-medium text-sm md:text-[13px] border-[#3D6625] border-2 w-[100px] h-[30px]">Read more</button>
            </div>
           </div>

          </div>
          <!-- END OF LATEST NEWS SECTION -->
</template>