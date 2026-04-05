<template>
  <header class="header">
    <div class="logo">
      🍽️ TastyTrack
    </div>

    <nav class="nav-links">
      <router-link to="/">Home</router-link>
      <router-link to="/#">Add</router-link>
      <router-link to="/#">Update</router-link>
    </nav>

    <button class="logout-btn" @click="logout">
      Logout
    </button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('users')
  router.push('/login')
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background: #1a1a1a;
  color: white;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid #fff;
}

.logout-btn {
  padding: 8px 16px;
  background: #ff4d4f;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
}

.logout-btn:hover {
  background: #e60023;
}
</style>