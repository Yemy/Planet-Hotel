import { hotelContent } from '../data/content';

export function renderAbout() {
  const { name, description } = hotelContent.general;
  
  return `
    <section id="about" class="relative py-20 md:py-32 bg-luxury-black overflow-hidden">
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div class="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <!-- Text Content -->
        <div>
          <h2 class="text-gold text-xs uppercase tracking-[0.2em] mb-4">Our Story</h2>
          <h3 class="text-3xl md:text-5xl font-display mb-8 leading-tight">Luxury at the Heart of <span class="italic text-gold">Mek'ele</span></h3>
          <p class="text-gray-400 leading-relaxed mb-6 font-light text-lg">
            ${description}
          </p>
          <p class="text-gray-400 leading-relaxed mb-8 font-light">
            We offer more than just a stay; we offer an experience. From our G+10 modern architecture to our 80+ highly equipped rooms, every detail is curated for the discerning traveler.
          </p>
          
          <!-- Counters -->
          <div class="grid grid-cols-3 gap-8 border-t border-white/10 pt-8 mt-8 text-center md:text-left">
            <div>
              <div class="text-3xl md:text-4xl text-gold font-display mb-2">10+</div>
              <div class="text-xs uppercase tracking-wider text-gray-500">Years</div>
            </div>
            <div>
              <div class="text-3xl md:text-4xl text-gold font-display mb-2">80+</div>
              <div class="text-xs uppercase tracking-wider text-gray-500">Rooms</div>
            </div>
            <div>
              <div class="text-3xl md:text-4xl text-gold font-display mb-2">1k+</div>
              <div class="text-xs uppercase tracking-wider text-gray-500">Guest Capacity</div>
            </div>
          </div>
        </div>

        <!-- Image Composition -->
        <div class="relative">
          <div class="relative z-10 overflow-hidden rounded-sm border border-white/10 group">
             <!-- Placeholder for the main building or lobby -->
             <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" alt="Planet Hotel Lobby" class="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0">
             <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
          <!-- Offset Border -->
          <div class="absolute -bottom-6 -right-6 w-full h-full border border-gold/30 -z-10 rounded-sm"></div>
        </div>
      </div>
    </section>
  `;
}
