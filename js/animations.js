/* ============================================
   CHLOE PESSOA — Animations
   ============================================ */

export class Animations {
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
    // Prepare split text
    this.prepareSplitText();

    // Setup intersection observers
    this.setupRevealObserver();
    this.setupImageRevealObserver();
    this.setupStaggerObserver();
    this.setupLineDrawObserver();
    this.setupSplitTextObserver();
    this.setupCounterObserver();

    // Parallax on scroll
    if (this.parallaxElements.length > 0) {
      window.addEventListener('scroll', () => this.handleParallax(), { passive: true });
    }

    // Magnetic buttons
    this.setupMagnetic();
  }

  // ── Intersection Observer Factory ──
  createObserver(callback, options = {}) {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px',
      ...options
    };

    return new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry.target);
        }
      });
    }, defaultOptions);
  }

  // ── Reveal Animations ──
  setupRevealObserver() {
    const observer = this.createObserver((target) => {
      target.classList.add('revealed');
    });

    this.reveals.forEach(el => observer.observe(el));
  }

  // ── Image Reveal ──
  setupImageRevealObserver() {
    const observer = this.createObserver((target) => {
      target.classList.add('revealed');
    }, { threshold: 0.3 });

    this.imageReveals.forEach(el => observer.observe(el));
  }

  // ── Stagger Grid ──
  setupStaggerObserver() {
    const observer = this.createObserver((target) => {
      target.classList.add('revealed');
    }, { threshold: 0.05 });

    this.staggerGrids.forEach(el => observer.observe(el));
  }

  // ── Line Draw ──
  setupLineDrawObserver() {
    const observer = this.createObserver((target) => {
      target.classList.add('revealed');
    });

    this.lineDraws.forEach(el => observer.observe(el));
  }

  // ── Split Text ──
  prepareSplitText() {
    this.splitTexts.forEach(el => {
      const text = el.textContent;
      el.innerHTML = '';

      [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.classList.add('char');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.transitionDelay = `${i * 0.03}s`;
        el.appendChild(span);
      });
    });
  }

  setupSplitTextObserver() {
    const observer = this.createObserver((target) => {
      target.classList.add('revealed');
    }, { threshold: 0.5 });

    this.splitTexts.forEach(el => observer.observe(el));
  }

  // ── Counter Animation ──
  setupCounterObserver() {
    const observer = this.createObserver((target) => {
      this.animateCounter(target);
    }, { threshold: 0.5 });

    this.counters.forEach(el => observer.observe(el));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      const current = Math.round(eased * target);
      
      element.textContent = current + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }

  // ── Parallax ──
  handleParallax() {
    const scrollY = window.scrollY;

    this.parallaxElements.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const distance = elementCenter - windowCenter;
      
      el.style.transform = `translateY(${distance * speed}px)`;
    });
  }

  // ── Magnetic Buttons ──
  setupMagnetic() {
    this.magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }
}
