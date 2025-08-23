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
