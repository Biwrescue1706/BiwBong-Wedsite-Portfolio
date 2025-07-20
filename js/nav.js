const navHTML = `
<nav id="nav-container">
  <div class="menu-toggle" id="menu-toggle">☰</div>
  <ul id="nav-list">
    <li><a href="index.html">ประวัติส่วนตัว</a></li>
    <li><a href="education.html">การศึกษา</a></li>
    <li><a href="certificate.html">เกียรติบัตร</a></li>
    <li><a href="hobbies.html">กิจกรรมยามว่าง</a></li>
    <li><a href="portfolio.html">ผลงาน</a></li>
    <li><a href="work.html">ประวัติการทำงาน</a></li>
    <li><a href="contact.html">ติดต่อฉัน</a></li>
    <li><a href="action.html">ดาวน์โหลด</a></li>
  </ul>
</nav>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('nav-container').innerHTML = navHTML;

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
    });
  }
});
