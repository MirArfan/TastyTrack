<template>
  <div class="home">
    <h1 v-if="name">Welcome {{ name }} to the Home Page!</h1>
    <h1 v-else>Welcome to the Home Page!</h1>
    <br>
    <p class="subtitle">Browse all available food items</p>

    <h2 style="text-align:center;">🍽️ All Products</h2>

    <div v-if="products.length === 0" class="empty">
      No items yet 😢
    </div>

    <div class="product-container">
      <div v-for="item in products" :key="item.id" class="card">
        <h3>{{ item.name }}</h3>
        <p class="price">৳ {{ item.price }}</p>
        <p style="color:#666;">{{ item.category }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const name = ref('')
const products = ref([])

const BASE_URL = 'http://localhost:3000/products'
const fetchProducts = async () => {
  try {
    const res = await axios.get(BASE_URL)
    products.value = res.data
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchProducts()
})

onMounted(() => {

  const user = JSON.parse(localStorage.getItem('users'))
  if (user && user.name) {
    name.value = user.name
  }
})
</script>


<style scoped>
.home {
  padding: 40px;
  background: #f5f6fa;
  min-height: 100vh;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.subtitle {
  text-align: center;
  margin-bottom: 30px;
  color: #777;
}

/* Grid layout */
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
}

/* Card Design */
.card {
  background: #ffffff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

/* Text */
.card h3 {
  margin-bottom: 10px;
  color: #222;
}

.price {
  font-weight: bold;
  color: #007bff;
}

.empty {
  text-align: center;
  color: #888;
  margin-top: 30px;
}
</style>