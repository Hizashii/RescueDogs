<template>
    <div>
      <ImageTitle 
        title="SUPPORT OUR WORK!" 
        image="/img/dog-placeholder.png" 
        :overlayOpacity="0.5" 
      />
    </div>
    <div class="container mx-auto gap-10 px-4 py-12">
        <h2 class="text-start text-4xl font-semibold text-[#3D4836] mb-12">HELP US TAKE CARE OF STRAY DOGS, SUPPORT  THEIR<br>
            MEDICAL CARE, REHABILITATION AND SHELTER. </h2>
            <div class="flex flex-row gap-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="766" fill="none"><path fill="#3D4836" d="M3 0H0v766h3z"/></svg>

                <div class="flex flex-col max-w-2xl gap-12 justify-center items-center">
                   <p class="text-start text-[16px] font-semibold">A Mancsmentő Egyesület 14 Kelet-Magyarországi településről  menti az utcán kóborló vagy balesetet szenvedett kutyákat. Legfőbb  célunk az, hogy minél hamarabb jó gazdákhoz juttassuk a rászoruló  állatokat, de az odáig vezető út sokszor hosszú, nehéz és költséges.</p>
                   <p class="text-start text-[16px] font-light">A kutyáknak át kell esniük az oltási programon, parazitamentesítésen, ivartalanításon. A régió kutyáinak a 70-80 %-a szívféreg fertőzött,  amelynek kezelése létfontosságú, de nagyon költséges. Az oltások hiánya  miatt pedig óriási a parvó vírus miatti megbetegedés és  elhalálozás. Mindez és a balesetet szenvedett, vagy súlyosan  bántalmazott kutyák kórházi ellátása is mind-mind óriási terheket ró az  egyesületre. Mivel nálunk nincsen sem átvételi sem örökbefogadási díj,  ezért javarészt a támogatóink folyamatos segítségére van szükségünk.</p>
                    <p class="text-start text-[16px] font-light">Az elmúlt időszakban havonta átlag 25-30 kutyát fogadunk be és a  meglévő állománnyal együtt próbálunk minél többet gazdásítani és közben  túlélni, de sajnos eljutottunk arra a pontra, hogy nem tudjuk  finanszírozni, nincs már mit eladni. Segítségre szorulunk! 
                        Az az álmunk, hogy találunk annyi rendszeres támogatót, akik  tervezhetővé teszik a működésünket és minden hónapot úgy tudunk  elkezdeni, hogy biztosan tudjuk, hogy 1,5 millió forint beérkezik a  számlánkra.Ennyi kell az orvosi költségek kifizetéséhez!</p>
                    <p class="text-start text-[16px] font-medium">Segíts, hogy együtt esélyt adjunk az esélyteleneknek! Adományozz! Akár pár ezer forint is számít!
                        A legnagyobb segítség a rendszeres támogatás, mert  kiszámíthatóvá, tervezhetővé teszi az állatok ellátását! Havi 2000 -  3000 forint rendszeres támogatás az életet jelenti!</p>
                </div>
                <div class="flex flex-col gap-8">
                    <Ticket
                    Amount="2000 Ft"
                    Description="40% of the price of a chip or vaccine"
                     />
                     <Ticket
                    Amount="3000 Ft"
                    Description="60% of the price of a chip or vaccine"
                     />
                     <Ticket
                    Amount="5000 Ft"
                    Description="The price of a chip and combined vaccine"
                     />
                     <Ticket
                    Amount="10 000 Ft"
                    Description="The price of two combined vaccines"
                     />
                     <Ticket
                    Amount="20 000 Ft"
                    Description="The price for all of the vaccines of a dog"
                     />
                     <Ticket
                    Amount="Custom amount"
                    Description=""
                     />
                </div>
            </div>
    </div>
  </template>
  
  




  <script setup lang="ts">
  useHead({
    title: 'Support us'
  })

</script>