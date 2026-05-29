/* ============================================
   CHLOE PESSOA — Main Entry Point
   ============================================ */

import { CustomCursor } from './cursor.js';
import { Navigation } from './navigation.js';
import { Animations } from './animations.js';

class App {
  constructor() {
    this.init();
  }

  async init() {
    // Show loader
    const loader = document.querySelector('.page-loader');
    
    // Start loading bar animation
    requestAnimationFrame(() => {
      loader?.classList.add('loading');
    });

    // Wait for DOM + images
    await this.waitForLoad();

    // Initialize modules
    this.cursor = new CustomCursor();
    this.navigation = new Navigation();
    this.animations = new Animations();

    // Hero loaded state
    const hero = document.querySelector('.hero');
    hero?.classList.add('loaded');

    // Remove loader
    setTimeout(() => {
      loader?.classList.add('loaded');
      
      // Remove from DOM after transition
      setTimeout(() => {
        loader?.remove();
      }, 600);
    }, 1800);

    // Setup year in footer
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // Newsletter form
    this.setupNewsletter();
  }

  waitForLoad() {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });
  }

  setupNewsletter() {
    const form = document.querySelector('.newsletter__form');
    
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter__input');
      const submit = form.querySelector('.newsletter__submit');
      
      if (input.value.trim()) {
        submit.textContent = '✓ Inscrita!';
        submit.style.background = '#2d8a4e';
        input.value = '';

        setTimeout(() => {
          submit.textContent = 'Inscrever';
          submit.style.background = '';
        }, 3000);
      }
    });
  }
}

// Boot
new App();
