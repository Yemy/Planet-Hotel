import { hotelContent } from '../data/content';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export function renderRooms() {
  const roomsHtml = hotelContent.rooms.map(room => `
    <div class="swiper-slide bg-neutral-900 border-r border-white/10 group cursor-grab active:cursor-grabbing overflow-hidden relative h-[500px] md:h-[600px]">
      <img src="${room.image}" alt="${room.name}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40">
      
      <div class="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20 bg-gradient-to-t from-black via-black/50 to-transparent">
        <h3 class="text-2xl md:text-4xl font-display mb-2 text-white group-hover:text-gold transition-colors">${room.name}</h3>
        <p class="text-gray-300 mb-6 line-clamp-2">${room.description}</p>
        <div class="flex items-center justify-between border-t border-white/20 pt-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <ul class="flex space-x-2 text-xs text-gray-400">
             ${room.features.slice(0,2).map(f => `<li>• ${f}</li>`).join('')}
             <li>+more</li>
          </ul>
          <a href="#" class="text-sm uppercase tracking-wider text-gold hover:text-white">View Details</a>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <section id="rooms" class="py-20 bg-black text-white relative">
       <div class="container mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 class="text-gold text-xs uppercase tracking-[0.2em] mb-4">Accommodation</h2>
            <h3 class="text-3xl md:text-5xl font-display">Rooms & Suites</h3>
          </div>
          <div class="hidden md:flex space-x-4">
             <button class="swiper-button-prev-custom w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all">←</button>
             <button class="swiper-button-next-custom w-12 h-12 border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all">→</button>
          </div>
       </div>

       <!-- Swiper -->
       <div class="swiper rooms-swiper w-full">
         <div class="swiper-wrapper">
           ${roomsHtml}
         </div>
         <div class="swiper-pagination mt-8"></div>
       </div>
    </section>
  `;
}

export function initRooms() {
  new Swiper('.rooms-swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    },
    navigation: {
      nextEl: '.swiper-button-next-custom',
      prevEl: '.swiper-button-prev-custom',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    }
  });
}
