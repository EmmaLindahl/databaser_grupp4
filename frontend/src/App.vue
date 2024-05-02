<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
</script>

<template>
  <!-- <header>
  </header> -->
  <Header/>
  <RouterView />
  <Footer/>
</template>

<style scoped>
</style>
