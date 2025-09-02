// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteMenu = document.getElementById('siteMenu');
if (navToggle && siteMenu) {
  navToggle.addEventListener('click', () => {
    const open = siteMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// WhatsApp form submit -> opens chat with prefilled details
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

    const msg =
      `Hello Delly's Cleaning,%0A%0A` +
      `Name: ${encodeURIComponent(name)}%0A` +
      `Phone: ${encodeURIComponent(phone)}%0A` +
      (email ? `Email: ${encodeURIComponent(email)}%0A` : '') +
      `Service: ${encodeURIComponent(service)}%0A` +
      (date ? `Preferred date: ${encodeURIComponent(date)}%0A` : '') +
      (address ? `Address: ${encodeURIComponent(address)}%0A` : '') +
      (notes ? `Notes: ${encodeURIComponent(notes)}%0A` : '');

    window.open(`https://wa.me/2349045762007?text=${msg}`, '_blank', 'noopener');
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
// ===== Lightbox for #gallery =====
(() => {
  const figs = Array.from(document.querySelectorAll('#gallery .g-item'));
  if (!figs.length) return;

  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCap');
  const btnPrev = lb.querySelector('.lb-prev');
  const btnNext = lb.querySelector('.lb-next');
  const btnClose = lb.querySelector('.lb-close');

  const items = figs.map(f => {
    const i = f.querySelector('img');
    const c = f.querySelector('figcaption');
    return { src: i?.getAttribute('src') || '', alt: i?.getAttribute('alt') || '', cap: c?.textContent?.trim() || '' };
  });

  let idx = 0;

  function show(n){
    idx = (n + items.length) % items.length;
    const it = items[idx];
    img.src = it.src;
    img.alt = it.alt || it.cap || 'Gallery image';
    cap.textContent = it.cap || '';
  }
  function open(n){
    show(n);
    lb.classList.add('open');
    document.body.classList.add('noscroll');
  }
  function close(){
    lb.classList.remove('open');
    document.body.classList.remove('noscroll');
    // allow the fade-out to finish then drop the src for memory
    setTimeout(()=>{ img.removeAttribute('src'); }, 150);
  }

  figs.forEach((f, i) => f.addEventListener('click', () => open(i)));
  btnPrev.addEventListener('click', e => { e.stopPropagation(); show(idx-1); });
  btnNext.addEventListener('click', e => { e.stopPropagation(); show(idx+1); });
  btnClose.addEventListener('click', e => { e.stopPropagation(); close(); });
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx-1);
    if (e.key === 'ArrowRight') show(idx+1);
  });
})();
document.addEventListener('mousedown', (e) => {
  if (e.target.matches('.menu .btn')) e.target.blur();
});
// Highlight active nav link while scrolling
(() => {
  const sections = document.querySelectorAll('section[id]');
  const links = [...document.querySelectorAll('.menu a[href^="#"]')];
  if (!sections.length || !links.length) return;

  const linkById = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      links.forEach(a => a.classList.toggle('active', a === linkById.get(id)));
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

  sections.forEach(s => io.observe(s));
})();
// Back to top reveal + smooth scroll
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (!toTop) return;
  toTop.classList.toggle('show', window.scrollY > 600);
});
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
// Set min date = today
(() => {
  const d = document.getElementById('date');
  if (!d) return;
  const t = new Date(), pad = n => String(n).padStart(2,'0');
  d.min = `${t.getFullYear()}-${pad(t.getMonth()+1)}-${pad(t.getDate())}`;
})();





