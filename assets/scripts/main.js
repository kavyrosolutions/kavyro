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