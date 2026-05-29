/* ============================================
   CHLOE PESSOA — Custom Cursor
   ============================================ */

export class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.dot = document.querySelector('.cursor__dot');
    
    if (!this.cursor || !this.dot) return;
    
    // Check if touch device
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
    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
      el.style.cursor = 'none';
    });

    // Track mouse
    document.addEventListener('mousemove', (e) => {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;

      if (!this.cursorVisible) {
        this.cursorVisible = true;
        this.cursor.style.opacity = '1';
        this.dot.style.opacity = '1';
      }
    });

    // Hover effects
    document.querySelectorAll('a, button, .card, .collection-card, .lookbook__item, .instagram__item').forEach(el => {
      el.addEventListener('mouseenter', () => this.cursor.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => this.cursor.classList.remove('cursor--hover'));
    });

    // Text hover
    document.querySelectorAll('.hero__title, h2, h3').forEach(el => {
      el.addEventListener('mouseenter', () => this.cursor.classList.add('cursor--text'));
      el.addEventListener('mouseleave', () => this.cursor.classList.remove('cursor--text'));
    });

    // Mouse leave/enter
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.dot.style.opacity = '0';
      this.cursorVisible = false;
    });

    document.addEventListener('mouseenter', () => {
      this.cursor.style.opacity = '1';
      this.dot.style.opacity = '1';
      this.cursorVisible = true;
    });

    // Start render loop
    this.render();
  }

  render() {
    // Smooth follow for outer cursor
    this.dotPos.x += (this.pos.x - this.dotPos.x) * 0.15;
    this.dotPos.y += (this.pos.y - this.dotPos.y) * 0.15;

    this.cursor.style.left = this.dotPos.x + 'px';
    this.cursor.style.top = this.dotPos.y + 'px';

    this.dot.style.left = this.pos.x + 'px';
    this.dot.style.top = this.pos.y + 'px';

    requestAnimationFrame(() => this.render());
  }
}
