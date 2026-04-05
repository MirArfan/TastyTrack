<template>
  <div class="add-page">
    <div class="card">
      <h2>Update Food ✏️</h2>

      <form @submit.prevent="updateItem">
        <div class="input-group">
          <label>Food Name</label>
          <input v-model="name" type="text" required />
        </div>

        <div class="input-group">
          <label>Price</label>
          <input v-model="price" type="number" required />
        </div>

        <div class="input-group">
          <label>Category</label>
          <input v-model="category" type="text" required />
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const id = route.params.id

const name = ref('')
const price = ref('')
const category = ref('')

const BASE_URL = 'http://localhost:3000/products'

// 👉 Load existing data
const fetchItem = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`)
    name.value = res.data.name
    price.value = res.data.price
    category.value = res.data.category
  } catch (err) {
    console.error(err)
  }
}

// 👉 Update API
const updateItem = async () => {
  try {
    await axios.put(`${BASE_URL}/${id}`, {
      name: name.value,
      price: price.value,
      category: category.value
    })

    alert('Updated successfully 🎉')

    router.push('/')
  } catch (err) {
    console.error(err)
    alert('Update failed')
  }
}

onMounted(() => {
  fetchItem()
})
</script>

<style scoped>
.add-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f6fa;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  width: 350px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input-group label {
  font-size: 14px;
  margin-bottom: 5px;
  color: #444;
}

.input-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
}

.input-group input:focus {
  border-color: #007bff;
}

button {
  width: 100%;
  padding: 12px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #333;
}
</style>