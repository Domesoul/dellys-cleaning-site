// Mobile menu
const navToggle = document.getElementById('navToggle');
const siteMenu = document.getElementById('siteMenu');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = siteMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
},{threshold: 0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Quote form -> WhatsApp deep link
const qForm = document.getElementById('quoteForm');
if (qForm) {
  qForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(qForm));
    const msg =
`Hello Delly's Cleaning,

I'd like a quote.

Name: ${data.name||''}
Phone: ${data.phone||''}
Email: ${data.email||''}
Service: ${data.service||''}
Date: ${data.date||''}
Address: ${data.address||''}
Details: ${data.notes||''}`;
    const url = `https://wa.me/2349045762007?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
}
// Lightbox
(function(){
  const lb = document.createElement('div');
  lb.className = 'lb';
  lb.innerHTML = `
    <div class="lb-inner">
      <button class="lb-close" aria-label="Close">×</button>
      <img class="lb-img" alt="">
      <div class="lb-cap"></div>
    </div>`;
  document.body.appendChild(lb);

  const imgEl = lb.querySelector('.lb-img');
  const capEl = lb.querySelector('.lb-cap');
  const closeBtn = lb.querySelector('.lb-close');

  function openLB(src, cap) {
    imgEl.src = src;
    imgEl.alt = cap || '';
    capEl.textContent = cap || '';
    lb.classList.add('open');
  }
  function closeLB() {
    lb.classList.remove('open');
    imgEl.src = '';
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.glink');
    if (!a) return;
    e.preventDefault();
    openLB(a.getAttribute('href'), a.dataset.caption || a.title || '');
  });
  closeBtn.addEventListener('click', closeLB);
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLB(); });
})();

