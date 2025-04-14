<template>
    <div>
      <ImageTitle 
        title="SUPPORT OUR WORK!" 
        image="/img/dog-placeholder.png" 
        :overlayOpacity="0.5" 
      />
    </div>
    <div class="bg-[#FFFADF]">
      <div class="container mx-auto gap-6 md:gap-10 px-4 py-6 md:py-12">
        <h2 class="text-center md:text-start text-xl md:text-4xl font-semibold text-[#3D4836] mb-6 md:mb-12">HELP US TAKE CARE OF STRAY DOGS, SUPPORT THEIR<br class="hidden md:block">
            MEDICAL CARE, REHABILITATION AND SHELTER. </h2>
            <div class="flex flex-col md:flex-row gap-6 md:gap-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="766" fill="none" class="hidden md:block"><path fill="#3D4836" d="M3 0H0v766h3z"/></svg>

                <div class="flex flex-col max-w-2xl gap-6 md:gap-12 justify-center items-center">
                   <p class="text-center md:text-start text-sm md:text-[16px] font-semibold">A Mancsmentő Egyesület 14 Kelet-Magyarországi településről  menti az utcán kóborló vagy balesetet szenvedett kutyákat. Legfőbb  célunk az, hogy minél hamarabb jó gazdákhoz juttassuk a rászoruló  állatokat, de az odáig vezető út sokszor hosszú, nehéz és költséges.</p>
                   <p class="text-center md:text-start text-sm md:text-[16px] font-light">A kutyáknak át kell esniük az oltási programon, parazitamentesítésen, ivartalanításon. A régió kutyáinak a 70-80 %-a szívféreg fertőzött,  amelynek kezelése létfontosságú, de nagyon költséges. Az oltások hiánya  miatt pedig óriási a parvó vírus miatti megbetegedés és  elhalálozás. Mindez és a balesetet szenvedett, vagy súlyosan  bántalmazott kutyák kórházi ellátása is mind-mind óriási terheket ró az  egyesületre. Mivel nálunk nincsen sem átvételi sem örökbefogadási díj,  ezért javarészt a támogatóink folyamatos segítségére van szükségünk.</p>
                    <p class="text-center md:text-start text-sm md:text-[16px] font-light">Az elmúlt időszakban havonta átlag 25-30 kutyát fogadunk be és a  meglévő állománnyal együtt próbálunk minél többet gazdásítani és közben  túlélni, de sajnos eljutottunk arra a pontra, hogy nem tudjuk  finanszírozni, nincs már mit eladni. Segítségre szorulunk! 
                        Az az álmunk, hogy találunk annyi rendszeres támogatót, akik  tervezhetővé teszik a működésünket és minden hónapot úgy tudunk  elkezdeni, hogy biztosan tudjuk, hogy 1,5 millió forint beérkezik a  számlánkra.Ennyi kell az orvosi költségek kifizetéséhez!</p>
                    <p class="text-center md:text-start text-sm md:text-[16px] font-medium">Segíts, hogy együtt esélyt adjunk az esélyteleneknek! Adományozz! Akár pár ezer forint is számít!
                        A legnagyobb segítség a rendszeres támogatás, mert  kiszámíthatóvá, tervezhetővé teszi az állatok ellátását! Havi 2000 -  3000 forint rendszeres támogatás az életet jelenti!</p>
                </div>
                <div class="flex flex-col gap-4 md:gap-8 mt-6 md:mt-0">
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
    </div>

    <div class="h-auto md:h-[400px] w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-6 md:py-0">
      <div class="hidden md:block mt-[-400px]"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="105" fill="none"><path fill="#3D4836" d="M44.177 58.295c.305.726.813 1.25 1.468 1.514l.009.003c.298.117.615.176.936.176h.035c1.5-.023 3.03-1.297 3.81-3.172.57-1.37.636-2.845.174-3.944-.305-.726-.813-1.25-1.471-1.514l-.008-.002a2.561 2.561 0 0 0-.935-.177c-1.514 0-3.061 1.275-3.854 3.174-.564 1.37-.626 2.843-.164 3.942Zm5.992-8.085c.865.52 1.682 1.011 2.216 1.894 1.474 2.445 2.363 3.92 4.696 3.92 2.333 0 3.224-1.475 4.701-3.92.535-.884 1.354-1.376 2.222-1.898.995-.598 2.023-1.216 2.466-2.431.173-.438.26-.906.257-1.377 0-1.979-1.542-3.59-3.436-3.59-.977 0-2.017.34-3.118.698-1.058.344-2.152.7-3.098.7-.945 0-2.037-.356-3.09-.7-1.1-.356-2.134-.695-3.114-.695-1.891 0-3.43 1.61-3.43 3.59a3.69 3.69 0 0 0 .261 1.376c.444 1.217 1.473 1.835 2.467 2.433Zm12.748 7.75c-.655-.823-1.487-1.275-2.341-1.275-.117 0-.233.008-.349.026-1.782.262-2.892 2.436-2.528 4.955.153 1.058.56 2.044 1.144 2.775.654.82 1.486 1.273 2.34 1.273.117 0 .233-.009.349-.026 1.782-.262 2.892-2.437 2.528-4.955-.152-1.057-.56-2.042-1.143-2.774Zm-8.983-1.25a2.364 2.364 0 0 0-.348-.025c-.855 0-1.686.452-2.341 1.274-.583.732-.989 1.717-1.143 2.775-.364 2.517.746 4.692 2.528 4.955.116.017.232.026.349.026.854-.001 1.686-.453 2.34-1.274.584-.73.991-1.717 1.143-2.777.365-2.517-.746-4.691-2.528-4.953Zm11.097-5.355-.007.003c-.657.264-1.165.787-1.47 1.513-.461 1.101-.396 2.574.174 3.945.789 1.897 2.335 3.172 3.848 3.172.32 0 .637-.06.935-.176l.008-.003c.655-.261 1.163-.787 1.468-1.513.461-1.1.396-2.574-.174-3.944-.788-1.898-2.335-3.173-3.847-3.173-.32 0-.637.06-.935.176Z"/><g clip-path="url(#a)"><path fill="#3D4836" d="M1.19 18.127c.306.726.814 1.25 1.469 1.514l.009.003c.298.117.615.176.935.176h.036c1.5-.023 3.03-1.297 3.809-3.172.57-1.37.636-2.845.175-3.944-.305-.726-.814-1.25-1.472-1.514l-.007-.002a2.558 2.558 0 0 0-.936-.177c-1.514 0-3.06 1.275-3.854 3.174-.563 1.37-.626 2.843-.164 3.942Zm5.993-8.085c.864.52 1.682 1.011 2.216 1.894 1.473 2.445 2.363 3.92 4.696 3.92 2.332 0 3.224-1.475 4.7-3.92.536-.884 1.355-1.376 2.223-1.898.995-.598 2.023-1.216 2.466-2.431.173-.438.26-.906.256-1.377 0-1.979-1.541-3.59-3.435-3.59-.977 0-2.017.34-3.118.698-1.058.345-2.152.7-3.098.7-.946 0-2.037-.355-3.091-.7-1.099-.356-2.134-.695-3.114-.695-1.89 0-3.43 1.61-3.43 3.59-.001.47.088.938.262 1.376.444 1.217 1.472 1.835 2.467 2.433Zm12.747 7.75c-.655-.823-1.486-1.275-2.34-1.275-.117 0-.234.009-.349.026-1.782.262-2.893 2.436-2.528 4.955.152 1.058.56 2.044 1.143 2.775.654.82 1.487 1.273 2.34 1.273.117 0 .234-.009.35-.026 1.781-.262 2.892-2.437 2.527-4.955-.152-1.057-.559-2.042-1.143-2.774Zm-8.982-1.25a2.376 2.376 0 0 0-.349-.025c-.855 0-1.686.452-2.34 1.274-.584.732-.989 1.717-1.143 2.775-.365 2.517.746 4.692 2.528 4.955.115.017.232.026.349.026.853-.001 1.686-.453 2.34-1.274.583-.73.99-1.717 1.143-2.776.364-2.518-.746-4.692-2.528-4.954Zm11.097-5.354-.008.002c-.656.264-1.165.787-1.469 1.513-.461 1.101-.396 2.574.173 3.945.79 1.897 2.336 3.172 3.848 3.172.32 0 .638-.06.936-.176l.008-.003c.655-.261 1.163-.787 1.467-1.513.462-1.1.397-2.573-.173-3.944-.789-1.898-2.335-3.173-3.848-3.173-.32 0-.636.06-.934.177Z"/></g><g clip-path="url(#b)"><path fill="#3D4836" d="M1.19 94.939c.306.726.814 1.25 1.469 1.513l.009.003c.298.117.615.177.935.177h.036c1.5-.023 3.03-1.297 3.809-3.172.57-1.37.636-2.845.175-3.944-.305-.727-.814-1.25-1.472-1.514l-.007-.003a2.56 2.56 0 0 0-.936-.176c-1.514 0-3.06 1.274-3.854 3.174-.563 1.369-.626 2.842-.164 3.942Zm5.993-8.086c.864.52 1.682 1.012 2.216 1.895 1.473 2.444 2.363 3.92 4.696 3.92 2.332 0 3.224-1.476 4.7-3.92.536-.884 1.355-1.377 2.223-1.898.995-.598 2.023-1.216 2.466-2.432.173-.438.26-.905.256-1.376 0-1.98-1.541-3.59-3.435-3.59-.977 0-2.017.339-3.118.697-1.058.345-2.152.701-3.098.701-.946 0-2.037-.356-3.091-.7-1.099-.357-2.134-.695-3.114-.695-1.89 0-3.43 1.61-3.43 3.59-.001.47.088.938.262 1.376.444 1.216 1.472 1.834 2.467 2.432Zm12.747 7.75c-.655-.822-1.486-1.275-2.34-1.275-.117 0-.234.009-.349.026-1.782.262-2.893 2.437-2.528 4.955.152 1.059.56 2.045 1.143 2.776.654.82 1.487 1.272 2.34 1.272.117 0 .234-.008.35-.026 1.781-.262 2.892-2.436 2.527-4.955-.152-1.056-.559-2.041-1.143-2.773Zm-8.982-1.249a2.362 2.362 0 0 0-.349-.026c-.855 0-1.686.453-2.34 1.275-.584.732-.989 1.717-1.143 2.775-.365 2.517.746 4.691 2.528 4.955.115.017.232.025.349.025.853-.001 1.686-.453 2.34-1.273.583-.731.99-1.717 1.143-2.777.364-2.517-.746-4.692-2.528-4.954ZM22.045 88l-.008.003c-.656.264-1.165.787-1.469 1.513-.461 1.1-.396 2.573.173 3.944.79 1.898 2.336 3.173 3.848 3.173.32 0 .638-.06.936-.177l.008-.002c.655-.262 1.163-.787 1.467-1.513.462-1.101.397-2.574-.173-3.945-.789-1.897-2.335-3.172-3.848-3.172-.32 0-.636.06-.934.176Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M28.189 28.188H0V-.002h28.188z"/></clipPath><clipPath id="b"><path fill="#fff" d="M28.189 105H0V76.812h28.188z"/></clipPath></defs></svg></div>

      <div class="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4 md:px-0">
          <img src="/img/black-dog.png" alt="Quote icon" class="w-20 md:w-64 h-auto">
          <div class="flex flex-col gap-2 md:gap-4">
            <h2 class="text-sm md:text-[20px] text-center md:text-start">OFFER 1% OF YOUR TAX, SO THAT WE CAN HELP EVERY ANIMAL IN NEED!</h2>
            <h2 class="text-sm md:text-[20px] text-center md:text-start">TAX NUMBER: <Span class="font-bold text-[#3D6625]">19317988-1-09</Span></h2>
          </div>
      </div>

      <div class="hidden md:block mt-[400px]"><svg xmlns="http://www.w3.org/2000/svg" width="72" height="105" fill="none"><path fill="#3D4836" d="M44.177 58.295c.305.726.813 1.25 1.468 1.514l.009.003c.298.117.615.176.936.176h.035c1.5-.023 3.03-1.297 3.81-3.172.57-1.37.636-2.845.174-3.944-.305-.726-.813-1.25-1.471-1.514l-.008-.002a2.561 2.561 0 0 0-.935-.177c-1.514 0-3.061 1.275-3.854 3.174-.564 1.37-.626 2.843-.164 3.942Zm5.992-8.085c.865.52 1.682 1.011 2.216 1.894 1.474 2.445 2.363 3.92 4.696 3.92 2.333 0 3.224-1.475 4.701-3.92.535-.884 1.354-1.376 2.222-1.898.995-.598 2.023-1.216 2.466-2.431.173-.438.26-.906.257-1.377 0-1.979-1.542-3.59-3.436-3.59-.977 0-2.017.34-3.118.698-1.058.344-2.152.7-3.098.7-.945 0-2.037-.356-3.09-.7-1.1-.356-2.134-.695-3.114-.695-1.891 0-3.43 1.61-3.43 3.59a3.69 3.69 0 0 0 .261 1.376c.444 1.217 1.473 1.835 2.467 2.433Zm12.748 7.75c-.655-.823-1.487-1.275-2.341-1.275-.117 0-.233.008-.349.026-1.782.262-2.892 2.436-2.528 4.955.153 1.058.56 2.044 1.144 2.775.654.82 1.486 1.273 2.34 1.273.117 0 .233-.009.349-.026 1.782-.262 2.892-2.437 2.528-4.955-.152-1.057-.56-2.042-1.143-2.774Zm-8.983-1.25a2.364 2.364 0 0 0-.348-.025c-.855 0-1.686.452-2.341 1.274-.583.732-.989 1.717-1.143 2.775-.364 2.517.746 4.692 2.528 4.955.116.017.232.026.349.026.854-.001 1.686-.453 2.34-1.274.584-.73.991-1.717 1.143-2.777.365-2.517-.746-4.691-2.528-4.953Zm11.097-5.355-.007.003c-.657.264-1.165.787-1.47 1.513-.461 1.101-.396 2.574.174 3.945.789 1.897 2.335 3.172 3.848 3.172.32 0 .637-.06.935-.176l.008-.003c.655-.261 1.163-.787 1.468-1.513.461-1.1.396-2.574-.174-3.944-.788-1.898-2.335-3.173-3.847-3.173-.32 0-.637.06-.935.176Z"/><g clip-path="url(#a)"><path fill="#3D4836" d="M1.19 18.127c.306.726.814 1.25 1.469 1.514l.009.003c.298.117.615.176.935.176h.036c1.5-.023 3.03-1.297 3.809-3.172.57-1.37.636-2.845.175-3.944-.305-.726-.814-1.25-1.472-1.514l-.007-.002a2.558 2.558 0 0 0-.936-.177c-1.514 0-3.06 1.275-3.854 3.174-.563 1.37-.626 2.843-.164 3.942Zm5.993-8.085c.864.52 1.682 1.011 2.216 1.894 1.473 2.445 2.363 3.92 4.696 3.92 2.332 0 3.224-1.475 4.7-3.92.536-.884 1.355-1.376 2.223-1.898.995-.598 2.023-1.216 2.466-2.431.173-.438.26-.906.256-1.377 0-1.979-1.541-3.59-3.435-3.59-.977 0-2.017.34-3.118.698-1.058.345-2.152.7-3.098.7-.946 0-2.037-.355-3.091-.7-1.099-.356-2.134-.695-3.114-.695-1.89 0-3.43 1.61-3.43 3.59-.001.47.088.938.262 1.376.444 1.217 1.472 1.835 2.467 2.433Zm12.747 7.75c-.655-.823-1.486-1.275-2.34-1.275-.117 0-.234.009-.349.026-1.782.262-2.893 2.436-2.528 4.955.152 1.058.56 2.044 1.143 2.775.654.82 1.487 1.273 2.34 1.273.117 0 .234-.009.35-.026 1.781-.262 2.892-2.437 2.527-4.955-.152-1.057-.559-2.042-1.143-2.774Zm-8.982-1.25a2.376 2.376 0 0 0-.349-.025c-.855 0-1.686.452-2.34 1.274-.584.732-.989 1.717-1.143 2.775-.365 2.517.746 4.692 2.528 4.955.115.017.232.026.349.026.853-.001 1.686-.453 2.34-1.274.583-.73.99-1.717 1.143-2.776.364-2.518-.746-4.692-2.528-4.954Zm11.097-5.354-.008.002c-.656.264-1.165.787-1.469 1.513-.461 1.101-.396 2.574.173 3.945.79 1.897 2.336 3.172 3.848 3.172.32 0 .638-.06.936-.176l.008-.003c.655-.261 1.163-.787 1.467-1.513.462-1.1.397-2.573-.173-3.944-.789-1.898-2.335-3.173-3.848-3.173-.32 0-.636.06-.934.177Z"/></g><g clip-path="url(#b)"><path fill="#3D4836" d="M1.19 94.939c.306.726.814 1.25 1.469 1.513l.009.003c.298.117.615.177.935.177h.036c1.5-.023 3.03-1.297 3.809-3.172.57-1.37.636-2.845.175-3.944-.305-.727-.814-1.25-1.472-1.514l-.007-.003a2.56 2.56 0 0 0-.936-.176c-1.514 0-3.06 1.274-3.854 3.174-.563 1.369-.626 2.842-.164 3.942Zm5.993-8.086c.864.52 1.682 1.012 2.216 1.895 1.473 2.444 2.363 3.92 4.696 3.92 2.332 0 3.224-1.476 4.7-3.92.536-.884 1.355-1.377 2.223-1.898.995-.598 2.023-1.216 2.466-2.432.173-.438.26-.905.256-1.376 0-1.98-1.541-3.59-3.435-3.59-.977 0-2.017.339-3.118.697-1.058.345-2.152.701-3.098.701-.946 0-2.037-.356-3.091-.7-1.099-.357-2.134-.695-3.114-.695-1.89 0-3.43 1.61-3.43 3.59-.001.47.088.938.262 1.376.444 1.216 1.472 1.834 2.467 2.432Zm12.747 7.75c-.655-.822-1.486-1.275-2.34-1.275-.117 0-.234.009-.349.026-1.782.262-2.893 2.437-2.528 4.955.152 1.059.56 2.045 1.143 2.776.654.82 1.487 1.272 2.34 1.272.117 0 .234-.008.35-.026 1.781-.262 2.892-2.436 2.527-4.955-.152-1.056-.559-2.041-1.143-2.773Zm-8.982-1.249a2.362 2.362 0 0 0-.349-.026c-.855 0-1.686.453-2.34 1.275-.584.732-.989 1.717-1.143 2.775-.365 2.517.746 4.691 2.528 4.955.115.017.232.025.349.025.853-.001 1.686-.453 2.34-1.273.583-.731.99-1.717 1.143-2.777.364-2.517-.746-4.692-2.528-4.954ZM22.045 88l-.008.003c-.656.264-1.165.787-1.469 1.513-.461 1.1-.396 2.573.173 3.944.79 1.898 2.336 3.173 3.848 3.173.32 0 .638-.06.936-.177l.008-.002c.655-.262 1.163-.787 1.467-1.513.462-1.101.397-2.574-.173-3.945-.789-1.897-2.335-3.172-3.848-3.172-.32 0-.636.06-.934.176Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M28.189 28.188H0V-.002h28.188z"/></clipPath><clipPath id="b"><path fill="#fff" d="M28.189 105H0V76.812h28.188z"/></clipPath></defs></svg></div>
      
    </div>
    <!-- TODO: Add card animations for charity items -->
    <div class="bg-[#FFFADF] h-auto md:h-screen flex flex-col justify-center items-center py-8 md:py-0">
     <div class="container mx-auto gap-6 md:gap-10 px-4 py-6 md:py-12">
      <h2 class="text-center md:text-start text-xl md:text-4xl font-semibold text-[#3D4836] mb-6 md:mb-12">CHECK OUT OUR CHARITY ITEMS!</h2>
      <div class="flex flex-col md:flex-row gap-6 md:gap-12 justify-center items-center">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          <div class="flex flex-col w-full md:w-[250px] h-auto md:h-[460px]">
            <img src="/img/charity-item.png" alt="Charity item 1" class="w-full h-auto">
            <div class="flex flex-col justify-center items-center gap-2 font-light bg-[#FFE65E] p-2">
              <h2 class="text-center text-sm md:text-[17px] font-semibold text-[#3D4836]">DOG BANDANA</h2>
              <p class="text-center text-sm md:text-[17px] font-semibold text-[#3D4836]">2500 Ft</p>
              <p class="text-center text-xs md:text-[12px] font-light max-w-[190px]">Order a sweet neckwear for your companion. Some other placeholder text. Dogwear for spring.</p>
              <button class="bg-white text-black w-[115px] h-[30px] font-regular text-[13px]">Order</button>
            </div>
          </div>

          <div class="flex flex-col w-full md:w-[250px] h-auto md:h-[460px]">
            <img src="/img/charity-item.png" alt="Charity item 1" class="w-full h-auto">
            <div class="flex flex-col justify-center items-center gap-2 font-light bg-[#FFE65E] p-2">
              <h2 class="text-center text-sm md:text-[17px] font-semibold text-[#3D4836]">DOG BANDANA</h2>
              <p class="text-center text-sm md:text-[17px] font-semibold text-[#3D4836]">2500 Ft</p>
              <p class="text-center text-xs md:text-[12px] font-light max-w-[190px]">Order a sweet neckwear for your companion. Some other placeholder text. Dogwear for spring.</p>
              <button class="bg-white text-black w-[115px] h-[30px] font-regular text-[13px]">Order</button>
            </div>
          </div>

          <div class="flex flex-col w-full md:w-[250px] h-auto md:h-[460px]">
            <img src="/img/charity-item.png" alt="Charity item 1" class="w-full h-auto">
            <div class="flex flex-col justify-center items-center gap-2 font-light bg-[#FFE65E] p-2">
              <h2 class="text-center text-sm md:text-[17px] font-semibold text-[#3D4836]">DOG BANDANA</h2>
              <p class="text-center text-sm md:text-[17px] font-semibold text-[#3D4836]">2500 Ft</p>
              <p class="text-center text-xs md:text-[12px] font-light max-w-[190px]">Order a sweet neckwear for your companion. Some other placeholder text. Dogwear for spring.</p>
              <button class="bg-white text-black w-[115px] h-[30px] font-regular text-[13px]">Order</button>
            </div>
          </div>

          <div class="flex flex-col w-full md:w-[250px] h-auto md:h-[460px]">
            <img src="/img/charity-item.png" alt="Charity item 1" class="w-full h-auto">
            <div class="flex flex-col justify-center items-center gap-2 font-light bg-[#FFE65E] p-2">
              <h2 class="text-center text-sm md:text-[17px] font-semibold text-[#3D4836]">DOG BANDANA</h2>
              <p class="text-center text-sm md:text-[17px] font-semibold text-[#3D4836]">2500 Ft</p>
              <p class="text-center text-xs md:text-[12px] font-light max-w-[190px]">Order a sweet neckwear for your companion. Some other placeholder text. Dogwear for spring.</p>
              <button class="bg-white text-black w-[115px] h-[30px] font-regular text-[13px]">Order</button>
            </div>
          </div>
          
        </div>
      </div>
      <div class="flex flex-col justify-center items-center gap-2 mt-6 md:mt-0">
          <h2 class="text-center text-sm md:text-[17px] font-regular text-[#3D4836]">Load more</h2>
          <button><img src="/img/load-more.png" alt="Load more"></button>
        </div>
     </div>
    </div>

    <div class="flex flex-col md:flex-row items-center justify-start md:h-[500px] h-auto pb-8 md:pb-0">
       <img src="/img/doggo.png" alt="Dog icon" class="w-auto md:h-[500px] h-[300px] object-contain">
       <div class="hidden md:block ml-4"><svg xmlns="http://www.w3.org/2000/svg" width="6" height="500" fill="none"><path stroke="gold" stroke-dasharray="10 10" stroke-width="5" d="M3 0v500"/></svg></div>
       <div class="flex flex-col items-center md:items-start justify-center md:ml-8 px-4 md:px-0">
        <h1 class="text-xl md:text-[32px] font-bold py-4 text-center md:text-left">OTHER SUPPORT<br>INFORMATION:</h1>
        <p class="text-sm md:text-[20px] py-4 max-w-[500px] text-center md:text-left text-[#3D6625]"><span class="font-semibold">Paypal:</span><br>info.mancsmento@gmail.com</p>
        <p class="text-sm md:text-[20px] py-4 max-w-[500px] text-center md:text-left text-[#3D6625]"><span class="font-semibold">Bank donation:</span><br>Mancsmentő Állatvédő Egyesület<br>Számlaszám: 50436604-10003671<br>IBAN: HU42504366041000367100000000<br>SWIFT: MKKBHUHB</p>
    </div>
     </div>
  </template>
  
  <script setup lang="ts">
  useHead({
    title: 'Support us'
  })
  </script>