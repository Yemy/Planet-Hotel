import { renderDatePicker } from '../components/datepicker';
import { renderRoomCard } from '../components/roomCard';
import { store } from '../services/store';

export const BookingPage = {
  component: async () => {
    return `
      <div class="pt-32 pb-20 container mx-auto px-6 min-h-screen">
        <div class="text-center mb-12">
           <h1 class="text-4xl md:text-6xl font-display text-white mb-4">Book Your Stay</h1>
           <p class="text-gray-400">Select your dates to view available luxury accommodations.</p>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center mb-12 border-b border-white/10">
           <button id="tab-rooms" class="px-8 py-4 text-gold border-b-2 border-gold font-display text-xl transition-colors">STAYS</button>
           <button id="tab-dining" class="px-8 py-4 text-gray-500 hover:text-white font-display text-xl transition-colors">DINING</button>
        </div>

        <!-- Search Bar -->
        <div class="mb-16">
          ${renderDatePicker()}
        </div>

        <!-- Room List -->
        <div id="booking-rooms-list" class="space-y-6 opacity-0 transition-opacity duration-500">
           <!-- Rooms injected here -->
        </div>

        <!-- Dining List (Hidden by default) -->
        <div id="booking-dining-list" class="hidden space-y-6 opacity-0 transition-opacity duration-500">
           <div class="text-center p-8 bg-white/5 border border-white/10">
              <h3 class="text-2xl font-display text-white mb-4">Request a Table</h3>
              <p class="text-gray-400 mb-6">Experience culinary excellence at our world-class outlets.</p>
              <form id="dining-reservation-form" class="max-w-md mx-auto space-y-4 text-left">
                   <div>
                      <label class="block text-xs uppercase tracking-widest text-gold mb-2">Select Outlet</label>
                      <select name="outlet" id="outlet-select" class="w-full bg-black border border-white/10 p-3 text-white focus:border-gold outline-none">
                         <!-- Outlets injected here -->
                      </select>
                   </div>
                   <div class="grid grid-cols-2 gap-4">
                      <div>
                         <label class="block text-xs uppercase tracking-widest text-gold mb-2">Time</label>
                         <input type="datetime-local" name="time" required class="w-full bg-black border border-white/10 p-3 text-white focus:border-gold outline-none">
                      </div>
                      <div>
                         <label class="block text-xs uppercase tracking-widest text-gold mb-2">Guests</label>
                         <input type="number" name="guests" min="1" max="20" value="2" required class="w-full bg-black border border-white/10 p-3 text-white focus:border-gold outline-none">
                      </div>
                   </div>
                   <div>
                      <label class="block text-xs uppercase tracking-widest text-gold mb-2">Your Name</label>
                      <input type="text" name="name" required class="w-full bg-black border border-white/10 p-3 text-white focus:border-gold outline-none" placeholder="Full Name">
                   </div>
                   <div>
                      <label class="block text-xs uppercase tracking-widest text-gold mb-2">Email</label>
                      <input type="email" name="email" required class="w-full bg-black border border-white/10 p-3 text-white focus:border-gold outline-none" placeholder="email@example.com">
                   </div>
                   <button type="submit" class="w-full py-4 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors mt-4">Reserve Table Now</button>
              </form>
           </div>
        </div>

        <!-- Checkout Modal (Hidden by default) -->
        <div id="checkout-modal" class="fixed inset-0 z-50 bg-black/90 hidden items-center justify-center p-4">
           <div class="bg-luxury-black border border-gold/20 p-8 max-w-md w-full relative">
              <button id="close-modal" class="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
              
              <h3 class="text-2xl font-display text-white mb-6">Confirm Reservation</h3>
              
              <div id="modal-summary" class="mb-6 space-y-2 text-sm text-gray-300 border-b border-white/10 pb-4"></div>
              
              <form id="booking-form" class="space-y-4">
                 <input type="text" name="name" placeholder="Full Name" required class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none">
                 <input type="email" name="email" placeholder="Email Address" required class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none">
                 <input type="tel" name="phone" placeholder="Phone Number" required class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none">
                 
                 <button type="submit" class="w-full py-3 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors mt-4">
                   Confirm Booking
                 </button>
              </form>
           </div>
        </div>
      </div>
    `;
  },
  init: async () => {
    const listContainer = document.getElementById('booking-rooms-list');
    const diningContainer = document.getElementById('booking-dining-list');
    const searchBtn = document.getElementById('search-btn');
    const modal = document.getElementById('checkout-modal');
    const form = document.getElementById('booking-form');
    let selectedRoom = null;

    // Tab Logic
    document.getElementById('tab-rooms').addEventListener('click', (e) => {
       e.target.classList.add('text-gold', 'border-b-2', 'border-gold');
       e.target.classList.remove('text-gray-500');
       document.getElementById('tab-dining').classList.remove('text-gold', 'border-b-2', 'border-gold');
       document.getElementById('tab-dining').classList.add('text-gray-500');
       
       listContainer.classList.remove('hidden');
       diningContainer.classList.add('hidden');
       setTimeout(() => listContainer.style.opacity = '1', 50);
    });

    document.getElementById('tab-dining').addEventListener('click', (e) => {
       e.target.classList.add('text-gold', 'border-b-2', 'border-gold');
       e.target.classList.remove('text-gray-500');
       document.getElementById('tab-rooms').classList.remove('text-gold', 'border-b-2', 'border-gold');
       document.getElementById('tab-rooms').classList.add('text-gray-500');
       
       listContainer.classList.add('hidden');
       diningContainer.classList.remove('hidden');
       setTimeout(() => diningContainer.style.opacity = '1', 50);

       // Load Outlets
       const outletSelect = document.getElementById('outlet-select');
       const state = store.getState();
       outletSelect.innerHTML = state.diningItems.map(d => `<option value="${d.name}">${d.name}</option>`).join('');
    });

    // Dining Reservation Submit
    document.getElementById('dining-reservation-form').addEventListener('submit', (e) => {
       e.preventDefault();
       const formData = new FormData(e.target);
       
       store.addBooking({
          type: 'dining',
          outlet: formData.get('outlet'),
          time: formData.get('time'),
          guests: formData.get('guests'),
          guestName: formData.get('name'),
          email: formData.get('email'),
          totalPrice: 0 // Free reservation
       });

       alert('Table Reserved! We look forward to seeing you.');
       e.target.reset();
    });

    // Load Rooms (Simulated Search)
    const loadRooms = () => {
      const state = store.getState();
      const roomsHtml = state.rooms.map(room => renderRoomCard(room)).join('');
      
      listContainer.innerHTML = roomsHtml;
      listContainer.style.opacity = '1';

      // Attach Event Listeners to "Select Room" buttons
      document.querySelectorAll('.book-room-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const roomId = e.target.dataset.id;
          selectedRoom = state.rooms.find(r => r.id === roomId);
          openModal();
        });
      });
    };

    // Initial Load
    loadRooms();

    // Search Action
    searchBtn.addEventListener('click', () => {
       // In a real app, query backend with dates
       // Here we just re-animate the list
       listContainer.style.opacity = '0';
       setTimeout(() => {
         loadRooms();
       }, 300);
    });

    // Modal Logic
    const openModal = () => {
       if(!selectedRoom) return;
       
       const checkIn = document.getElementById('check-in').value;
       const checkOut = document.getElementById('check-out').value;
       // Simple Day diff
       const days = Math.floor((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 1;
       const total = selectedRoom.priceValue * days;

       document.getElementById('modal-summary').innerHTML = `
         <div class="flex justify-between"><span>Room:</span> <span class="text-gold">${selectedRoom.name}</span></div>
         <div class="flex justify-between"><span>Dates:</span> <span>${checkIn} to ${checkOut}</span></div>
         <div class="flex justify-between"><span>Nights:</span> <span>${days}</span></div>
         <div class="flex justify-between text-lg font-bold text-white mt-2"><span>Total:</span> <span>$${total}</span></div>
       `;
       
       modal.classList.remove('hidden');
       modal.classList.add('flex');
    };

    document.getElementById('close-modal').addEventListener('click', () => {
       modal.classList.add('hidden');
       modal.classList.remove('flex');
    });

    // Form Submit
    form.addEventListener('submit', (e) => {
       e.preventDefault();
       const formData = new FormData(form);
       
       store.addBooking({
         roomId: selectedRoom.id,
         roomName: selectedRoom.name,
         guestName: formData.get('name'),
         email: formData.get('email'),
         checkIn: document.getElementById('check-in').value,
         checkOut: document.getElementById('check-out').value,
         totalPrice:  parseInt(document.getElementById('modal-summary').lastElementChild.lastElementChild.innerText.replace('$','')),
       });

       alert('Booking Confirmed! Thank you for choosing Planet Hotel.');
       modal.classList.add('hidden');
       modal.classList.remove('flex');
       form.reset();
    });
  }
};
