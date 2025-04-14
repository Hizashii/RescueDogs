<template>
    <div class="min-h-screen flex flex-col items-center bg-[#FFE86B]">
        <h1 class="text-3xl font-bold mb-8 text-black mt-32">Report a stray</h1>
        <form class="w-full max-w-[400px] md:max-w-[700px] mb-32">
            
            <div class="mb-4">
                <label class="block md:text-xl text-base font-bold mb-2" for="name">
                    Name
                </label>
                <input class="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text">
            </div>

            <div class="flex flex-wrap -mx-3 mb-4">
                <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <label class="block md:text-xl text-base font-bold mb-2" for="phone">
                        Phone
                    </label>
                    <input class="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="tel">
                </div>
                <div class="w-full md:w-1/2 px-3">
                    <label class="block md:text-xl text-base font-bold mb-2" for="email">
                        Email
                    </label>
                    <input class="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email">
                </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-4">
                 <div class="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                <label class="block md:text-xl text-base font-bold mb-2" for="dog-city">
                    <!-- TODO: make this a dropdown with 10 cities -->
                    City where is reported dog
                </label>
                <input class="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dog-city" type="text">
            </div>

             <div class="w-full md:w-1/2 px-3">
                <label class="block md:text-xl text-base font-bold mb-2" for="dog-picture">
                    Picture of a dog
                </label>
                <div class="flex items-center space-x-4">
                     <label class="cursor-pointer border border-black border-4 text-[14px] text-black text-center font-bold py-2 px-4 w-36">
                        Upload
                        <input type="file" id="dog-picture" class="hidden">
                    </label>
                    <span class="text-sm font-bold">Max. file size: 32 MB.</span>
                </div>

            </div>
            </div>

           

            <div class="mb-4">
                <label class="block md:text-xl text-base font-bold mb-2" for="reporter-city">
                    Which city is the report coming from?
                </label>
                <input class="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="reporter-city" type="text">
            </div>

            <div class="mb-6">
                <label class="block md:text-xl text-base   font-bold mb-2" for="comments">
                    Further information, comments
                </label>
                <textarea class="appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comments"></textarea>
            </div>

            <div class="flex items-center justify-start">
                <button class="cursor-pointer border border-black border-4 text-[14px] text-black text-center font-bold py-2 px-4 w-36" type="button">
                    Upload
                </button>
            </div>

        </form>
    </div>
</template>
