<template>
  <div class="add-page">
    <div class="card">
      <h2>Add Food Item 🍽️</h2>

      <form @submit.prevent="addItem">
        <div class="input-group">
          <label>Food Name</label>
          <input v-model="name" type="text" placeholder="e.g. Burger" required />
        </div>

        <div class="input-group">
          <label>Price</label>
          <input v-model="price" type="number" placeholder="e.g. 120" required />
        </div>

         <div class="input-group">
          <label>Category</label>
          <select v-model="category" required>
            <option value="" disabled>Select Category</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>

        
        <button type="submit">Add Item</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const price = ref('')
const category = ref('')

const BASE_URL = 'http://localhost:3000/products'

const addItem = async () => {
  const newItem = {
    name: name.value.trim(),
    price: price.value,
    category: category.value.trim()
  }

  try {
    await axios.post(BASE_URL, newItem)

    alert('Food added successfully 🎉')

    // reset form
    name.value = ''
    price.value = ''
    category.value = ''

    // redirect
    router.push('/')

  } catch (err) {
    console.error(err)
    alert('Failed to add item')
  }
}
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
  background: #ff7f50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #e86a3c;
}
.input-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  background: white;
  color: #444;
  font-size: 14px;
  transition: 0.3s;
}

.input-group select:focus {
  border-color: #007bff;
}

.input-group select option {
  padding: 10px;
  background: white;
  color: #444;
}
</style>