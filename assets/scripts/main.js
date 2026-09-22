function openMob()  { document.getElementById('mobileNav').classList.add('open'); document.body.style.overflow='hidden'; }
function closeMob() { document.getElementById('mobileNav').classList.remove('open'); document.body.style.overflow=''; }

/* The old handler showed "✓ Message Sent!" and posted nothing anywhere. Leave
   FORM_ENDPOINT empty and the form composes a real email in the visitor's own
   mail client; set it to a FormSubmit / Formspree / serverless URL and the same
   form posts there instead (add that origin to connect-src in _headers). */
const FORM_ENDPOINT = '';
const CONTACT_EMAIL = 'kavyrosolutions@gmail.com';

function formSay(status, message, isError) {
if (!status) return;
status.textContent = message;
status.classList.toggle('is-error', !!isError);
}

function composeBody(d) {
return [
    'Name: ' + (d.firstName || '') + ' ' + (d.lastName || ''),
    'Email: ' + (d.email || ''),
    'Phone: ' + (d.phone || 'not given'),
    'Service: ' + (d.service || ''),
    '',
    d.message || ''
].join('\n');
}

function handleForm(e) {
e.preventDefault();
const form = e.target;
const status = form.querySelector('.form-status');
const btn = form.querySelector('button[type="submit"]');

if (!form.checkValidity()) {
    form.reportValidity();
    formSay(status, '');
    return;
}

const data = {};
new FormData(form).forEach((v, k) => { data[k] = v; });

if (!FORM_ENDPOINT) {
    window.location.href = 'mailto:' + CONTACT_EMAIL +
    '?subject=' + encodeURIComponent('Project enquiry: ' + (data.service || 'general')) +
    '&body=' + encodeURIComponent(composeBody(data));
    formSay(status, 'Opening your email app. If nothing happens, write to ' + CONTACT_EMAIL + ' directly.');
    return;
}

btn.disabled = true;
formSay(status, 'Sending…');
fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(form) })
    .then(res => {
    if (!res.ok) throw new Error('HTTP ' + res.status);
    form.reset();
    formSay(status, 'Thanks. We will reply within one business day.');
    })
    .catch(() => formSay(status, 'That did not go through. Please email ' + CONTACT_EMAIL + ' instead.', true))
    .then(() => { btn.disabled = false; });
}

// Active nav link on scroll
const secs = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
let cur = '';
secs.forEach(s => { if (window.scrollY >= s.offsetTop - 90) cur = s.id; });
links.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--blue)' : ''; });
});

/* Scroll reveal. Blocks fly up as they arrive, staggered within their own
   row so a grid arrives as a sequence rather than all at once. Classes do
   the work; JS only decides when, and only the first time. */
(function () {
  const SELECTOR = [
    '.svc-card', '.why-item', '.step', '.testi-card', '.ai-card', '.ai-list-item',
    '.svc-item', '.sys', '.work', '.plat', '.pf-gallery figure', '.pf-cap',
    '.c-item', '.faq details', '.legal-section', '.pf-head', '.trust-logo',
  ].join(', ');

  const blocks = document.querySelectorAll(SELECTOR);
  if (!blocks.length) return;
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      e.target.classList.remove('is-waiting');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  blocks.forEach((el, i) => {
    const row = el.parentElement ? [...el.parentElement.children].indexOf(el) : i;
    el.style.setProperty('--reveal-delay', Math.min(row % 6, 5) * 70 + 'ms');
    el.classList.add('reveal', 'is-waiting');
    io.observe(el);
  });

  // Anything the observer never reports still ends up visible.
  setTimeout(function () {
    blocks.forEach((el) => el.classList.remove('is-waiting'));
  }, 3000);
})();
/* Inline icons: armed from JS so that with scripting off they simply render
   finished, then set running whenever they are on screen and idle when they
   are not, so a long page is never animating things nobody is looking at. */
(function () {
  const icons = document.querySelectorAll('svg.icon');
  if (!icons.length) return;
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    icons.forEach((icon) => icon.classList.add('is-live'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('is-live', e.isIntersecting));
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

  icons.forEach((icon) => {
    icon.classList.add('is-armed');
    io.observe(icon);
  });

  // Nothing stays invisible if the observer never reports.
  setTimeout(function () {
    icons.forEach((icon) => { if (!icon.classList.contains('is-live')) icon.classList.add('is-live'); });
  }, 2500);
})();

/* Lottie slot. One element, one animation, and the 164KB player is only
   fetched if that element is on the page and the visitor has scrolled it
   into view — everything else on this site animates in CSS. */
(function () {
  const slot = document.querySelector('[data-lottie]');
  if (!slot || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    const s = document.createElement('script');
    s.src = 'assets/scripts/lottie-light.min.js?v=20260922h';
    s.onload = () => {
      window.lottie.loadAnimation({
        container: slot,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: slot.dataset.lottie,
      });
    };
    document.body.appendChild(s);
  };

  if (!('IntersectionObserver' in window)) { start(); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { start(); io.disconnect(); } });
  }, { rootMargin: '200px' });
  io.observe(slot);
})();
