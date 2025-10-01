(function(){
  // ====== Mobile 100vh fix ======
  function setVH(){
    document.documentElement.style.setProperty('--vh', (window.innerHeight * 0.01) + 'px');
  }
  setVH();
  window.addEventListener('resize', setVH);

  // ====== Helpers ======
  const $ = (s, root=document) => root.querySelector(s);

  // Validation rules: เฉพาะไทย/อังกฤษ (ไม่เว้นวรรค ไม่ตัวเลข/พิเศษ)
  const INVALID_RE = /[^A-Za-z\u0E00-\u0E7F]/g;
  const VALID_RE   = /^[A-Za-z\u0E00-\u0E7F]+$/;

  document.addEventListener('DOMContentLoaded', () => {
    const form = $('#form');
    const input = $('#nickname');
    const err = $('#errorMsg');

    if (!form || !input) return;

    // กันกด space
    input.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.code === 'Space') e.preventDefault();
    });

    // ทำความสะอาดขณะพิมพ์
    input.addEventListener('input', () => {
      const before = input.value;
      const cleaned = before.replace(INVALID_RE, '');
      if (cleaned !== before) input.value = cleaned;
      err.textContent = '';
    });

    // กัน paste ตัวไม่อนุญาต
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData('text') || '';
      const cleaned = text.replace(INVALID_RE, '');
      document.execCommand('insertText', false, cleaned);
    });

    // ส่งฟอร์ม
    form.addEventListener('submit', (e) => {
  e.preventDefault();
  var name = document.getElementById('nickname').value;
  localStorage.setItem('nickname', name);
  if (!name) {
    err.textContent = 'โปรดใส่ชื่อของคุณ';
    input.focus();
    return;
  }

  // เก็บชื่อไว้ใน sessionStorage

  // ไปยังหน้า Journey
  window.location.href = "Journey.html";
});

  });
})();

