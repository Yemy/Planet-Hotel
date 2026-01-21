export function renderRoomCard(room) {
  return `
    <div class="group relative bg-neutral-900 border border-white/5 hover:border-gold/30 transition-all duration-300 overflow-hidden flex flex-col md:flex-row h-auto md:h-64">
      <!-- Image -->
      <div class="w-full md:w-1/3 relative overflow-hidden">
        <img src="${room.image}" alt="${room.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        <div class="absolute inset-0 bg-black/20"></div>
      </div>
      
      <!-- Content -->
      <div class="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-xl md:text-2xl font-display text-white group-hover:text-gold transition-colors">${room.name}</h3>
            <span class="text-gold font-display text-xl">${room.price} <span class="text-xs text-gray-500 font-sans">/ Night</span></span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">${room.description}</p>
          
          <!-- Features -->
          <div class="flex flex-wrap gap-2 mb-4">
             ${room.features.slice(0, 4).map(f => `
               <span class="text-[10px] uppercase tracking-wider px-2 py-1 border border-white/10 text-gray-400">${f}</span>
             `).join('')}
          </div>
        </div>

        <div class="flex justify-end">
           <button class="book-room-btn px-6 py-2 border border-white/20 text-white text-xs uppercase tracking-widest hover:bg-gold hover:text-black hover:border-gold transition-all" 
              data-id="${room.id}"
              data-price="${room.priceValue}">
              Select Room
           </button>
        </div>
      </div>
    </div>
  `;
}
