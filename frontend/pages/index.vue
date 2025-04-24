<template>
    <div class="bg-[url('/img/dogbg.png')] bg-cover bg-center bg-no-repeat md:h-screen h-[60vh] w-full">
      <!-- LANDING PAGE BUTTONS AND TEXT -->
      <div class="flex flex-col items-center justify-center md:h-full h-full">
        <img src="/img/logo_white.png" alt="Mancsmento logo" class="md:w-24 w-16 h-auto">
        <h1 class="md:text-6xl text-3xl font-bold text-white md:pt-4 pt-2">
          {{ $t('home.title') }}
        </h1>
        <h2 class="md:text-4xl text-sm text-white md:pt-5 pt-2 text-center">
          {{ $t('home.subtitle') }}
        </h2>
        <div class="flex flex-wrap justify-center md:gap-16 gap-4 md:pt-24 pt-8">
          <nuxt-link to="/up-for-adoption">
            <button class="btn-primary">
              {{ $t('home.adoptButton') }}
            </button>
          </nuxt-link>
          <nuxt-link to="/support">
            <button class="btn-primary">
              {{ $t('home.donateButton') }}
            </button>
          </nuxt-link>
        </div>
      </div>
      <!-- END LANDING -->
  
    </div>
  
    <!-- CARDS -->
    <section class="cards-section">
      <div class="cards-wrapper">
        <Card
          icon="/img/dog_icon.png"
          titleKey="home.reportCard.title"
          descKey="home.reportCard.description"
          btnKey="home.reportCard.button"
          to="/report-stray"
        />
        <Card
          icon="/img/dog_icon.png"
          titleKey="home.adoptCard.title"
          descKey="home.adoptCard.description"
          btnKey="home.adoptCard.button"
          to="/up-for-adoption"
        />
        <Card
          icon="/img/dog_icon.png"
          titleKey="home.donateCard.title"
          descKey="home.donateCard.description"
          btnKey="home.donateCard.button"
          to="/support"
        />
      </div>
    </section>
    <!-- END CARDS -->
  
    <!-- INTRODUCTION -->
    <section class="intro-section">
      <img src="/img/intro-dog.png" alt="Dog icon" class="intro-img">
      <div class="intro-content">
        <h2>
          {{ $t('home.intro.title.part1') }}
          <span class="highlight">{{ $t('home.intro.title.part2') }}</span>
        </h2>
        <p>{{ $t('home.intro.description') }}</p>
        <div class="intro-actions">
          <nuxt-link to="/support">
            <button class="btn-secondary">{{ $t('home.intro.supportButton') }}</button>
          </nuxt-link>
          <nuxt-link to="/volunteer">
            <button class="btn-secondary">{{ $t('home.intro.volunteerButton') }}</button>
          </nuxt-link>
        </div>
      </div>
    </section>
    <!-- END INTRO -->
  
    <!-- STATS -->
    <section class="stats-section">
      <h2>{{ $t('home.stats.title') }}</h2>
      <div class="stats-grid">
        <Stat icon="/img/yellow-dog-icon.png" number="4699" labelKey="home.stats.totalDogs" />
        <Stat icon="/img/yellow-paw-icon.png" number="2699" labelKey="home.stats.adoptableDogs" />
        <Stat icon="/img/yellow-trophy-icon.png" number="999"  labelKey="home.stats.adoptedDogs" />
      </div>
    </section>
    <!-- END STATS -->
  
    <!-- QUOTE -->
    <section class="quote-section">
      <Quote
        img="/img/black-dog.png"
        parts="part1,part2,part3"
        :prefix="'home.quote.'"
      />
    </section>
    <!-- END QUOTE -->
  
    <!-- NEWS -->
    <section class="news-section">
      <h2>
        {{ $t('home.news.title.part1') }}
        <span class="highlight">{{ $t('home.news.title.part2') }}</span>
      </h2>
      <div class="news-grid">
        <NewsCard index="1" />
        <!-- repeat <NewsCard index="2" /> etc. -->
      </div>
      <nuxt-link to="/blogs">{{ $t('home.news.seeMore') }}</nuxt-link>
    </section>
    <!-- END NEWS -->
  
    <!-- LOCATION -->
    <section class="location-section">
      <h2>{{ $t('home.location.title') }}</h2>
      <div class="location-details">
        <LabelledText labelKey="home.location.openingHoursLabel" textKey="home.location.openingHours" />
        <LabelledText labelKey="home.location.addressLabel"      textKey="home.location.address" />
        <LabelledText labelKey="home.location.contactLabel"      textKey="home.location.phone" />
      </div>
      <img src="/img/map-placeholder.png" :alt="$t('home.location.mapAlt')" />
    </section>
    <!-- END LOCATION -->
  </template>
  