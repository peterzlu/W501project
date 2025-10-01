/* ---------- Fix 100vh บนมือถือ ---------- */
(function fixVH(){
  const set = () => {
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
  };
  set();
  window.addEventListener('resize', set);
})();

/* ---------- เติมชื่อผู้เล่น ---------- */
function getPlayerName(){
  // อ่านชื่อที่เก็บจากหน้า Index
  return sessionStorage.getItem('nickname')
      || sessionStorage.getItem('mpb.name')  // เผื่อมีของเก่า
      || '';
}
function fillPlayerName(root=document){
  const n = getPlayerName();
  root.querySelectorAll('[data-name]').forEach(el => el.textContent = n);
}
document.addEventListener('DOMContentLoaded', () => fillPlayerName());


// ====== ฟังก์ชันเก็บคะแนน ======
const scores = { A1:0, A2:0, B1:0, B2:0, C1:0, C2:0, D1:0, D2:0 };
      // ฟังก์ชันบวกคะแนน ---------------------------------------------------------------------
function addScore(variable, point) {
  scores[variable] += point;
  /*console.log(`เพิ่ม ${point} ให้ ${variable}`);
  console.log("คะแนนปัจจุบัน:", scores);*/
}

/* ---------- รายการไฟล์ที่จะโหลด (แก้ไขได้ง่าย) ---------- */
const ASSETS = {
  images: [
    'assets/images/Photos/01.gif',
    'assets/images/Photos/02.gif',
    'assets/images/Photos/03.jpg',
    'assets/images/Photos/04_1.gif',
    'assets/images/Photos/04.gif',
    'assets/images/Photos/05_1.gif',
    'assets/images/Photos/05.gif',
    'assets/images/Photos/06_1.gif',
    'assets/images/Photos/06.gif',
    'assets/images/Photos/07.gif',
    'assets/images/Photos/08.jpg',
    'assets/images/Photos/09.gif',
    'assets/images/Photos/10.gif',
    'assets/images/Photos/11.jpg',
    'assets/images/Photos/messageblack.png',
    'assets/images/Photos/Overlaybetween-01.png'
  ],
  audio: [
    'assets/audio/BGM/ดาดฟ้า.wav',
    'assets/audio/BGM/Effects/Glitch.mp3',
    'assets/audio/BGM/Effects/Rock.mp3',
    'assets/audio/BGM/Effects/Thorns.mp3',
    'assets/audio/BGM/Effects/Wind.mp3',
  ]
};

const bgm = new Howl({
  src:['assets/audio/BGM/ดาดฟ้า.wav'],
  volume:0.5,
  loop: true
})

const glitch = new Howl({
  src:['assets/audio/BGM/Effects/Glitch.mp3'],
  volume:0.5,
  loop: true
})

const wind = new Howl({
  src:['assets/audio/BGM/Effects/Wind.mp3'],
  volume:0,
  loop: true
})

const rock = new Howl({
  src:['assets/audio/BGM/Effects/Rock.mp3'],
  volume:0,
})

const thorn = new Howl({
  src:['assets/audio/BGM/Effects/Thorns.mp3'],
  volume:0,
  loop: true
})

// เก็บอินสแตนซ์เสียงไว้ใช้ภายหลัง (ไม่ต้องโหลดซ้ำ)
async function preloadAll() {
  const total = ASSETS.images.length + ASSETS.audio.length;
  let done = 0;
  const update = () => {
    done++;
    const pct = Math.min(100, Math.round((done/total)*100));
    document.getElementById('progressBar').style.width = pct + '%';
    document.getElementById('percentNum').textContent = pct;
  };

  const imgPromises = ASSETS.images.map(src => new Promise(res => {
    const img = new Image();
    img.onload = img.onerror = () => { update(); res(); };
    img.src = src;
  }));

  const audioPromises = ASSETS.audio.map(src => new Promise(res => {
    const howl = new Howl({ src:[src], preload:true, html5:/\.(mp3|wav)$/i.test(src) });
    howl.once('load',      () => { update(); res(); });
    howl.once('loaderror', () => { update(); res(); });
  }));

  // ✅ รอให้ครบจริง ๆ
  await Promise.all([...imgPromises, ...audioPromises]);
}



document.addEventListener('DOMContentLoaded', async () => {
  const btn = document.getElementById('loaderStartBtn');

  // เริ่มโหลดจริง และรอให้ครบ 100%
  await preloadAll();

  // ปลดล็อกปุ่ม START (ใช้คลาส ไม่ใช่ disabled)
  btn.classList.add('ready'); // ให้ CSS ของคุณ .loadbtn.ready {opacity:1; pointer-events:auto;}

  // ให้คลิก START แล้วค่อย: (1) เล่น BGM (2) ซ่อน loader (3) ปล่อยให้ href พาไป #scene1
  btn.addEventListener('click', () => {
    // ✅ user gesture แล้ว → เล่น/เฟดได้ทันที
    if (!bgm.playing()) {
      bgm.play();
      bgm.fade(0, 0.35, 1000);
    }

    // เอฟเฟกต์ซ่อน loader (ตามของคุณ)
    const loaderScene = document.getElementById('scene0');
    setTimeout(() => loaderScene.classList.add('hidden'), 300);
    // ปล่อยให้ <a href="#scene1"> ทำหน้าที่เลื่อนไปฉาก 1 เอง (ไม่ต้อง .click() ซ้ำ)
  }, { once: true });
});




