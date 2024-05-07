<script setup>
import PostForm from '../components/PostForm.vue';
</script>


<template>
  <div class="container">
    <PostForm />
  </div>
</template>



<style>
#link_home {
  text-decoration: none;
}

#link_postform {
  text-decoration: underline;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 98vh;
  background-color: none;
}
</style>
