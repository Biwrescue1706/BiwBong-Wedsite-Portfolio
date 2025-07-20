document.addEventListener('DOMContentLoaded', () => {
  fetch('nav.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('nav-container').innerHTML = data;

      const menuToggle = document.getElementById('menu-toggle');
      const navList = document.getElementById('nav-list');

      if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
          navList.classList.toggle('show');

          if (navList.classList.contains('show')) {
            menuToggle.textContent = "✖";
          } else {
            menuToggle.textContent = "☰";
          }

          console.log('toggle เมนู nav');
        });
      } else {
        console.log('ไม่พบ menuToggle หรือ navList');
      }
    })
    .catch(err => console.error('โหลด nav.html ผิดพลาด:', err));
});
