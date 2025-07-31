<script setup lang="tsx">
import type { Collections } from '@nuxt/content';

const path = useRoute().path
const slug = useRoute().params.slug; // Ensure slug is treated as a string array
console.log(slug);

const { data: home } = await useAsyncData(`${path}`, () => {
  return queryCollection(slug[0] as keyof Collections).path(`${path}`).first() // Cast slug[0] to keyof Collections
})
console.log(await queryCollection('formula').first());


useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})

const { data } = await useAsyncData('navigation', () => {
  return queryCollection('gbshl').all()
})


const { data: re } = await useAsyncData('gbshl', () => {
  return queryCollectionItemSurroundings('gbshl', path)
})

</script>

<template>
  <div>
    <ContentRenderer v-if="home" :value="home" />

    <div v-else>Home not found</div>
    <p>{{ $route.params }}</p>

    <nav>
      <ul v-if="data">
        <li v-for="item in data" :key="item.path">
          <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
        </li>
      </ul>
    </nav>
    <div class="flex justify-between">
      <NuxtLink v-if="re?.[0]" :to="re[0].path">
        ← {{ re[0].title }}
      </NuxtLink>
      sssss
      <NuxtLink v-if="re?.[1]" :to="re[1].path">
        {{ re[1].title }} →
      </NuxtLink>
    </div>
  </div>

</template>
