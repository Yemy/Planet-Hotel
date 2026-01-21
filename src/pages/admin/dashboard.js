import { store } from '../../services/store';

export const AdminPage = {
  component: async () => {
    return `
      <div class="flex h-screen bg-gray-900 text-white overflow-hidden">
        <!-- Sidebar -->
        <aside class="w-64 bg-black border-r border-white/10 flex flex-col">
          <div class="h-16 flex items-center justify-center border-b border-white/10">
            <span class="text-xl font-display text-gold">PLANET MANAGER</span>
          </div>
          <nav class="flex-1 p-4 space-y-2">
            <a href="#/admin" class="block px-4 py-3 bg-white/10 text-gold rounded-sm border-l-4 border-gold hover:bg-white/20">Dashboard</a>
            <a href="#/admin/rooms" class="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Rooms</a>
            <a href="#/admin/dining" class="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Dining</a>
            <button onclick="localStorage.removeItem('planet_hotel_auth'); window.location.hash='#/admin/login'" class="w-full text-left px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors mt-8">Logout</button>
          </nav>
          <div class="p-4 border-t border-white/10">
             <a href="#/" class="block text-center py-2 text-sm text-gray-500 hover:text-white">Exit to Website</a>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto">
           <!-- Header -->
           <header class="h-16 bg-black/50 border-b border-white/10 flex items-center justify-between px-8 backdrop-blur-md sticky top-0 z-30">
              <h2 class="text-lg font-medium">Dashboard Overview</h2>
              <div class="flex items-center space-x-4">
                 <span class="text-sm text-gray-400">Admin User</span>
                 <div class="w-8 h-8 bg-gold rounded-full"></div>
              </div>
           </header>

           <div class="p-8">
              <!-- Stats Grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                 <div class="bg-black border border-white/10 p-6 rounded-sm">
                    <h3 class="text-gray-400 text-sm uppercase tracking-wider mb-2">Total Bookings</h3>
                    <div id="stat-bookings" class="text-3xl font-display text-white">-</div>
                 </div>
                 <div class="bg-black border border-white/10 p-6 rounded-sm">
                    <h3 class="text-gray-400 text-sm uppercase tracking-wider mb-2">Revenue</h3>
                    <div id="stat-revenue" class="text-3xl font-display text-gold">-</div>
                 </div>
                 <div class="bg-black border border-white/10 p-6 rounded-sm">
                    <h3 class="text-gray-400 text-sm uppercase tracking-wider mb-2">Avg. Occupancy</h3>
                    <div id="stat-occupancy" class="text-3xl font-display text-white">-</div>
                 </div>
              </div>

              <!-- Recent Bookings Table -->
              <div class="bg-black border border-white/10 rounded-sm overflow-hidden">
                 <div class="px-6 py-4 border-b border-white/10 flex justify-between items-center">
                    <h3 class="font-display text-lg">Recent Reservations</h3>
                    <button class="text-xs text-gold uppercase tracking-wider hover:text-white">Refresh</button>
                 </div>
                 <div class="overflow-x-auto">
                    <table class="w-full text-left text-sm">
                       <thead>
                          <tr class="bg-white/5 text-gray-400 uppercase tracking-wider border-b border-white/10">
                             <th class="px-6 py-3 font-medium">ID</th>
                             <th class="px-6 py-3 font-medium">Guest</th>
                             <th class="px-6 py-3 font-medium">Room</th>
                             <th class="px-6 py-3 font-medium">Dates</th>
                             <th class="px-6 py-3 font-medium">Status</th>
                             <th class="px-6 py-3 font-medium text-right">Amount</th>
                             <th class="px-6 py-3 font-medium"></th>
                          </tr>
                       </thead>
                       <tbody id="bookings-table-body" class="divide-y divide-white/10">
                          <!-- Rows injected here -->
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        </main>
      </div>
    `;
  },
  init: async () => {
    // Hide App Nav (Hack for prototype, usually handled by Layout wrapper)
    const nav = document.getElementById('navbar');
    if(nav) nav.style.display = 'none';

    const renderData = () => {
       const state = store.getState();
       
       // Stats
       document.getElementById('stat-bookings').innerText = state.bookings.length;
       document.getElementById('stat-revenue').innerText = `$${state.stats.revenue.toLocaleString()}`;
       document.getElementById('stat-occupancy').innerText = '85%'; // Mock

       // Table
       const tbody = document.getElementById('bookings-table-body');
       if (state.bookings.length === 0) {
          tbody.innerHTML = `<tr><td colspan="7" class="px-6 py-8 text-center text-gray-500">No bookings yet.</td></tr>`;
          return;
       }

       tbody.innerHTML = state.bookings.map(b => `
          <tr class="hover:bg-white/5 transition-colors">
             <td class="px-6 py-4 text-gray-400">#${b.id.slice(-4)}</td>
             <td class="px-6 py-4">
                <div class="font-medium text-white">${b.guestName}</div>
                <div class="text-xs text-gray-500">${b.email}</div>
             </td>
             <td class="px-6 py-4">
                <div class="text-gray-300 font-medium">${b.roomName || b.outlet}</div>
                <div class="text-[10px] uppercase tracking-widest ${b.type === 'dining' ? 'text-blue-400' : 'text-gold'}">${b.type || 'Stay'}</div>
             </td>
             <td class="px-6 py-4 text-gray-400">${b.checkIn || b.time} ${b.checkOut ? '→ '+b.checkOut : ''}</td>
             <td class="px-6 py-4"><span class="px-2 py-1 rounded bg-green-900/30 text-green-400 text-xs uppercase border border-green-900/50">${b.status}</span></td>
             <td class="px-6 py-4 text-right font-medium text-gold">$${b.totalPrice}</td>
             <td class="px-6 py-4 text-right">
                <button class="text-red-400 hover:text-white text-xs uppercase delete-bk-btn" data-id="${b.id}">Cancel</button>
             </td>
          </tr>
       `).join('');

       // Cancel logic
       document.querySelectorAll('.delete-bk-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
             if(confirm('Cancel reservation?')) {
                store.deleteBooking(e.target.dataset.id);
                renderData();
             }
          });
       });
    };

    renderData();

    // Cleanup when leaving route (Restore Nav)
    // Note: Router doesn't handle cleanup yet, so if user navigates back using browser back button, nav might be hidden.
    // For this prototype, 'Exit to Website' refreshes/links to home.
  }
};
