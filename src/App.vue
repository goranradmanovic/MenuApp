<template>
  <div id="app">
    <header>
      <Nav />
    </header>
    <div class="container-fluid">
      <Suspense>
        <RouterView />
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router'
  import Nav from '@/components/Nav.vue'
</script>