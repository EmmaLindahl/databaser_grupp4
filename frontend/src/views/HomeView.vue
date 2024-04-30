<!-- Orginalkod: -->
<!-- <script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template> -->

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const postData = ref(null);
const postData2 = ref(null)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/plants');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    postData.value = await response.json();
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }
});

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/habitat');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    postData2.value = await response.json();
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }
});
</script>

<template>
  <main>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1 v-for="item in postData">{{ item.PlantName }}</h1>
      <h1 v-for="item in postData2">{{ item }}</h1>
    </div>
    <TheWelcome />
  </main>
</template>


