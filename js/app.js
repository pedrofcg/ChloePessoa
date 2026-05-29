/* ============================================
   CHLOE PESSOA — All JavaScript (IIFE)
   ============================================ */
(function() {
  'use strict';

  /* ── Custom Cursor ── */
  class CustomCursor {
    constructor() {
      this.cursor = document.querySelector('.cursor');
      this.dot = document.querySelector('.cursor__dot');

      if (!this.cursor || !this.dot) return;

      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        this.cursor.style.display = 'none';
        this.dot.style.display = 'none';
        return;
      }

      this.pos = { x: 0, y: 0 };
      this.dotPos = { x: 0, y: 0 };
      this.cursorVisible = false;

      this.init();
    }

    init() {
      document.body.style.cursor = 'none';
      document.querySelectorAll('a, button, [data-cursor]').forEach(function(el) {
        el.style.cursor = 'none';
      });

      var self = this;

      document.addEventListener('mousemove', function(e) {
        self.pos.x = e.clientX;
        self.pos.y = e.clientY;
        if (!self.cursorVisible) {
          self.cursorVisible = true;
          self.cursor.style.opacity = '1';
          self.dot.style.opacity = '1';
        }
      });

      document.querySelectorAll('a, button, .card, .collection-card, .lookbook__item, .instagram__item').forEach(function(el) {
        el.addEventListener('mouseenter', function() { self.cursor.classList.add('cursor--hover'); });
        el.addEventListener('mouseleave', function() { self.cursor.classList.remove('cursor--hover'); });
      });

      document.querySelectorAll('.hero__title, h2, h3').forEach(function(el) {
        el.addEventListener('mouseenter', function() { self.cursor.classList.add('cursor--text'); });
        el.addEventListener('mouseleave', function() { self.cursor.classList.remove('cursor--text'); });
      });

      document.addEventListener('mouseleave', function() {
        self.cursor.style.opacity = '0';
        self.dot.style.opacity = '0';
        self.cursorVisible = false;
      });

      document.addEventListener('mouseenter', function() {
        self.cursor.style.opacity = '1';
        self.dot.style.opacity = '1';
        self.cursorVisible = true;
      });

      this.render();
    }

    render() {
      var self = this;
      this.dotPos.x += (this.pos.x - this.dotPos.x) * 0.15;
      this.dotPos.y += (this.pos.y - this.dotPos.y) * 0.15;

      this.cursor.style.left = this.dotPos.x + 'px';
      this.cursor.style.top = this.dotPos.y + 'px';
      this.dot.style.left = this.pos.x + 'px';
      this.dot.style.top = this.pos.y + 'px';

      requestAnimationFrame(function() { self.render(); });
    }
  }

  /* ── Navigation ── */
  class Navigation {
    constructor() {
      this.navbar = document.querySelector('.navbar');
      this.hamburger = document.querySelector('.navbar__hamburger');
      this.nav = document.querySelector('.navbar__nav');
      this.links = document.querySelectorAll('.navbar__link');
      this.isOpen = false;

      this.init();
    }

    init() {
      var self = this;

      window.addEventListener('scroll', function() { self.onScroll(); }, { passive: true });

      if (this.hamburger) {
        this.hamburger.addEventListener('click', function() { self.toggleMenu(); });
      }

      this.links.forEach(function(link) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          var targetId = link.getAttribute('href');
          var target = document.querySelector(targetId);

          if (target) {
            self.closeMenu();
            var offset = self.navbar.offsetHeight;
            var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
          }
        });
      });

      window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && self.isOpen) {
          self.closeMenu();
        }
      });

      this.onScroll();
    }

    onScroll() {
      if (window.scrollY > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    }

    toggleMenu() {
      this.isOpen = !this.isOpen;
      this.hamburger.classList.toggle('active', this.isOpen);
      this.nav.classList.toggle('open', this.isOpen);
      document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    closeMenu() {
      this.isOpen = false;
      if (this.hamburger) this.hamburger.classList.remove('active');
      if (this.nav) this.nav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  /* ── Animations ── */
  class Animations {
    constructor() {
      this.reveals = document.querySelectorAll('.reveal');
      this.imageReveals = document.querySelectorAll('.image-reveal');
      this.staggerGrids = document.querySelectorAll('.stagger-grid');
      this.lineDraws = document.querySelectorAll('.line-draw');
      this.splitTexts = document.querySelectorAll('.split-text');
      this.parallaxElements = document.querySelectorAll('[data-parallax]');
      this.magneticElements = document.querySelectorAll('.magnetic');
      this.counters = document.querySelectorAll('[data-counter]');

      this.init();
    }

    init() {
      this.prepareSplitText();
      this.setupRevealObserver();
      this.setupImageRevealObserver();
      this.setupStaggerObserver();
      this.setupLineDrawObserver();
      this.setupSplitTextObserver();
      this.setupCounterObserver();

      if (this.parallaxElements.length > 0) {
        var self = this;
        window.addEventListener('scroll', function() { self.handleParallax(); }, { passive: true });
      }

      this.setupMagnetic();
    }

    createObserver(callback, options) {
      var defaultOptions = Object.assign({
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
      }, options || {});

      return new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            callback(entry.target);
          }
        });
      }, defaultOptions);
    }

    setupRevealObserver() {
      var observer = this.createObserver(function(target) {
        target.classList.add('revealed');
      });
      this.reveals.forEach(function(el) { observer.observe(el); });
    }

    setupImageRevealObserver() {
      var observer = this.createObserver(function(target) {
        target.classList.add('revealed');
      }, { threshold: 0.3 });
      this.imageReveals.forEach(function(el) { observer.observe(el); });
    }

    setupStaggerObserver() {
      var observer = this.createObserver(function(target) {
        target.classList.add('revealed');
      }, { threshold: 0.05 });
      this.staggerGrids.forEach(function(el) { observer.observe(el); });
    }

    setupLineDrawObserver() {
      var observer = this.createObserver(function(target) {
        target.classList.add('revealed');
      });
      this.lineDraws.forEach(function(el) { observer.observe(el); });
    }

    prepareSplitText() {
      this.splitTexts.forEach(function(el) {
        var text = el.textContent;
        el.innerHTML = '';
        var chars = text.split('');
        chars.forEach(function(char, i) {
          var span = document.createElement('span');
          span.classList.add('char');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.transitionDelay = (i * 0.03) + 's';
          el.appendChild(span);
        });
      });
    }

    setupSplitTextObserver() {
      var observer = this.createObserver(function(target) {
        target.classList.add('revealed');
      }, { threshold: 0.5 });
      this.splitTexts.forEach(function(el) { observer.observe(el); });
    }

    setupCounterObserver() {
      var self = this;
      var observer = this.createObserver(function(target) {
        self.animateCounter(target);
      }, { threshold: 0.5 });
      this.counters.forEach(function(el) { observer.observe(el); });
    }

    animateCounter(element) {
      var target = parseInt(element.dataset.counter);
      var suffix = element.dataset.suffix || '';
      var duration = 2000;
      var start = performance.now();

      function update(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - (1 - progress) * (1 - progress);
        var current = Math.round(eased * target);
        element.textContent = current + suffix;
        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    }

    handleParallax() {
      this.parallaxElements.forEach(function(el) {
        var speed = parseFloat(el.dataset.parallax) || 0.1;
        var rect = el.getBoundingClientRect();
        var elementCenter = rect.top + rect.height / 2;
        var windowCenter = window.innerHeight / 2;
        var distance = elementCenter - windowCenter;
        el.style.transform = 'translateY(' + (distance * speed) + 'px)';
      });
    }

    setupMagnetic() {
      this.magneticElements.forEach(function(el) {
        el.addEventListener('mousemove', function(e) {
          var rect = el.getBoundingClientRect();
          var x = e.clientX - rect.left - rect.width / 2;
          var y = e.clientY - rect.top - rect.height / 2;
          el.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
        });

        el.addEventListener('mouseleave', function() {
          el.style.transform = 'translate(0, 0)';
        });
      });
    }
  }

  /* ── App Init ── */
  function initApp() {
    var loader = document.querySelector('.page-loader');

    requestAnimationFrame(function() {
      if (loader) loader.classList.add('loading');
    });

    new CustomCursor();
    new Navigation();
    new Animations();

    var hero = document.querySelector('.hero');
    if (hero) hero.classList.add('loaded');

    setTimeout(function() {
      if (loader) loader.classList.add('loaded');
      setTimeout(function() {
        if (loader) loader.remove();
      }, 600);
    }, 1800);

    var yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Newsletter form
    var form = document.querySelector('.newsletter__form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = form.querySelector('.newsletter__input');
        var submit = form.querySelector('.newsletter__submit');
        if (input.value.trim()) {
          submit.textContent = '✓ Inscrita!';
          submit.style.background = '#2d8a4e';
          input.value = '';
          setTimeout(function() {
            submit.textContent = 'Inscrever';
            submit.style.background = '';
          }, 3000);
        }
      });
    }
  }

  // Boot on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
