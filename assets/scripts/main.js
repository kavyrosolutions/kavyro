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

  // Whatever is already on screen at load skips the wait entirely, and
  // anything the observer never reports still ends up visible quickly.
  requestAnimationFrame(function () {
    blocks.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.remove('is-waiting');
    });
  });
  setTimeout(function () {
    blocks.forEach((el) => el.classList.remove('is-waiting'));
  }, 1200);
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


/* ─── 2026 motion system ─────────────────────────────────────────
   One scroll handler, one rAF per frame: the header fill, the progress
   rail, the hero drifting out, and the pinned process row. Reveals are
   an IntersectionObserver adding is-in. Under reduced motion only the
   header state runs. */
(function () {
  const ASSET_V = '20260926a';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canObserve = 'IntersectionObserver' in window;

  // Reveals. html.js is what lets CSS hide anything, so it is set only when
  // something will show it again.
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length && canObserve && !reduce) {
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => {
      const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal')) : [];
      const i = sibs.indexOf(el);
      if (i > 0) el.style.setProperty('--d', Math.min(i, 6) * 70 + 'ms');
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  const nav = document.querySelector('nav.nav-over');
  const rail = document.querySelector('.prog i');
  const heroCopy = document.querySelector('[data-hero-copy]');
  const pin = document.querySelector('[data-pin]');
  const track = pin && pin.querySelector('[data-pin-track]');
  const pinRail = pin && pin.querySelector('[data-pin-rail]');
  let travel = 0;

  function measure() {
    if (!pin || !track || reduce) return;
    pin.classList.add('is-pinned');
    travel = Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
    pin.style.height = (window.innerHeight + travel) + 'px';
  }

  function update() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (nav) nav.classList.toggle('is-scrolled', y > 24);
    if (reduce) return;
    if (rail) {
      const max = document.documentElement.scrollHeight - vh;
      rail.style.transform = 'scaleY(' + (max > 0 ? y / max : 0) + ')';
    }
    if (heroCopy && y < vh * 1.2) {
      const p = Math.min(1, y / (vh * 0.85));
      heroCopy.style.transform = 'translate3d(0,' + (-p * 120) + 'px,0)';
      heroCopy.style.opacity = String(1 - p);
    }
    if (pin && travel) {
      const r = pin.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -r.top / travel));
      track.style.transform = 'translate3d(' + (-p * travel) + 'px,0,0)';
      if (pinRail) pinRail.style.transform = 'scaleX(' + p + ')';
    }
  }

  let queued = false;
  function queue() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; update(); });
  }

  measure();
  update();
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', () => { measure(); queue(); });
  window.addEventListener('load', () => { measure(); queue(); });

  // Testimonials: one quote at a time, advancing every 7s until someone
  // picks one, and holding while the pointer or focus is inside.
  const quotes = document.querySelector('[data-quotes]');
  if (quotes) {
    const figs = [...quotes.querySelectorAll('.q')];
    const picks = [...quotes.querySelectorAll('.qpick')];
    let at = 0, timer = 0, held = false, chosen = reduce;
    const show = (i) => {
      at = i;
      figs.forEach((f, n) => f.classList.toggle('is-on', n === i));
      picks.forEach((b, n) => b.setAttribute('aria-pressed', String(n === i)));
    };
    const loop = () => {
      clearTimeout(timer);
      if (chosen || held) return;
      timer = setTimeout(() => { show((at + 1) % figs.length); loop(); }, 7000);
    };
    picks.forEach((b, i) => b.addEventListener('click', () => { chosen = true; clearTimeout(timer); show(i); }));
    const hold = (on) => { held = on; quotes.classList.toggle('is-paused', on); loop(); };
    quotes.addEventListener('mouseenter', () => hold(true));
    quotes.addEventListener('mouseleave', () => hold(false));
    quotes.addEventListener('focusin', () => hold(true));
    quotes.addEventListener('focusout', () => hold(false));
    loop();
  }

  // The WebGL globe is fetched only after the page has loaded, and not at
  // all on save-data; until then (or without WebGL) the SVG poster stands in.
  const globes = document.querySelectorAll('[data-globe]');
  const conn = navigator.connection;
  if (globes.length && !(conn && conn.saveData)) {
    const start = () => {
      import('./hero-globe.js?v=' + ASSET_V).then((m) => {
        globes.forEach((g) => m.mountGlobe(g.querySelector('canvas'), {
          labels: g.querySelector('.globe-labels'),
          scroll: g.dataset.globe === 'hero',
        }));
      }).catch(() => {});
    };
    const idle = () => (window.requestIdleCallback ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 200));
    if (document.readyState === 'complete') idle();
    else window.addEventListener('load', idle);
  }
})();
