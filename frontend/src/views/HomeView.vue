<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true);
const fetchDataSQL = ref(null);
const fetchDataMongoDB = ref(null)
let plantNameText = ref(null)
let plantManyNameTexts = ref(null)
let habitatText = ref(null)
let descriptionText = ref(null)
let useText = ref(null)


onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/plants');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    fetchDataSQL.value = await response.json();
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }
});

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/PlantInfos');
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    fetchDataMongoDB.value = await response.json();
    loading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
    loading.value = false;
  }
});

const onClick = (index) => {
  plantNameText.value = fetchDataSQL.value[index].PlantName
  console.log(fetchDataSQL.value[index])
  plantManyNameTexts.value = "Binomial name: " + fetchDataSQL.value[index].PlantBinomialName + " | Family: " + fetchDataSQL.value[index].PlantFamilyName
    + " | Genus: " + fetchDataSQL.value[index].PlantGenusName + " | Species: " + fetchDataSQL.value[index].PlantSpeciesName
  habitatText.value = "Habitat: " + fetchDataMongoDB.value[index].habitat
  descriptionText.value = "Description: " + fetchDataMongoDB.value[index].description
  useText.value = "Use: " + fetchDataMongoDB.value[index].use
}
</script>

<template>

  <main>
    <div id="plantInfoContainer">
      <div v-if="loading">Loading...</div>
      <div id="plantBtnContainer" v-else>
        <button class="plantBtn" @click="onClick(index)" v-for="(item, index) in fetchDataSQL">{{ item.PlantName
          }}</button>
      </div>
      <div id="plantTextContainer">
        <h2> {{ plantNameText }}</h2>
        <p> {{ plantManyNameTexts }}</p>
        <p> {{ habitatText }} </p>
        <p> {{ descriptionText }} </p>
        <p> {{ useText }} </p>
      </div>
    </div>


  </main>
</template>

<style>
#link_home {
  text-decoration: underline;
}

#link_postform {
  text-decoration: none;
}

#plantInfoContainer {
  display: flex;
  gap: 20px;
}

#plantBtnContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-self: flex-start;
  background-color: #f2f2f2;
  padding: 5px 10px;
  height: 100vh;
}

.plantBtn {
  background-color: #f2f2f2;
  margin: 2px;
  border: none;
  align-self: center;
  cursor: pointer;
  font-size: 15px;
  border-radius: 50px;
}

.plantBtn:hover {
  background-color: #e6e6e6;
  box-shadow: 2px 2px grey;
}

#plantTextContainer {
  width: 60%;
}
</style>
