import { hotelContent } from '../data/content';

// Placeholder images for gallery (mix of rooms, dining, amenities)
const galleryImages = [
  ...hotelContent.rooms.map(r => r.image),
  ...hotelContent.dining.map(d => d.image),
  ...hotelContent.amenities.map(a => a.image)
].slice(0, 8); // Limit to 8 for grid

export function renderGallery() {
  const imagesHtml = galleryImages.map((img, index) => `
    <div class="relative overflow-hidden group h-64 md:h-80 ${index % 3 === 0 ? 'md:col-span-2' : ''}">
      <img src="${img}" alt="Gallery Image ${index + 1}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0">
      <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
    </div>
  `).join('');

  return `
    <section id="gallery" class="py-20 bg-luxury-black">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-gold text-xs uppercase tracking-[0.2em] mb-4">Visual Journey</h2>
          <h3 class="text-3xl md:text-5xl font-display text-white">Gallery</h3>
        </div>
        
        <div class="grid md:grid-cols-3 gap-4">
          ${imagesHtml}
        </div>
      </div>
    </section>
  `;
}
