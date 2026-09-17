<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goVideo() {
  router.push('/video')
}

function goHome() {
  router.push('/')
}
</script>

<template>

  <main>

    <div class="card">

      <span class="icon">
        🎉
      </span>

      <h1>
        เย้!
        <span class="name">
          เตย
        </span>
        เป็นแฟน
        <span class="name">
          มิ้น
        </span>
        แล้ว! 💙
      </h1>

      <p class="sub">

        ขอบคุณที่ตอบตกลงนะบี๋ 💙

        <br><br>

        <i>
          "ถ้าวันแรกของบี๋กับเค้า...
          เริ่มวันนี้เลยดีไหม"
        </i>

        <br><br>

        ต่อจากนี้ไม่ว่าวันไหน
        จะเหนื่อยแค่ไหน

        <br>

        มิ้นจะอยู่ข้าง ๆ เสมอ
        สัญญา 🤙

        <br><br>

        <small>
          วันเริ่มต้นของเรา:
          <b>
            14 September 2026
          </b>
        </small>

      </p>


      <div class="actions">

        <button
          class="video-btn"
          @click="goVideo"
        >
          🎬 ดูวิดีโอของเรา
        </button>

        <button
          class="home-btn"
          @click="goHome"
        >
          🏠 Home
        </button>

      </div>

    </div>

  </main>

</template>

<style scoped>

* {
  box-sizing:
    border-box;
}

main {
  min-height:
    100vh;
  
  min-height:
    100dvh;

  display:
    flex;

  align-items:
    center;

  justify-content:
    center;

  padding:
    20px;

  font-family:
    'Kanit',
    sans-serif;

  background:
    linear-gradient(
      135deg,
      #d6f0ff,
      #8ecae6,
      #a8d8ff,
      #caf0f8
    );

  background-size:
    400% 400%;

  animation:
    sky 14s ease infinite;
}

@keyframes sky {

  0%,
  100% {
    background-position:
      0% 50%;
  }

  50% {
    background-position:
      100% 50%;
  }

}

.card {
  background:
    rgba(255,255,255,.94);

  border-radius:
    30px;

  padding:
    40px 30px;

  text-align:
    center;

  max-width:
    430px;

  width:
    100%;

  box-shadow:
    0 20px 60px
    rgba(0,110,180,.3);

  animation:
    pop .7s
    cubic-bezier(
      .2,.9,.3,1.4
    );
}

@keyframes pop {

  from {
    transform:
      scale(.7);

    opacity: 0;
  }

  to {
    transform:
      scale(1);

    opacity: 1;
  }
}

.icon {
  font-size:
    4rem;

  display:
    block;

  margin-bottom:
    10px;

  animation:
    bounce 1.8s infinite;
}

@keyframes bounce {

  0%,
  100% {
    transform:
      translateY(0);
  }

  50% {
    transform:
      translateY(-14px);
  }
}

h1 {
  font-size:
    1.7rem;

  color:
    #0077b6;

  margin-bottom:
    15px;
}

.name {
  color:
    #0096c7;
}

.sub {
  color:
    #4a6572;

  line-height:
    1.8;
}

small {
  color:
    #78909c;
}

.actions {
  display:
    flex;

  flex-direction:
    column;

  gap:
    12px;

  margin-top:
    25px;
}

button {
  border:
    none;

  border-radius:
    50px;

  padding:
    14px 25px;

  font-family:
    'Kanit',
    sans-serif;

  font-size:
    1rem;

  cursor:
    pointer;

  transition:
    .25s;
}

button:hover {
  transform:
    scale(1.05);
}

.video-btn {
  background:
    linear-gradient(
      135deg,
      #00b4d8,
      #0077b6
    );

  color:
    white;

  box-shadow:
    0 8px 22px
    rgba(0,119,182,.3);
}

.home-btn {
  background:
    #eef3f6;

  color:
    #0077b6;
}

</style>