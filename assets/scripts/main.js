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

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } });
}, { threshold: 0.1 });
document.querySelectorAll('.svc-card, .why-item, .step, .testi-card, .ai-card').forEach(el => {
el.style.opacity = '0';
el.style.transform = 'translateY(20px)';
el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
observer.observe(el);
});
/* Inline icons draw themselves the first time they scroll into view. Armed
   from JS so that with scripting off (or reduced motion) they simply render
   finished rather than staying invisible. */
(function () {
  const icons = document.querySelectorAll('svg.icon');
  if (!icons.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const draw = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-drawn');
      draw.unobserve(e.target);
    });
  }, { threshold: 0.25, rootMargin: '0px 0px -40px 0px' });

  icons.forEach((icon) => {
    icon.classList.add('is-armed');
    draw.observe(icon);
  });

  // Whatever happens — a hidden tab, an observer that never fires — no icon
  // stays invisible for more than a few seconds.
  setTimeout(function () {
    icons.forEach((icon) => icon.classList.add('is-drawn'));
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
