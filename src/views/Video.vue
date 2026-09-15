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
  <main>

    <div class="video-card">

      <div class="top">

        <span class="heart">
          💙
        </span>

        <h1>
          วิดีโอของเรา 🎬
        </h1>

        <p>
          เก็บช่วงเวลาของเราไว้ด้วยกันนะ
        </p>

      </div>

      <!-- Video -->

      <div class="video-wrapper">

        <video
            class="video"
            src="/video/toey.mp4"
            controls
            playsinline
            preload="metadata"
        >
          Browser ของคุณไม่รองรับวิดีโอ
        </video>

      </div>

      <p class="message">
        💙 ทุกช่วงเวลาที่มีบี๋
        <br>
        เป็นช่วงเวลาที่เค้ามีความสุข
      </p>

      <div class="buttons">

        <button
          class="home-btn"
          @click="goHome"
        >
          🏠 Home
        </button>

        <button
          class="love-btn"
          @click="goLove"
        >
          💙 กลับไปหน้าของเรา
        </button>

      </div>

    </div>

  </main>
</template>

<style scoped>

* {
  box-sizing: border-box;
}

main {
  min-height: 100vh;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: 'Kanit', sans-serif;

  background:
    linear-gradient(
      135deg,
      #d6f0ff,
      #8ecae6,
      #a8d8ff,
      #caf0f8
    );

  background-size: 400% 400%;

  animation: sky 14s ease infinite;
}

@keyframes sky {

  0%,
  100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

}

.video-card {
  width: 100%;
  max-width: 700px;

  background: rgba(255,255,255,.94);

  padding: 30px;

  border-radius: 30px;

  text-align: center;

  box-shadow:
    0 20px 60px
    rgba(0,110,180,.3);

  animation:
    pop .7s
    cubic-bezier(.2,.9,.3,1.4);
}

@keyframes pop {

  from {
    transform: scale(.8);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }

}

.heart {
  font-size: 3.5rem;

  display: block;

  animation:
    pulse 1.5s infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.15);
  }

}

h1 {
  color: #0077b6;
  margin: 8px 0;
}

.top p {
  color: #607d8b;
  margin-bottom: 25px;
}

.video-wrapper {
  width: 100%;

  overflow: hidden;

  border-radius: 20px;

  background: #000;

  box-shadow:
    0 10px 30px
    rgba(0,0,0,.2);
}

.video {
  width: 100%;
  display: block;
  max-height: 70vh;
}

.message {
  color: #0077b6;

  margin: 20px 0;

  line-height: 1.7;
}

.buttons {
  display: flex;

  justify-content: center;

  gap: 12px;

  flex-wrap: wrap;
}

button {
  border: none;

  border-radius: 50px;

  padding: 13px 25px;

  font-family: 'Kanit', sans-serif;

  font-size: 1rem;

  cursor: pointer;

  transition: .25s;
}

button:hover {
  transform: scale(1.05);
}

.home-btn {
  background: #eef3f6;
  color: #0077b6;
}

.love-btn {
  background:
    linear-gradient(
      135deg,
      #00b4d8,
      #0077b6
    );

  color: white;
}

@media (max-width: 600px) {

  .video-card {
    padding: 20px;
    border-radius: 25px;
  }

  h1 {
    font-size: 1.5rem;
  }

  .buttons {
    flex-direction: column;
  }

  button {
    width: 100%;
  }

}

</style>