<script setup>
import { useRouter } from "vue-router";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const router = useRouter();

const videos = [
  {
    src: "/video/Toey.mp4",
    title: "วิดีโอของเรา 🎬",
    message: "ขอบคุณที่เข้ามาเป็นส่วนหนึ่งในชีวิตเค้านะ 💕",
  },
  {
    src: "/video/Toey2.mp4",
    title: "ความทรงจำของเรา 💕",
    message: "อยากมีช่วงเวลาแบบนี้กับเธอไปนาน ๆ นะ 🥰",
  },
  {
    src: "/video/Toey3.mp4",
    title: "ช่วงเวลาที่มีความสุข 💙",
    message: "ขอบคุณสำหรับทุกช่วงเวลาที่เราได้อยู่ด้วยกันนะ",
  },
];

const goHome = () => {
  router.push("/");
};

const goLove = () => {
  router.push("/love");
};
</script>

<template>
  <div class="video-page">
    <div class="video-card">
      <div class="heart">💙</div>

      <h1>วิดีโอของเรา 🎬</h1>

      <p class="subtitle">💕</p>

      <Swiper
        :modules="[Pagination, Navigation]"
        :pagination="{ clickable: true }"
        navigation
        :space-between="20"
        class="video-swiper"
      >
        <SwiperSlide v-for="(video, index) in videos" :key="index">
          <div class="video-slide">
            <h2>{{ video.title }}</h2>

            <video
              class="video"
              :src="video.src"
              controls
              playsinline
              preload="metadata"
            ></video>

            <p class="message">
              {{ video.message }}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>

      <div class="buttons">
        <button @click="goHome">🏠 Home</button>

        <button @click="goLove">💙 Love</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.video-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 15px;
  background: linear-gradient(135deg, #dbeafe, #eff6ff, #dbeafe);
}

.video-card {
  width: 100%;
  max-width: 700px;
  padding: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 30px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
}

.heart {
  font-size: 45px;
  margin-bottom: 5px;
}

h1 {
  margin: 0;
  color: #2563eb;
}

.subtitle {
  color: #64748b;
  margin-bottom: 20px;
}

.video-swiper {
  width: 100%;
  padding-bottom: 45px;
}

.video-slide {
  width: 100%;
}

.video-slide h2 {
  color: #2563eb;
  font-size: 20px;
  margin-bottom: 15px;
}

.video {
  width: 100%;
  max-height: 420px;
  border-radius: 20px;
  background: #000;
  object-fit: contain;
}

.message {
  color: #475569;
  margin: 20px 10px;
  line-height: 1.7;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.buttons button {
  border: none;
  padding: 12px 25px;
  border-radius: 999px;
  background: #2563eb;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.buttons button:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

@media (max-width: 600px) {
  .video-card {
    padding: 20px 15px;
  }

  .video {
    max-height: 300px;
  }

  .buttons {
    flex-direction: column;
  }

  .buttons button {
    width: 100%;
  }
}
</style>
