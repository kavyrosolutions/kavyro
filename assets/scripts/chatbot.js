(function () {
  /* ── Knowledge base ─────────────────────────────────────── */
  const KB = [
    {
      keys: ['hello','hi','hey','good morning','good afternoon','good evening','sup','greetings','start'],
      reply: "Hi there! 👋 Welcome to **Kavyro Solutions**. I'm here to help you with any questions about our services, pricing, or how to get started.\n\nWhat can I help you with today?",
      chips: ['Our Services', 'Pricing', 'Get Started', 'Contact Us']
    },
    {
      keys: ['service','offer','do','provide','help','what you do','capabilities','speciali'],
      reply: "We offer a full suite of digital services:\n\n📈 **Digital Marketing** — multi-channel campaigns\n🔍 **SEO Optimization** — organic growth strategies\n🎬 **Video Editing** — reels, ads, YouTube\n💻 **Web Development & Design** — custom sites\n🎨 **Graphic Design** — branding & visuals\n✍️ **Content Marketing** — blogs, copy, email\n📣 **Paid Advertising** — Google, Facebook, IG\n📱 **Social Media Management** — fully managed\n🤝 **Virtual Assistant Services** — admin, CRM, ops\n\nWhich service are you most interested in?",
      chips: ['SEO', 'Web Development', 'Social Media', 'Virtual Assistant']
    },
    {
      keys: ['seo','search engine','rank','organic','google ranking','keyword'],
      reply: "Our **SEO Optimization** service includes:\n\n• Technical SEO audits & fixes\n• On-page optimization\n• Content strategy & keyword research\n• Link building & authority growth\n• Monthly performance reporting\n\nMost clients start seeing measurable improvements within 60–90 days. 📊\n\nWould you like to discuss your SEO goals?",
      chips: ['Get a Quote', 'How Long Does SEO Take?', 'Contact Us']
    },
    {
      keys: ['web','website','development','design','landing page','wordpress','ecommerce'],
      reply: "Our **Web Development & Design** team builds:\n\n• Custom business websites\n• E-commerce stores\n• Landing pages & sales funnels\n• Web apps & portals\n\nAll projects are mobile-first, fast-loading, and conversion-optimized. Turnaround is typically **7–21 days** depending on scope.\n\nReady to start your project?",
      chips: ['Get a Quote', 'Turnaround Time', 'Contact Us']
    },
    {
      keys: ['social media','instagram','facebook','tiktok','twitter','posting','community'],
      reply: "Our **Social Media Management** covers:\n\n• Content calendar & scheduling\n• Custom graphics & captions\n• Community engagement & replies\n• Growth strategy & hashtag research\n• Monthly analytics reports\n\nWe manage all major platforms — Facebook, Instagram, TikTok, LinkedIn, and more. 📱",
      chips: ['How Much Does It Cost?', 'Get Started', 'Contact Us']
    },
    {
      keys: ['virtual assistant','va','admin','task','schedule','email management','crm','assistant'],
      reply: "Our **Virtual Assistant** services are perfect for busy entrepreneurs and teams:\n\n• Email & calendar management\n• Research & data entry\n• CRM updates & lead follow-up\n• Customer support\n• Administrative tasks\n• Any repetitive business task!\n\nOur VAs are skilled, reliable, and work in your timezone. ⏱️",
      chips: ['VA Pricing', 'How to Get Started', 'Contact Us']
    },
    {
      keys: ['video','editing','reel','youtube','montage','footage','clip'],
      reply: "Our **Video Editing** team handles:\n\n• Social media reels & shorts\n• YouTube videos & vlogs\n• Ad creatives & promo videos\n• Corporate & explainer videos\n• Subtitles, color grading & motion graphics\n\nFast turnaround with unlimited revisions on premium plans. 🎬",
      chips: ['Get a Quote', 'Turnaround Time', 'Contact Us']
    },
    {
      keys: ['graphic','design','logo','brand','banner','poster','flyer','visual'],
      reply: "Our **Graphic Design** services include:\n\n• Logo & brand identity design\n• Social media graphics\n• Marketing materials (flyers, brochures)\n• Ad creatives & banners\n• Presentations & infographics\n\nAll designs are delivered in print-ready and digital formats. 🎨",
      chips: ['Get a Quote', 'How Long Does It Take?', 'Contact Us']
    },
    {
      keys: ['content','blog','copywriting','article','copy','email','newsletter','script'],
      reply: "Our **Content Marketing** team creates:\n\n• Blog posts & articles (SEO-optimized)\n• Email newsletters & sequences\n• Landing page & ad copy\n• Video scripts\n• Lead magnets & ebooks\n\nAll content is crafted to attract, engage, and convert your audience. ✍️",
      chips: ['Get a Quote', 'Contact Us']
    },
    {
      keys: ['ads','advertising','paid','ppc','facebook ads','google ads','campaign','roas'],
      reply: "Our **Paid Advertising** team manages:\n\n• Google Search & Display Ads\n• Facebook & Instagram Ads\n• Retargeting campaigns\n• Ad creative design & A/B testing\n• Budget management & ROAS optimization\n\nWe typically see a **3–6× ROAS** for our e-commerce clients within 60 days. 📣",
      chips: ['Minimum Ad Budget?', 'Get a Quote', 'Contact Us']
    },
    {
      keys: ['digital marketing','marketing','strategy','campaign','brand awareness'],
      reply: "Our **Digital Marketing** strategies are data-driven and AI-powered:\n\n• Multi-channel campaign planning\n• Audience research & targeting\n• Brand awareness & lead generation\n• Funnel building & optimization\n• Monthly reporting & performance reviews\n\nWe tailor every strategy to your specific business goals. 📈",
      chips: ['Get a Quote', 'How We Work', 'Contact Us']
    },
    {
      keys: ['price','pricing','cost','how much','rate','fee','package','plan','afford','budget'],
      reply: "Our pricing is flexible and tailored to your needs. As a general guide:\n\n💼 **Starter** — from $299/mo (1–2 services)\n🚀 **Growth** — from $699/mo (3–4 services)\n🏆 **Full-Scale** — from $1,299/mo (all-inclusive)\n\nOne-time projects (web design, videos, graphics) are quoted individually.\n\n📩 For a custom quote, let's have a quick discovery call — it's free!",
      chips: ['Book Free Consultation', 'Contact Us', 'Our Services']
    },
    {
      keys: ['minimum','ad budget','minimum budget','spending','how much ads'],
      reply: "For paid advertising (Google/Facebook/Instagram), we recommend a **minimum ad spend of $300–$500/month** to generate meaningful data and results.\n\nOur management fee is separate from your ad spend budget. We'll help you allocate it strategically to maximize your ROAS.",
      chips: ['Get a Quote', 'Contact Us']
    },
    {
      keys: ['start','get started','begin','onboard','signup','sign up','work with'],
      reply: "Getting started with Kavyro Solutions is simple! Here's how:\n\n1️⃣ **Book a free discovery call** — we learn about your goals\n2️⃣ **Receive a custom proposal** — clear scope & pricing\n3️⃣ **Onboarding** — we set everything up fast\n4️⃣ **We get to work!** — with regular updates\n\nMost projects launch within **3–5 business days** of signing. 🚀",
      chips: ['Book Free Consultation', 'Contact Us', 'Our Process']
    },
    {
      keys: ['process','how it work','workflow','step','procedure'],
      reply: "Our process is built for clarity and speed:\n\n🔍 **Step 1 — Discovery** — We understand your business & goals\n📋 **Step 2 — Proposal** — Custom scope, timeline & pricing\n⚙️ **Step 3 — Onboarding** — Access, tools & kickoff\n🚀 **Step 4 — Execute** — Delivery with regular updates\n📊 **Step 5 — Review & Grow** — Optimize and scale\n\nNo surprises. Just results.",
      chips: ['Get Started', 'Contact Us']
    },
    {
      keys: ['turnaround','how long','timeline','delivery','deadline','fast','quick'],
      reply: "Typical turnaround times:\n\n🌐 **Website** — 7–21 days\n🎨 **Logo/Branding** — 3–5 days\n📱 **Social Media Setup** — 3–5 days\n🎬 **Video Editing** — 2–4 days/video\n✍️ **Blog/Copy** — 1–3 days\n📣 **Ad Campaign Setup** — 5–7 days\n\nAll timelines depend on project complexity and how quickly we receive your materials.",
      chips: ['Get a Quote', 'Contact Us']
    },
    {
      keys: ['ai','artificial intelligence','automation','technology','machine learning','smart'],
      reply: "At Kavyro Solutions, AI isn't a buzzword — it's embedded in how we work:\n\n🤖 AI-enhanced content creation\n📊 Predictive analytics & reporting\n⚙️ Automated campaign optimization\n🎯 Smart audience targeting\n🔄 Workflow automation for your business\n\nThis means faster delivery, smarter decisions, and better results for you.",
      chips: ['Our Services', 'Get Started', 'Contact Us']
    },
    {
      keys: ['contact','reach','email','phone','message','talk','speak','call','chat'],
      reply: "You can reach us through:\n\n📧 **Email:** kavyrosolutions@gmail.com\n📅 **Book a call:** Use the contact form on this page\n📱 **Facebook:** Kavyro Solutions\n📸 **Instagram:** @kavyrosolutions\n\n⏱️ We respond within **24 hours**, Mon–Sat, 8AM–8PM.",
      chips: ['Book Free Consultation', 'Visit Contact Form']
    },
    {
      keys: ['about','who are you','company','agency','kavyro','team','founded'],
      reply: "**Kavyro Solutions** is a full-service AI-driven digital agency and virtual assistant company.\n\nWe help businesses and brands connect, grow, and thrive by combining:\n• Expert human talent\n• AI-powered tools\n• Data-driven strategies\n• Fast, reliable delivery\n\nOur team spans digital marketing, design, development, video, and business operations. 🌐",
      chips: ['Our Services', 'Why Choose Us?', 'Contact Us']
    },
    {
      keys: ['why','benefit','advantage','different','unique','better','choose','vs'],
      reply: "Here's why clients choose Kavyro Solutions:\n\n⚡ **Fast delivery** — most projects start within 3–5 days\n🤖 **AI-powered** — smarter strategies & automation\n🎯 **Results-focused** — every action tied to your goals\n💼 **All-in-one** — VA + full digital agency in one team\n💡 **Transparent pricing** — no hidden fees\n🌍 **Available 6 days a week** — we're here when you need us",
      chips: ['Get Started', 'Pricing', 'Contact Us']
    },
    {
      keys: ['revision','change','edit','update','feedback','rework'],
      reply: "We believe in getting it right! Our revision policy:\n\n• **Standard plans** — 2 rounds of revisions included\n• **Premium plans** — unlimited revisions\n• All revisions are handled within **1–2 business days**\n\nWe work collaboratively with you throughout the project to minimize back-and-forth.",
      chips: ['Our Services', 'Pricing', 'Contact Us']
    },
    {
      keys: ['guarantee','refund','money back','promise','assurance'],
      reply: "We stand behind our work:\n\n✅ We don't stop until you're satisfied\n✅ Revision rounds are always included\n✅ Transparent communication throughout\n✅ Clear contracts — no hidden surprises\n\nYour success is our success. If something isn't right, we make it right.",
      chips: ['Get Started', 'Contact Us']
    },
    {
      keys: ['thank','thanks','great','awesome','perfect','nice','good','appreciate','helpful'],
      reply: "You're very welcome! 😊 We're happy to help.\n\nIs there anything else you'd like to know about Kavyro Solutions? We're always here for you.",
      chips: ['Our Services', 'Get Started', 'Contact Us']
    },
    {
      keys: ['bye','goodbye','see you','later','ciao','done'],
      reply: "Thanks for chatting with us! 👋 Feel free to come back anytime.\n\nWhenever you're ready to take your business to the next level, Kavyro Solutions is here. Have a great day! 🌟",
      chips: []
    }
  ];

  const FALLBACK = {
    reply: "I'm not sure I understand what you mean. Could you please provide more context or clarify your question? I'm here to help with any inquiries about Kavyro Solutions services, or reach us directly at **kavyrosolutions@gmail.com**. 📧",
    chips: ['Our Services', 'Pricing', 'Contact Us']
  };

  /* ── AI Config (Groq) ───────────────────────────────────── */
  function ksBuildSystemPrompt() {
    const kbText = KB.map(e => e.keys.join(', ') + ':\n' + e.reply).join('\n\n---\n\n');
    return `You are Kavi, the friendly AI assistant for Kavyro Solutions — an AI-driven digital agency and VA company. Help visitors learn about services, pricing, and how to get started.

RULES:
- Be warm, professional, concise (under 200 words unless detail is requested).
- Use **bold** markdown, bullet points, line breaks, and occasional emojis matching the brand.
- Never invent services, prices, or facts not listed in the knowledge base below.
- If the user wants to contact, book, or get a quote, include "Visit Contact Form" in chips.
- Politely decline off-topic questions unrelated to Kavyro Solutions.

CHIPS: Return 2–4 short button labels in the chips array. Prefer these exact strings when applicable: "Our Services", "Pricing", "Get Started", "Contact Us", "Visit Contact Form", "Book Free Consultation". You may also use free-form strings for natural follow-ups.

OUTPUT FORMAT: You must always respond with a valid JSON object and nothing else:
{"reply": "your message here", "chips": ["Chip 1", "Chip 2"]}

KNOWLEDGE BASE:
${kbText}`;
  }

  const AI_CONFIG = {
    apiKey:       '',
    endpoint:     'https://api.groq.com/openai/v1/chat/completions',
    model:        'llama-3.3-70b-versatile',
    systemPrompt: ksBuildSystemPrompt()
  };

  let ksHistory = [];
  const KS_MAX_HISTORY_TURNS = 10;

  /* ── DOM refs ───────────────────────────────────────────── */
  const win    = document.getElementById('ks-window');
  const bubble = document.getElementById('ks-bubble');
  const msgs   = document.getElementById('ks-msgs');
  const quick  = document.getElementById('ks-quick');
  const input  = document.getElementById('ks-input');
  const notif  = document.getElementById('ks-notif');

  let isOpen   = false;
  let greeted  = false;
  let ksBusy   = false;

  /* ── Toggle ─────────────────────────────────────────────── */
  window.ksChatToggle = function () {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    bubble.querySelector('.ic-chat').style.display  = isOpen ? 'none' : '';
    bubble.querySelector('.ic-close').style.display = isOpen ? '' : 'none';
    if (isOpen) {
      notif.style.display = 'none';
      if (!greeted) { greeted = true; setTimeout(() => ksBot("Hi there! 👋 I'm Kavi, your Kavyro Solutions assistant. How can I help you today?", ['Our Services','Pricing','Get Started','Contact Us']), 400); }
      setTimeout(() => input.focus(), 350);
    }
  };

  /* ── Append message ─────────────────────────────────────── */
  function ksAppend(text, role) {
    const wrap = document.createElement('div');
    wrap.className = 'ks-msg ' + role;
    const av = document.createElement('div');
    av.className = 'ks-msg-av';
    av.textContent = role === 'bot' ? '🤖' : 'You';
    av.style.fontSize = role === 'user' ? '0.6rem' : '';
    const bub = document.createElement('div');
    bub.className = 'ks-bubble-msg';
    // Render simple markdown: **bold** and newlines
    bub.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    if (role === 'bot') { wrap.appendChild(av); wrap.appendChild(bub); }
    else                { wrap.appendChild(bub); wrap.appendChild(av); }
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  /* ── Typing indicator ───────────────────────────────────── */
  function ksTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'ks-msg bot ks-typing';
    wrap.id = 'ks-typing-indicator';
    const av = document.createElement('div');
    av.className = 'ks-msg-av'; av.textContent = '🤖';
    const bub = document.createElement('div');
    bub.className = 'ks-bubble-msg';
    for (let i = 0; i < 3; i++) { const d = document.createElement('div'); d.className = 'ks-dot'; bub.appendChild(d); }
    wrap.appendChild(av); wrap.appendChild(bub);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }
  function ksRemoveTyping() {
    const t = document.getElementById('ks-typing-indicator');
    if (t) t.remove();
  }

  /* ── Render chips ───────────────────────────────────────── */
  function ksChips(chips) {
    quick.innerHTML = '';
    chips.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'ks-chip';
      btn.textContent = label;
      btn.onclick = () => ksHandle(label);
      quick.appendChild(btn);
    });
  }

  /* ── Bot respond ────────────────────────────────────────── */
  function ksBot(text, chips) {
    ksTyping();
    const delay = Math.min(600 + text.length * 12, 1800);
    setTimeout(() => {
      ksRemoveTyping();
      ksAppend(text, 'bot');
      ksChips(chips || []);
    }, delay);
  }

  /* ── Scroll-action chip labels ──────────────────────────── */
  const SCROLL_TO_CONTACT = new Set([
    'contact us', 'visit contact form', 'book free consultation', 'get a quote'
  ]);

  /* ── Groq API call ──────────────────────────────────────── */
  async function ksCallGemini(userText) {
    ksHistory.push({ role: 'user', content: userText });
    if (ksHistory.length > KS_MAX_HISTORY_TURNS * 2)
      ksHistory = ksHistory.slice(ksHistory.length - KS_MAX_HISTORY_TURNS * 2);

    const payload = JSON.stringify({
      model:           AI_CONFIG.model,
      messages:        [{ role: 'system', content: AI_CONFIG.systemPrompt }, ...ksHistory],
      response_format: { type: 'json_object' },
      temperature:     0.7,
      max_tokens:      512
    });

    const doFetch = () => fetch(AI_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + AI_CONFIG.apiKey
      },
      body: payload
    });

    let response = await doFetch();

    // Rate-limited — wait 5 s then retry once
    if (response.status === 429) {
      await new Promise(r => setTimeout(r, 5000));
      response = await doFetch();
    }

    if (!response.ok) { ksHistory.pop(); throw new Error('HTTP ' + response.status); }

    const data    = await response.json();
    const rawJson = data.choices[0].message.content;
    ksHistory.push({ role: 'assistant', content: rawJson });

    const parsed = JSON.parse(rawJson);
    return {
      reply: parsed.reply || FALLBACK.reply,
      chips: Array.isArray(parsed.chips) ? parsed.chips : []
    };
  }

  async function ksHandle(text) {
    const raw = text.toLowerCase();

    // Scroll-action chips — instant, no AI needed
    if (SCROLL_TO_CONTACT.has(raw)) {
      const msg = raw === 'visit contact form'
        ? "I'll take you to our contact form! 📋"
        : "Heading to our contact form where you can book your free consultation! 🗓️";
      ksBot(msg, []);
      setTimeout(() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }), 800);
      return;
    }

    if (ksBusy) return;
    ksBusy = true;
    ksAppend(text, 'user');
    ksChips([]);
    ksTyping();

    try {
      const { reply, chips } = await ksCallGemini(text);
      ksRemoveTyping();
      ksAppend(reply, 'bot');
      ksChips(chips || []);
    } catch (err) {
      ksRemoveTyping();
      const q = text.toLowerCase();
      const m = KB.find(k => k.keys.some(kw => q.includes(kw)));
      ksAppend(m ? m.reply : FALLBACK.reply, 'bot');
      ksChips(m ? m.chips : FALLBACK.chips);
      console.warn('[Kavi] API unavailable, using KB fallback:', err.message);
    } finally {
      ksBusy = false;
    }
  }

  /* ── Send ───────────────────────────────────────────────── */
  window.ksSend = function () {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    ksHandle(text);
  };

  /* ── Show notif dot after 3s if chat not opened ─────────── */
  setTimeout(() => { if (!isOpen) notif.style.display = ''; }, 3000);
})();