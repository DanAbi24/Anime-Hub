/* ============================================
   OTAKU VERSE — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──────────────────────────────
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function followRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(followRing);
  })();

  document.querySelectorAll('a,button,.anime-card,.cs-item,.rrow,.acard-img,.featured-main-img').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.classList.add('hov'); ring.classList.add('hov'); });
    el.addEventListener('mouseleave', () => { cursor.classList.remove('hov'); ring.classList.remove('hov'); });
  });

  if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    ring.style.display   = 'none';
  }


  // ── NAVBAR SCROLL ─────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // ── MOBILE MENU ───────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ── HERO CAROUSEL ─────────────────────────────
  const slides   = document.querySelectorAll('.hero-slide');
  const dots     = document.querySelectorAll('.hdot');
  const heroEp   = document.getElementById('heroEp');
  const htLine1  = document.getElementById('htLine1');
  const htLine2  = document.getElementById('htLine2');
  const heroDesc = document.getElementById('heroDesc');
  const heroTags = document.getElementById('heroTags');

  const slideData = [
    {
      ep:    'ONE PIECE · EP 1074',
      line1: 'MONKEY D.',
      line2: 'LUFFY',
      desc:  'King of the Pirates. The man who declared war on the world — and won.',
      tags:  ['Action', 'Adventure', 'Shonen']
    },
    {
      ep:    'JUJUTSU KAISEN · EP 47',
      line1: 'SATORU',
      line2: 'GOJO',
      desc:  'The strongest. Six Eyes. Infinity. A single finger pointed at the heavens.',
      tags:  ['Supernatural', 'Dark', 'Shonen']
    },
    {
      ep:    'DEMON SLAYER · S3',
      line1: 'TANJIRO',
      line2: 'KAMADO',
      desc:  'Total Concentration. Sun Breathing. The demon who still carries humanity.',
      tags:  ['Historical', 'Action', 'Shonen']
    }
  ];

  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = idx;
    slides[current].classList.add('active');
    dots[current].classList.add('active');

    // Animate out
    [heroEp, htLine1, htLine2, heroDesc, heroTags].forEach(el => {
      el.style.transition = 'none';
      el.style.opacity = '0';
      el.style.transform = 'translateY(12px)';
    });

    setTimeout(() => {
      const d = slideData[current];
      heroEp.textContent   = d.ep;
      htLine1.textContent  = d.line1;
      htLine2.textContent  = d.line2;
      heroDesc.textContent = d.desc;
      heroTags.innerHTML   = d.tags.map(t => `<span>${t}</span>`).join('');

      [heroEp, htLine1, htLine2, heroDesc, heroTags].forEach((el, i) => {
        el.style.transition = `opacity .6s ${i * 0.1}s ease, transform .6s ${i * 0.1}s ease`;
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      });
    }, 200);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(parseInt(dot.dataset.slide));
      startTimer();
    });
  });

  function startTimer() {
    timer = setInterval(() => goTo((current + 1) % slides.length), 5500);
  }
  startTimer();

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { clearInterval(timer); goTo((current+1) % slides.length); startTimer(); }
    if (e.key === 'ArrowLeft')  { clearInterval(timer); goTo((current-1+slides.length) % slides.length); startTimer(); }
  });


  // ── SERIES FILTER ─────────────────────────────
  document.querySelectorAll('.sfbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sfbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;

      document.querySelectorAll('.anime-card').forEach((card, i) => {
        const cats = card.dataset.cat || '';
        const show = f === 'all' || cats.includes(f);
        if (show) {
          card.classList.remove('hidden');
          card.classList.remove('visible');
          void card.offsetWidth;
          setTimeout(() => card.classList.add('visible'), i * 60);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  // ── SCROLL REVEAL ─────────────────────────────
  function reveal() {
    const th = window.innerHeight * 0.9;

    document.querySelectorAll('[data-aos]').forEach(el => {
      if (el.getBoundingClientRect().top < th) el.classList.add('visible');
    });

    document.querySelectorAll('.anime-card:not(.hidden)').forEach((c, i) => {
      if (c.getBoundingClientRect().top < th)
        setTimeout(() => c.classList.add('visible'), i * 70);
    });

    document.querySelectorAll('.rrow').forEach((r, i) => {
      if (r.getBoundingClientRect().top < th)
        setTimeout(() => r.classList.add('visible'), i * 80);
    });
  }

  window.addEventListener('scroll', reveal, { passive: true });
  reveal();


  // ── MARQUEE PAUSE ─────────────────────────────
  const marqueeEl = document.querySelector('.marquee-inner');
  if (marqueeEl) {
    marqueeEl.addEventListener('mouseenter', () => marqueeEl.style.animationPlayState = 'paused');
    marqueeEl.addEventListener('mouseleave', () => marqueeEl.style.animationPlayState = 'running');
  }


  // ── PARALLAX HERO ─────────────────────────────
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    const wrap = document.querySelector('.hero-slides-wrap');
    if (wrap && s < window.innerHeight)
      wrap.style.transform = `translateY(${s * 0.25}px)`;
  }, { passive: true });


  // ── CARD TILT ─────────────────────────────────
  document.querySelectorAll('.anime-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const tx = ((e.clientY - r.top  - r.height / 2) / r.height) * 5;
      const ty = ((r.width  / 2 - (e.clientX - r.left)) / r.width) * 5;
      card.style.transform = `perspective(700px) rotateX(${tx}deg) rotateY(${ty}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });


  // ── FEATURED IMAGE SWAP ───────────────────────
  const featMain  = document.querySelector('.featured-main-img img');
  const featSmall = document.querySelector('.featured-small-img img');
  if (featMain && featSmall) {
    document.querySelector('.featured-small-img').addEventListener('click', () => {
      [featMain.src, featSmall.src] = [featSmall.src, featMain.src];
    });
  }


  // ── FORM SUBMIT ───────────────────────────────
  const joinForm = document.getElementById('joinForm');
  const formOk   = document.getElementById('formOk');
  if (joinForm) {
    joinForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = joinForm.querySelector('.btn-primary');
      btn.textContent = 'Entering...';
      btn.style.opacity = '.7';
      setTimeout(() => {
        joinForm.reset();
        btn.textContent = 'Enter the Verse';
        btn.style.opacity = '1';
        formOk.classList.add('show');
        setTimeout(() => formOk.classList.remove('show'), 5000);
      }, 1000);
    });
  }


  // ── SMOOTH ANCHOR ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });


  // ── GLITCH EFFECT on logo ─────────────────────
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    setInterval(() => {
      logo.style.textShadow = `${Math.random()*4-2}px 0 var(--red), ${Math.random()*-4+2}px 0 var(--cyan)`;
      setTimeout(() => logo.style.textShadow = '', 80);
    }, 4000);
  }

});
