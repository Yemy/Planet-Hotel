import { hotelContent } from '../data/content';

export function renderDining() {
  const diningHtml = hotelContent.dining.map((item, index) => `
    <div class="relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 mb-20 last:mb-0">
      <div class="w-full md:w-1/2 relative overflow-hidden group border-b-2 border-gold/50 pb-4 md:border-none md:pb-0">
        <div class="relative overflow-hidden aspect-[4/3]">
           <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0">
        </div>
      </div>
      
      <div class="w-full md:w-1/2 text-center md:text-left px-6">
         <h3 class="text-3xl md:text-4xl font-display text-white mb-6">${item.name}</h3>
         <div class="w-12 h-[1px] bg-gold mb-6 mx-auto md:mx-0"></div>
         <p class="text-gray-400 text-lg font-light leading-relaxed mb-8">
           ${item.description}
         </p>
         <button class="text-gold uppercase tracking-widest text-sm hover:text-white transition-colors">
           Reserve a Table
         </button>
      </div>
    </div>
  `).join('');

  return `
    <section id="dining" class="py-20 md:py-32 bg-charcoal relative overflow-hidden">
      <!-- Background Texture -->
      <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none"></div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-24">
           <h2 class="text-gold text-xs uppercase tracking-[0.2em] mb-4">Culinary Excellence</h2>
           <h3 class="text-3xl md:text-5xl font-display text-white">Dining & Bars</h3>
        </div>

        <div class="max-w-6xl mx-auto">
          ${diningHtml}
        </div>
      </div>
    </section>
  `;
}
