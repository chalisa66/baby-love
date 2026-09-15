<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

/* ================= State ================= */

const showIntro = ref(true)
const isPlaying = ref(false)
const quoteIndex = ref(0)
const quote = ref('')

const link = ref(
  window.location.origin
)

const noButton = ref(null)

let ytPlayer = null
let quoteTimer = null
let floatTimer = null

let youtubeReady = false

/* ================= Quotes ================= */

const sweets = [
  'บี๋รู้ไหม... ทุกครั้งที่บี๋ยิ้ม เค้าก็ลืมเรื่องแย่ ๆ ทั้งวันไปเลย 💙',

  'เค้าไม่ได้อยากเป็นแค่คนที่บี๋คุยด้วยทุกวัน<br>แต่อยากเป็นคนที่บี๋เลือกทุกวันน่ะ 🫶',

  'บี๋เป็นคนเดียวที่ทำให้เค้ารอข้อความเป็นชั่วโมงได้โดยไม่บ่นเลยนะ 📱',

  'อยากรอเที่ยงคืนวันเกิดบี๋ทุกปี<br>เพื่อเป็นคนแรกที่ได้อวยพร 🎂',

  'ถ้าความคิดถึงมีน้ำหนัก... เค้าคงแบกบี๋ไว้ทั้งใจเลยล่ะ 🐳',

  'ฟ้าสวยแค่ไหน ก็ยังสู้ตอนบี๋หัวเราะไม่ได้เลยนะ ☁️',

  'ถ้าวันแรกของเรา... เริ่มวันนี้เลยดีไหมบี๋? ☝️💙'
]

function showQuote() {
  quote.value = ''

  setTimeout(() => {
    quote.value = sweets[quoteIndex.value]

    quoteIndex.value =
      (quoteIndex.value + 1) % sweets.length
  }, 350)
}

/* ================= YouTube ================= */

function loadYouTubeAPI() {
  if (
    window.YT &&
    window.YT.Player
  ) {
    createPlayer()
    return
  }

  window.onYouTubeIframeAPIReady = () => {
    console.log('YouTube API Ready')
    createPlayer()
  }

  const existingScript =
    document.querySelector(
      'script[src="https://www.youtube.com/iframe_api"]'
    )

  if (!existingScript) {
    const script =
      document.createElement('script')

    script.src =
      'https://www.youtube.com/iframe_api'

    script.async = true

    document.head.appendChild(script)
  }
}

function createPlayer() {
  if (ytPlayer) return

  if (
    !window.YT ||
    !window.YT.Player
  ) {
    return
  }

  const target =
    document.getElementById('yt')

  if (!target) {
    return
  }

  ytPlayer = new window.YT.Player(
    'yt',
    {
      width: '1',
      height: '1',

      videoId: 'lqWP-nJF0kA',

      playerVars: {
        autoplay: 0,
        controls: 0,
        playsinline: 1,

        start: 0,

        loop: 1,

        playlist:
          'lqWP-nJF0kA',

        rel: 0,

        modestbranding: 1
      },

      events: {

        onReady: (event) => {
          youtubeReady = true

          event.target.setVolume(70)

          console.log(
            'YouTube พร้อมเล่นแล้ว'
          )
        },

        onStateChange: (event) => {

          if (!window.YT) return

          if (
            event.data ===
            window.YT.PlayerState.PLAYING
          ) {
            isPlaying.value = true
          }

          if (
            event.data ===
            window.YT.PlayerState.PAUSED
          ) {
            isPlaying.value = false
          }

          if (
            event.data ===
            window.YT.PlayerState.ENDED
          ) {
            event.target.playVideo()
          }
        },

        onError: (event) => {
          console.error(
            'YouTube Error:',
            event.data
          )
        }
      }
    }
  )
}

/* ================= Intro ================= */

function startWebsite() {
  showIntro.value = false

  setTimeout(() => {

    if (
      youtubeReady &&
      ytPlayer
    ) {

      ytPlayer.unMute()

      ytPlayer.setVolume(70)

      ytPlayer.playVideo()

      isPlaying.value = true

    } else {

      console.log(
        'YouTube ยังไม่พร้อม'
      )

    }

  }, 100)
}

/* ================= Music ================= */

function toggleMusic() {

  if (
    !youtubeReady ||
    !ytPlayer
  ) {
    console.log(
      'YouTube ยังไม่พร้อม'
    )

    return
  }

  const state =
    ytPlayer.getPlayerState()

  if (
    state ===
    window.YT.PlayerState.PLAYING
  ) {

    ytPlayer.pauseVideo()

    isPlaying.value = false

  } else {

    ytPlayer.unMute()

    ytPlayer.setVolume(70)

    ytPlayer.playVideo()

    isPlaying.value = true
  }
}

/* ================= Accept ================= */

function acceptLove() {

  if (ytPlayer) {
    ytPlayer.pauseVideo()
  }

  isPlaying.value = false

  router.push('/love')
}

/* ================= No Button ================= */

function runAway(event) {

  if (event) {
    event.preventDefault()
  }

  if (!noButton.value) {
    return
  }

  noButton.value.style.left =
    Math.random() * 68 + 4 + '%'

  noButton.value.style.top =
    Math.random() * 60 - 28 + 'px'
}

/* ================= QR ================= */

const qrUrl = computed(() => {

  const data =
    encodeURIComponent(link.value)

  return `
    https://api.qrserver.com/v1/create-qr-code/
    ?size=340x340
    &color=0077B6
    &bgcolor=FFFFFF
    &data=${data}
  `.replace(/\s/g, '')
})

/* ================= Floating ================= */

function spawnFloat() {

  const d =
    document.createElement('div')

  d.className = 'float'

  const items = [
    '💙',
    '🩵',
    '🐳',
    '☁️',
    '🫧',
    '✨'
  ]

  d.textContent =
    items[
      Math.floor(
        Math.random() * items.length
      )
    ]

  d.style.left =
    Math.random() * 100 + 'vw'

  d.style.fontSize =
    Math.random() * 20 + 16 + 'px'

  d.style.animationDuration =
    Math.random() * 3 + 5 + 's'

  document.body.appendChild(d)

  setTimeout(() => {
    d.remove()
  }, 8500)
}

/* ================= Lifecycle ================= */

onMounted(() => {

  loadYouTubeAPI()

  showQuote()

  quoteTimer =
    setInterval(
      showQuote,
      3500
    )

  floatTimer =
    setInterval(
      spawnFloat,
      600
    )
})

onBeforeUnmount(() => {

  clearInterval(
    quoteTimer
  )

  clearInterval(
    floatTimer
  )

  if (ytPlayer) {

    ytPlayer.destroy()

    ytPlayer = null
  }

  youtubeReady = false
})
</script>

<template>

  <main>

    <!-- ================= Intro ================= -->

    <div
      v-if="showIntro"
      id="intro"
      @click="startWebsite"
    >

      <div
        class="ring"
      >
        💙
      </div>

      <h2>
        บี๋... เค้ามีอะไรจะบอก
      </h2>

      <p>
        เปิดเสียงไว้ด้วยนะ
        มีเพลงให้ฟัง 🎧
      </p>

      <div class="tap">
        แตะตรงนี้เลย ☝️
      </div>

    </div>


    <!-- ================= Home Card ================= -->

    <div
      v-if="!showIntro"
      class="card"
    >

      <span class="icon">
        🐳
      </span>

      <h1>
        บี๋... เป็นแฟนมิ้นนะ? 💙
      </h1>

      <p class="sub">
        มิ้นคิดมานานแล้วนะ<br>
        แต่วันนี้ขอพูดออกมาสักที...
      </p>


      <!-- Music -->

      <div
        class="player"
        :class="{
          paused: !isPlaying
        }"
      >

        <span class="disc">
          💿
        </span>

        <span>
          นับหนึ่ง (From now on) —
          Billkin
        </span>

        <button
          class="tg"
          @click.stop="toggleMusic"
        >
          {{
            isPlaying
              ? '⏸'
              : '▶'
          }}
        </button>

      </div>


      <!-- Quote -->

      <div
        class="quote"
        v-html="quote"
      ></div>


      <!-- Buttons -->

      <div class="btns">

        <button
          id="yes"
          @click="acceptLove"
        >
          เป็นสิ 💙
        </button>

        <button
          id="no"
          ref="noButton"
          @mouseover="runAway"
          @click="runAway"
          @touchstart="runAway"
        >
          ขอคิดก่อน
        </button>

      </div>


      <!-- QR -->

      <div class="qr-box">

        <h3>
          📱 สแกนเพื่อเปิดหน้านี้
        </h3>

        <img
          id="qr"
          :src="qrUrl"
          alt="QR Code"
        >

        <input
          v-model="link"
          placeholder="วางลิงก์เว็บของคุณ"
        >

      </div>

    </div>


    <!-- ================= YouTube ================= -->

    <div
      id="yt"
      class="youtube-hidden"
    ></div>

  </main>

</template>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family:
    'Kanit',
    sans-serif;
}

body {
  min-height: 100vh;

  overflow: hidden;
}

main {
  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

  background:
    linear-gradient(
      135deg,
      #d6f0ff,
      #8ecae6,
      #a8d8ff,
      #caf0f8
    );

  background-size: 400% 400%;

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


/* ================= Intro ================= */

#intro {
  position: fixed;

  inset: 0;

  background:
    linear-gradient(
      135deg,
      #0077b6,
      #00b4d8,
      #48cae4
    );

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  z-index: 99;

  cursor: pointer;

  color: white;

  text-align: center;

  padding: 20px;
}

#intro .ring {
  font-size: 5rem;

  animation:
    pulse 1.6s infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);

    opacity: .9;
  }

  50% {
    transform: scale(1.15);

    opacity: 1;
  }
}

#intro h2 {
  font-weight: 500;

  font-size: 1.5rem;

  margin:
    18px 0 8px;
}

#intro p {
  font-weight: 300;

  font-size: .9rem;

  opacity: .9;
}

.tap {
  margin-top: 26px;

  border:
    2px solid white;

  border-radius: 50px;

  padding:
    12px 34px;

  font-weight: 500;

  animation:
    pulse 2s infinite;
}


/* ================= Card ================= */

.card {
  background:
    rgba(255,255,255,.93);

  border-radius: 30px;

  padding:
    38px 30px;

  text-align: center;

  box-shadow:
    0 20px 60px
    rgba(0,110,180,.3);

  max-width: 430px;

  width: 100%;

  z-index: 2;

  backdrop-filter:
    blur(10px);

  animation:
    pop .7s
    cubic-bezier(
      .2,
      .9,
      .3,
      1.4
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

h1 {
  font-size: 1.7rem;

  color: #0077b6;

  margin-bottom: 8px;

  font-weight: 700;
}

p.sub {
  color: #4a6572;

  margin-bottom: 20px;

  line-height: 1.8;

  font-size: .95rem;

  font-weight: 300;
}

.icon {
  font-size: 3.8rem;

  display: block;

  margin-bottom: 8px;

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


/* ================= Quote ================= */

.quote {
  background:
    #eaf7ff;

  border-left:
    4px solid #48cae4;

  border-radius:
    0 14px 14px 0;

  padding:
    14px 16px;

  margin-bottom:
    20px;

  color: #0077b6;

  font-size: .9rem;

  line-height: 1.7;

  text-align: left;

  font-weight: 300;

  min-height: 80px;

  transition:
    opacity .35s;
}


/* ================= Buttons ================= */

.btns {
  display: flex;

  gap: 14px;

  justify-content: center;

  position: relative;

  height: 62px;
}

button {
  border: none;

  border-radius: 50px;

  padding:
    14px 32px;

  font-size: 1.05rem;

  font-weight: 500;

  cursor: pointer;

  transition: .25s;

  font-family:
    'Kanit',
    sans-serif;
}

#yes {
  background:
    linear-gradient(
      135deg,
      #00b4d8,
      #0077b6
    );

  color: white;

  box-shadow:
    0 8px 22px
    rgba(0,119,182,.45);
}

#yes:hover {
  transform:
    scale(1.12);
}

#no {
  background:
    #eef3f6;

  color:
    #90a4ae;

  position: absolute;

  left: 60%;

  transition:
    .15s;
}


/* ================= Music ================= */

.player {
  display: flex;

  align-items: center;

  gap: 10px;

  background:
    #eaf7ff;

  border-radius: 50px;

  padding:
    8px 16px;

  margin:
    0 auto 20px;

  width: fit-content;

  max-width: 100%;
}

.player .disc {
  font-size: 1.3rem;

  animation:
    spin 4s linear infinite;
}

.player.paused .disc {
  animation-play-state:
    paused;
}

@keyframes spin {

  to {
    transform:
      rotate(360deg);
  }
}

.player span {
  font-size: .78rem;

  color:
    #0077b6;

  font-weight: 300;

  white-space:
    nowrap;

  overflow:
    hidden;

  text-overflow:
    ellipsis;
}

.player .tg {
  background:
    #00b4d8;

  color: white;

  border-radius:
    50%;

  width: 30px;

  height: 30px;

  font-size: .8rem;

  padding: 0;

  flex-shrink: 0;

  display: flex;

  align-items: center;

  justify-content: center;
}


/* ================= QR ================= */

.qr-box {
  margin-top: 22px;

  padding-top: 18px;

  border-top:
    2px dashed #ade8f4;
}

.qr-box h3 {
  color:
    #0096c7;

  font-size: .95rem;

  margin-bottom: 12px;

  font-weight: 500;
}

#qr {
  width: 165px;

  height: 165px;

  border-radius: 16px;

  box-shadow:
    0 6px 20px
    rgba(0,119,182,.2);
}

input {
  width: 100%;

  margin-top: 14px;

  padding:
    10px 14px;

  border:
    2px solid #ade8f4;

  border-radius: 12px;

  font-size: .8rem;

  outline: none;

  text-align: center;

  color:
    #0077b6;

  font-family:
    'Kanit',
    sans-serif;
}

input:focus {
  border-color:
    #00b4d8;
}


/* ================= Floating ================= */

.float {
  position: fixed;

  animation:
    up 7s linear infinite;

  z-index: 1;

  pointer-events:
    none;
}

@keyframes up {

  0% {
    transform:
      translateY(100vh)
      scale(.5)
      rotate(0);

    opacity: 1;
  }

  100% {
    transform:
      translateY(-140px)
      scale(1.3)
      rotate(360deg);

    opacity: 0;
  }
}


/* ================= YouTube ================= */

.youtube-hidden {
  position: fixed;

  width: 1px;

  height: 1px;

  opacity: .01;

  pointer-events: none;

  bottom: 0;

  left: 0;
}


/* ================= Mobile ================= */

@media (max-width: 480px) {

  main {
    padding: 15px;
  }

  .card {
    padding:
      30px 20px;

    border-radius:
      25px;
  }

  h1 {
    font-size:
      1.45rem;
  }

  .icon {
    font-size:
      3.3rem;
  }

  .player span {
    max-width:
      180px;
  }

  button {
    padding:
      12px 25px;
  }
}

</style>