<template>
  <div class="home">
    <h1 v-if="name">Welcome {{ name }}</h1>
    <h1 v-else>Welcome</h1>
    <p class="subtitle">Browse all available food items 🍴</p>

    <h2 style="text-align:center;">All Products</h2>

    <div v-if="products.length === 0" class="empty">
      No items yet 😢
    </div>

    <div class="product-container">
      <div v-for="item in products" :key="item.id" class="card">
        <img v-if="item.image" :src="item.image" alt="food" class="food-img"/>
        <h3>{{ item.name }}</h3>
        <p class="price">৳ {{ item.price }}</p>
        <span class="category">{{ item.category }}</span>

        <div class="btn-group">
          <button @click="goToEdit(item.id)" class="edit-btn">
            ✏️ Update
          </button>
          <button @click="deleteItem(item.id)" class="delete-btn">
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
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

const goToEdit = (id) => {
  router.push(`/update/${id}`)
}

const deleteItem = async (id) => {
  if (!confirm('Are you sure you want to delete this item?')) return
  try {
    await axios.delete(`${BASE_URL}/${id}`)
    products.value = products.value.filter(item => item.id !== id)
    alert('Deleted successfully 🗑️')
  } catch (err) {
    console.error(err)
    alert('Delete failed')
  }
}

onMounted(() => {
  fetchProducts()
  const user = JSON.parse(localStorage.getItem('users'))
  if (user && user.name) name.value = user.name
})
</script>

<style scoped>
.home {
  padding: 40px;
  background: #f9fafb;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 5px;
  color: #333;
}

.subtitle {
  text-align: center;
  margin-bottom: 25px;
  color: #666;
  font-size: 16px;
}

/* Grid layout */
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 25px;
}

/* Card */
.card {
  background: #fff;
  padding: 15px;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0,0,0,0.15);
}

.food-img {
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 10px;
}

.card h3 {
  margin: 8px 0 5px;
  color: #222;
  text-align: center;
}

.price {
  font-weight: bold;
  color: #007bff;
  margin-bottom: 8px;
}

.category {
  display: inline-block;
  padding: 3px 8px;
  background: #e0f0ff;
  color: #007bff;
  font-size: 12px;
  border-radius: 12px;
  margin-bottom: 12px;
}

/* Buttons side by side */
.btn-group {
  display: flex;
  gap: 10px;
  width: 100%;
}

.edit-btn, .delete-btn {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;
}

.edit-btn {
  background: #28a745;
}

.edit-btn:hover {
  background: #218838;
}

.delete-btn {
  background: #dc3545;
}

.delete-btn:hover {
  background: #c82333;
}

.empty {
  text-align: center;
  color: #888;
  margin-top: 30px;
  font-size: 16px;
}
</style>