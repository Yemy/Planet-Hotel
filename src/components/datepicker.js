export function renderDatePicker() {
  // Simple HTML5 date picker styled for luxury for now
  // In a real app, we'd use a library like Flatpickr wrapped in a custom component
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return `
    <div class="flex flex-col md:flex-row gap-4 bg-white/5 p-6 border border-white/10 backdrop-blur-md">
      <div class="flex-1">
        <label class="block text-xs uppercase tracking-widest text-gold mb-2">Check In</label>
        <input type="date" id="check-in" min="${today}" value="${today}" 
          class="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-gold [&::-webkit-calendar-picker-indicator]:invert">
      </div>
      <div class="flex-1">
        <label class="block text-xs uppercase tracking-widest text-gold mb-2">Check Out</label>
        <input type="date" id="check-out" min="${tomorrow}" value="${tomorrow}"
          class="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-gold [&::-webkit-calendar-picker-indicator]:invert">
      </div>
      <div class="flex-1">
        <label class="block text-xs uppercase tracking-widest text-gold mb-2">Guests</label>
        <select id="guests" class="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-gold [&>option]:bg-black">
          <option value="1">1 Guest</option>
          <option value="2" selected>2 Guests</option>
          <option value="3">3 Guests</option>
          <option value="4">4 Guests</option>
        </select>
      </div>
      <div class="flex items-end">
        <button id="search-btn" class="w-full md:w-auto px-8 py-2 bg-gold text-black uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors">
          Search
        </button>
      </div>
    </div>
  `;
}
