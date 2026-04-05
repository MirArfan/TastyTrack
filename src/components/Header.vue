<template>
  <header class="header">
    <div class="logo">
      🍽️ <span>TastyTrack</span>
    </div>

    <nav class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link>
      <router-link to="/add" class="nav-link">Add</router-link>
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
  background: #ffffff; 
  color: #333;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid #e0e0e0;
}

.logo {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
}

.logo span {
  color: #ff7f50; 
}

.nav-links {
  display: flex;
  gap: 25px;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 5px 0;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #ff7f50;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: #ff7f50;
  bottom: -2px;
  left: 0;
  border-radius: 2px;
}

.logout-btn {
  padding: 8px 18px;
  background: #ff7f50;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition:  0.3s, transform 0.2s;
}

.logout-btn:hover {
  background: #ff6347;
  transform: translateY(-2px);
}
</style>