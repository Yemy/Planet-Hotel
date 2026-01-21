import { hotelContent } from '../data/content';
import gsap from 'gsap';

export function initNavigation() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const links = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Rooms', href: '#rooms' },
    { name: 'Amenities', href: '#amenities' },
    { name: 'Dining', href: '#dining' },
    { name: 'Contact', href: '#contact' }
  ];

  // Render Nav
  nav.innerHTML = `
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="text-2xl font-display font-bold text-gold tracking-wider cursor-pointer">
        PLANET HOTEL
      </div>
      
      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-8">
        ${links.map(link => `
          <a href="${link.href}" class="text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300 relative group">
            ${link.name}
            <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
          </a>
        `).join('')}
      </div>

      <!-- Mobile Menu Button -->
      <button class="md:hidden text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <!-- CTA Button -->
      <a href="#contact" class="hidden md:block px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 text-sm uppercase tracking-wider">
        Book Now
      </a>
    </div>
  `;

  // Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('glass-dark', 'py-2');
      nav.classList.remove('py-4');
    } else {
      nav.classList.remove('glass-dark', 'py-2');
      nav.classList.add('py-4');
    }
  });
}
