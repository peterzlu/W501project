function getPlayerName() {
  return sessionStorage.getItem('nickname')
      || sessionStorage.getItem('mpb.name')
      || '';
}

document.addEventListener('DOMContentLoaded', async () => {
  // เติมชื่อ
  const n = getPlayerName();
  document.querySelectorAll('[data-name]').forEach(el => el.textContent = n);

  const btn = document.getElementById('loaderStartBtn');
  await preloadAll(); // เรียกจากสคริปต์ของไฟล์ HTML เอง

  // ปลดล็อกปุ่ม
  btn.classList.add('ready');

  btn.addEventListener('click', () => {
    // ซ่อน Loader
    document.getElementById('scene0').classList.add('hidden');
    // เล่นเสียงที่คุณประกาศไว้ในไฟล์ HTML นี้เอง
  }, { once:true });
});


