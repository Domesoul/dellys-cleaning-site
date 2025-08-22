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
// Auto BEFORE/AFTER badges from filenames
document.querySelectorAll('.g-item').forEach(fig => {
  const img = fig.querySelector('img');
  if (!img) return;
  const src = (img.getAttribute('src') || '').toLowerCase();
  const badge = document.createElement('div');
  badge.className = 'g-badge';
  if (src.includes('-before')) { badge.textContent = 'BEFORE'; badge.classList.add('before'); }
  else if (src.includes('-after')) { badge.textContent = 'AFTER'; badge.classList.add('after'); }
  else return;
  fig.appendChild(badge);
});
// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteMenu = document.getElementById('siteMenu');
if (navToggle && siteMenu) {
  navToggle.addEventListener('click', () => {
    const open = siteMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// WhatsApp form submit
const form = document.getElementById('quoteForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const get = id => (document.getElementById(id)?.value || '').trim();
    const name = get('name');
    const phone = get('phone');
    const email = get('email');
    const service = get('service');
    const date = get('date');
    const address = get('address');
    const notes = get('notes');

    const msg = `Hello Delly's Cleaning,%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      (email ? `Email: ${encodeURIComponent(email)}%0A` : '') +
      `Service: ${encodeURIComponent(service)}%0A` +
      (date ? `Preferred date: ${encodeURIComponent(date)}%0A` : '') +
      (address ? `Address: ${encodeURIComponent(address)}%0A` : '') +
      (notes ? `Notes: ${encodeURIComponent(notes)}%0A` : '');

    const url = `https://wa.me/2349045762007?text=${msg}`;
    window.open(url, '_blank', 'noopener');
  });
}
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());




