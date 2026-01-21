import { hotelContent } from '../data/content';

export function renderHero() {
  const { title, subtitle, cta } = hotelContent.hero;
  return `
    <section id="home" class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>
      
      <div class="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20">
        <h2 id="hero-subtitle" class="text-gold text-lg md:text-xl uppercase tracking-[0.3em] mb-4">${subtitle}</h2>
        <h1 id="hero-title" class="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 tracking-wide leading-tight">
          ${hotelContent.general.name.split(' ').map((word, i) => i === 1 ? `<span class="italic text-gold">${word}</span>` : word).join(' ')}
        </h1>
        <div id="hero-cta">
          <a href="#/booking" class="inline-block px-8 py-3 bg-transparent border border-white text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest text-sm">
            ${cta}
          </a>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <svg class="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  `;
}
