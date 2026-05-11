/* ========================================
   UNIVERSE STARS GENERATOR
   ======================================== */
(function generateStars() {
  const container = document.getElementById('universeStars');
  if (!container) return;
  for (let i = 0; i < 80; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 0.5;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.opacity = Math.random() * 0.6 + 0.1;
    star.style.animation = 'twinkle ' + (Math.random() * 4 + 2) + 's ease-in-out infinite';
    star.style.animationDelay = Math.random() * 3 + 's';
    container.appendChild(star);
  }
})();

/* ========================================
   BACKGROUND PARTICLES
   ======================================== */
(function generateParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const colors = [
    'rgba(6,182,212,0.4)',
    'rgba(168,85,247,0.3)',
    'rgba(249,115,22,0.3)',
    'rgba(16,185,129,0.3)'
  ];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    const s = Math.random() * 3 + 1;
    p.style.width = s + 'px';
    p.style.height = s + 'px';
    p.style.opacity = Math.random() * 0.4 + 0.1;
    p.style.animation = 'particle-float ' + (Math.random() * 6 + 4) + 's ease-in-out infinite';
    p.style.animationDelay = Math.random() * 4 + 's';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
})();

/* ========================================
   SCROLL REVEAL OBSERVER
   ======================================== */
(function initReveal() {
  var els = document.querySelectorAll(
    '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
  );
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ========================================
   PAUSE / PLAY ORBITS
   ======================================== */
(function initPause() {
  var btn = document.getElementById('pauseBtn');
  var icon = document.getElementById('pauseIcon');
  var text = document.getElementById('pauseText');
  var universe = document.getElementById('universe');
  if (!btn || !universe) return;

  var paused = false;
  btn.addEventListener('click', function () {
    paused = !paused;
    universe.classList.toggle('paused', paused);
    icon.setAttribute('data-icon', paused ? 'lucide:play' : 'lucide:pause');
    text.textContent = paused ? 'Resume Orbits' : 'Pause Orbits';
  });
})();

/* ========================================
   MOBILE MENU
   ======================================== */
(function initMobileMenu() {
  var menuBtn = document.getElementById('menuBtn');
  var closeBtn = document.getElementById('closeMenu');
  var menu = document.getElementById('mobileMenu');
  var links = document.querySelectorAll('.mobile-link');
  if (!menuBtn || !closeBtn || !menu) return;

  menuBtn.addEventListener('click', function () { menu.classList.add('open'); });
  closeBtn.addEventListener('click', function () { menu.classList.remove('open'); });
  links.forEach(function (link) {
    link.addEventListener('click', function () { menu.classList.remove('open'); });
  });
})();

/* ========================================
   NAV SCROLL EFFECT
   ======================================== */
(function initNavScroll() {
  var nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.style.borderBottomColor =
      window.scrollY > 50 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)';
  });
})();

/* ========================================
   SMOOTH SCROLL FOR ANCHORS
   ======================================== */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ========================================
   STAT COUNTER ANIMATION
   ======================================== */
(function initStatCounter() {
  var stats = document.querySelectorAll('.stat-number');
  if (!stats.length) return;

  var animated = false;

  function animate() {
    stats.forEach(function (stat) {
      var text = stat.textContent;
      var match = text.match(/(\d+)/);
      if (!match) return;
      var target = parseInt(match[1], 10);
      var suffix = text.replace(match[1], '');
      var current = 0;
      var increment = target / 40;
      var timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        stat.textContent = Math.floor(current) + suffix;
      }, 40);
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !animated) {
        animated = true;
        setTimeout(animate, 500);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(stats[0].closest('div'));
})();

/* ========================================
   CONTACT FORM
   ======================================== */
(function initContactForm() {
  var form = document.getElementById('contactForm');
  var msg = document.getElementById('formMessage');
  if (!form || !msg) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<span class="iconify animate-spin" data-icon="lucide:loader-2" data-width="16"></span> Sending...';
    btn.disabled = true;

    setTimeout(function () {
      btn.innerHTML = 'Send Message <span class="iconify" data-icon="lucide:send" data-width="16"></span>';
      btn.disabled = false;
      msg.className = 'text-center text-sm py-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      msg.textContent = '\u2713 Message sent successfully! I\'ll get back to you soon.';
      msg.classList.remove('hidden');
      form.reset();

      setTimeout(function () { msg.classList.add('hidden'); }, 5000);
    }, 1500);
  });
})();