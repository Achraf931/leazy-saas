<script setup lang="ts">
definePageMeta({
  layout: 'landing'
})

const { data: page } = await useAsyncData('index', () => queryContent('/').findOne())

useSeoMeta({
  title: page.value.title,
  ogTitle: page.value.title,
  description: page.value.description,
  ogDescription: page.value.description,
  ogImage: 'https://leazy-coming.vercel.app/preview.jpg',
  ogUrl: 'https://leazy.net',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://leazy-coming.vercel.app/preview.jpg',
})
</script>

<template>
  <div>
    <ULandingHero :title="page.hero.title" :description="page.hero.description" :links="page.hero.links">
      <template #headline>
        <UBadge v-if="page.hero.headline" variant="subtle" size="lg" class="relative rounded-full font-semibold">
          <NuxtLink :to="page.hero.headline.to" target="_blank" class="focus:outline-none" tabindex="-1">
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          {{ page.hero.headline.label }}

          <UIcon v-if="page.hero.headline.icon" :name="page.hero.headline.icon" class="ml-1 w-4 h-4 pointer-events-none" />
        </UBadge>
      </template>

      <LandingPlaceholder />

      <ULandingLogos :title="page.logos.title" align="center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Logo_STATION_F.svg/2560px-Logo_STATION_F.svg.png"
          alt="Station F Logo"
          class="h-12 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
        >
        <img
          src="https://pitch-assets.imgix.net/d3b706aa-5182-4f1e-ba76-ab28926f3500?pitch-bytes=45500&pitch-content-type=image%2Fpng&fit=max&auto=format&q=100&w=3513&h=1138"
          alt="Station F Logo"
          class="h-12 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
        >
        <img
          src="https://pitch-assets.imgix.net/0f57bb29-84eb-445d-a69b-085ccfe4b611?pitch-bytes=95543&pitch-content-type=image%2Fpng&fit=max&auto=format&q=100&w=2397&h=1668"
          alt="Station F Logo"
          class="h-12 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
        >
        <img
          src="https://www.fondation-entreprendre.org/wp-content/uploads/2021/04/Time2Start.png"
          alt="Station F Logo"
          class="h-12 lg:h-16 flex-shrink-0 text-gray-900 dark:text-white"
        >
      </ULandingLogos>
    </ULandingHero>

    <ULandingSection :title="page.features.title" :description="page.features.description">
      <UPageGrid>
        <ULandingCard v-for="(item, index) in page.features.items" :key="index" v-bind="item" :icon="undefined" />
      </UPageGrid>
    </ULandingSection>

    <ULandingSection v-if="false" :title="page.pricing.title" :description="page.pricing.description" :headline="page.pricing.headline">
      <UPricingGrid id="pricing" compact class="scroll-mt-[calc(var(--header-height)+140px+128px+96px)]">
        <UPricingCard v-for="(plan, index) in page.pricing.plans" :key="index" v-bind="plan" />
      </UPricingGrid>
    </ULandingSection>

    <ULandingSection v-if="false" :headline="page.testimonials.headline" :title="page.testimonials.title" :description="page.testimonials.description">
      <UPageColumns id="testimonials" class="xl:columns-4 scroll-mt-[calc(var(--header-height)+140px+128px+96px)]">
        <div v-for="(testimonial, index) in page.testimonials.items" :key="index" class="break-inside-avoid">
          <ULandingTestimonial v-bind="testimonial" />
        </div>
      </UPageColumns>
    </ULandingSection>

    <ULandingSection v-if="false" class="bg-primary-50 dark:bg-primary-400 dark:bg-opacity-10">
      <ULandingCTA v-bind="page.cta" :card="false" />
    </ULandingSection>

    <ULandingSection v-if="false" id="faq" :title="page.faq.title" :description="page.faq.description" class="scroll-mt-[var(--header-height)]">
      <ULandingFAQ
          multiple
          :items="page.faq.items"
          :ui="{
          button: {
            label: 'font-semibold',
            trailingIcon: {
              base: 'w-6 h-6'
            }
          }
        }"
          class="max-w-4xl mx-auto"
      />
    </ULandingSection>
  </div>
</template>
