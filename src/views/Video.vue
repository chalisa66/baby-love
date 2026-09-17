<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}

function goLove() {
  router.push('/love')
}
</script>

<template>
  <div class="video-page">
    <div class="video-card">

      <div class="heart">💙</div>

      <h1>วิดีโอของเรา 🎬</h1>

      <p class="subtitle">
        วิดีโอที่เค้าตั้งใจทำให้บี๋
      </p>

      <video
        class="video"
        src="/video/Toey.mp4"
        controls
        playsinline
        preload="metadata"
      >
      </video>

      <p class="message">
        ขอบคุณที่เข้ามาเป็นส่วนหนึ่งในชีวิตเค้านะ 💕
      </p>

      <div class="buttons">
        <button @click="goHome">
          🏠 Home
        </button>

        <button @click="goLove">
          💙 Love
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.video-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  padding: 20px;
  background: linear-gradient(135deg, #dff6ff, #bde7ff);
}

.video-card {
  width: 100%;
  max-width: 800px;
  background: white;
  border-radius: 25px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.heart {
  font-size: 50px;
}

h1 {
  color: #2980b9;
  margin: 10px 0;
}

.subtitle {
  color: #777;
}

.video {
  width: 100%;
  max-height: 500px;
  margin: 20px 0;
  border-radius: 15px;
  background: black;
}

.message {
  color: #555;
  font-size: 18px;
  margin: 15px 0 25px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

button {
  border: none;
  padding: 12px 25px;
  border-radius: 999px;
  background: #3498db;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}
</style>