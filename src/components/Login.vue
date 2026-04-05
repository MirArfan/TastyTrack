<template>
  <div class="page-wrapper">
    <div class="circle circle-1"></div>
    <div class="circle circle-2"></div>

    <div class="glass-card">
      <div class="logo-section">
        <img src="../assets/logo.png" alt="Logo" class="main-logo" />
      </div>

      <div class="header-text">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
      </div>

      <form @submit.prevent="login" class="signup-form">
        <div class="input-wrapper">
          <label>Email Address</label>
          <input type="email" v-model="email" placeholder="hello@example.com" required />
        </div>

        <div class="input-wrapper">
          <label>Password</label>
          <input type="password" v-model="password" placeholder="••••••••" required />
        </div>

        <button type="submit" class="submit-btn">
          Login
          <span class="arrow">→</span>
        </button>
      </form>

      <p class="footer-link">
        Don't have an account? 
        <router-link to="/signup">Sign up</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const BASE_URL = 'http://localhost:3000/users'

const login = async () => {
  try {
    // সব users fetch করো
    const res = await axios.get(BASE_URL)

    // match check
    const user = res.data.find(
      u => u.email === email.value && u.password === password.value
    )

    if (user) {
      // save current user
      localStorage.setItem('users', JSON.stringify(user))

      alert('Login successful! 🎉')

      // redirect home
      router.push('/')
    } else {
      alert('Invalid email or password ❌')
    }

  } catch (err) {
    console.error(err)
    alert('Login failed')
  }
}
</script>

<style scoped>

.page-wrapper {
  min-height: 100vh;
  min-width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
  font-family: 'Inter', sans-serif;
  position: relative;
  overflow: hidden;
}

/* Background Decorations */
.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: 0;
}
.circle-1 {
  width: 300px;
  height: 300px;
  background: rgba(0, 123, 255, 0.2);
  top: -50px;
  right: -50px;
}
.circle-2 {
  width: 250px;
  height: 250px;
  background: rgba(108, 92, 231, 0.15);
  bottom: -50px;
  left: -50px;
}

/* Glassmorphism Card */
.glass-card {
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  transition: transform 0.3s ease;
}

.logo-section {
  text-align: center;
  margin-bottom: 20px;
}

.main-logo {
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 5px 15px rgba(0,0,0,0.1));
}

.header-text {
  text-align: center;
  margin-bottom: 30px;
}

.header-text h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
}

.header-text p {
  color: #666;
  font-size: 14px;
  margin-top: 5px;
}

/* Form Styling */
.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-wrapper label {
  font-size: 13px;
  font-weight: 600;
  color: #444;
  margin-left: 4px;
}

.input-wrapper input {
  padding: 12px 16px;
  border: 1.5px solid #e1e1e1;
  border-radius: 12px;
  font-size: 15px;
  transition: all 0.3s ease;
  outline: none;
}

.input-wrapper input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
}

/* Button Styling */
.submit-btn {
  margin-top: 10px;
  padding: 14px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.submit-btn:active {
  transform: translateY(0);
}

.arrow {
  transition: transform 0.3s ease;
}

.submit-btn:hover .arrow {
  transform: translateX(5px);
}

.footer-link {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: #666;
}

.footer-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 600;
}

.footer-link a:hover {
  text-decoration: underline;
}
</style>