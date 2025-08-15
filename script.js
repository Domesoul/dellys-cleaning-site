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
