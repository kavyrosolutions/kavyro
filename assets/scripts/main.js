function openMob()  { document.getElementById('mobileNav').classList.add('open'); document.body.style.overflow='hidden'; }
function closeMob() { document.getElementById('mobileNav').classList.remove('open'); document.body.style.overflow=''; }

function handleForm(e) {
e.preventDefault();
const btn = e.target.querySelector('button[type="submit"]');
const orig = btn.textContent;
btn.textContent = '✓ Message Sent!';
btn.style.background = '#22c55e';
btn.style.borderColor = '#22c55e';
setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    btn.style.borderColor = '';
    e.target.reset();
}, 3500);
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