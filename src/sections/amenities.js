import { hotelContent } from '../data/content';

export function renderAmenities() {
  const items = hotelContent.amenities.map((item, index) => `
    <div class="group relative overflow-hidden border border-white/10 bg-white/5 hover:border-gold/50 transition-colors duration-500 h-80 md:h-96 flex flex-col justify-end p-8">
      <div class="absolute inset-0 z-0">
         <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-30 group-hover:opacity-50 grayscale group-hover:grayscale-0">
         <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
      
      <div class="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <h3 class="text-xl md:text-2xl font-display mb-3 text-white group-hover:text-gold">${item.title}</h3>
        <p class="text-gray-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          ${item.description}
        </p>
      </div>
    </div>
  `).join('');

  return `
    <section id="amenities" class="py-20 md:py-32 bg-luxury-black relative">
       <div class="container mx-auto px-6">
         <div class="text-center mb-20">
            <h2 class="text-gold text-xs uppercase tracking-[0.2em] mb-4">Experience More</h2>
            <h3 class="text-3xl md:text-5xl font-display text-white">Amenities & Wellness</h3>
         </div>
         
         <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
           ${items}
         </div>
       </div>
    </section>
  `;
}
