<template>
  <div class="home">
    <h1 v-if="name">Welcome {{ name }} to the Home Page!</h1>
    <h1 v-else>Welcome to the Home Page!</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')

onMounted(() => {
  
  const user = JSON.parse(localStorage.getItem('users'))
  if (user && user.name) {
    name.value = user.name
  }
})
</script>


<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>