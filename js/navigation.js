/* ============================================
   CHLOE PESSOA — Navigation
   ============================================ */

export class Navigation {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.hamburger = document.querySelector('.navbar__hamburger');
    this.nav = document.querySelector('.navbar__nav');
    this.links = document.querySelectorAll('.navbar__link');
    this.isOpen = false;
    this.lastScrollY = 0;

    this.init();
  }

  init() {
    // Scroll handler
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });

    // Hamburger toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
    }

    // Nav links - smooth scroll
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
          this.closeMenu();
          
          const offset = this.navbar.offsetHeight;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Close menu on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });

    // Initial scroll check
    this.onScroll();
  }

  onScroll() {
    const scrollY = window.scrollY;

    // Add scrolled class
    if (scrollY > 100) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    this.lastScrollY = scrollY;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.hamburger.classList.toggle('active', this.isOpen);
    this.nav.classList.toggle('open', this.isOpen);
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.isOpen = false;
    this.hamburger?.classList.remove('active');
    this.nav?.classList.remove('open');
    document.body.style.overflow = '';
  }
}
