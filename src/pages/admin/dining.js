import { store } from '../../services/store';

export const AdminDiningPage = {
  component: async () => {
    return `
      <div class="flex h-screen bg-gray-900 text-white overflow-hidden">
        <!-- Sidebar -->
        <aside class="w-64 bg-black border-r border-white/10 flex flex-col">
          <div class="h-16 flex items-center justify-center border-b border-white/10">
            <span class="text-xl font-display text-gold">PLANET MANAGER</span>
          </div>
          <nav class="flex-1 p-4 space-y-2">
            <a href="#/admin" class="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Dashboard</a>
            <a href="#/admin/rooms" class="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Rooms</a>
            <a href="#/admin/dining" class="block px-4 py-3 bg-white/10 text-gold rounded-sm border-l-4 border-gold">Dining</a>
            <button onclick="localStorage.removeItem('planet_hotel_auth'); window.location.hash='#/admin/login'" class="w-full text-left px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors mt-8">Logout</button>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto p-8">
           <header class="flex justify-between items-center mb-8">
              <h2 class="text-2xl font-display">Dining Management</h2>
              <button id="add-dining-btn" class="px-6 py-2 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
                + Add Outlet
              </button>
           </header>

           <!-- Reservations -->
           <div class="mb-12">
              <h3 class="text-lg font-medium mb-4">Recent Table Reservations</h3>
              <div class="bg-black border border-white/10 rounded-sm overflow-hidden">
                <table class="w-full text-left text-sm">
                   <thead>
                      <tr class="bg-white/5 text-gray-400 uppercase tracking-wider border-b border-white/10">
                         <th class="px-6 py-3">Book ID</th>
                         <th class="px-6 py-3">Guest</th>
                         <th class="px-6 py-3">Outlet</th>
                         <th class="px-6 py-3">Time</th>
                         <th class="px-6 py-3 text-right">Guests</th>
                      </tr>
                   </thead>
                   <tbody id="dining-reservations-body" class="divide-y divide-white/10">
                      <!-- Rows injected here -->
                   </tbody>
                </table>
              </div>
           </div>

           <!-- Menus / Items Management -->
           <div>
              <h3 class="text-lg font-medium mb-4">Restaurants & Lounges</h3>
              <div class="bg-black border border-white/10 rounded-sm overflow-hidden">
                <table class="w-full text-left text-sm">
                   <thead>
                      <tr class="bg-white/5 text-gray-400 uppercase tracking-wider border-b border-white/10">
                         <th class="px-6 py-3">Image</th>
                         <th class="px-6 py-3">Name</th>
                         <th class="px-6 py-3">Description</th>
                         <th class="px-6 py-3 text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody id="dining-items-body" class="divide-y divide-white/10">
                      <!-- Rows injected here -->
                   </tbody>
                </table>
              </div>
           </div>
        </main>

        <!-- Add/Edit Modal -->
        <div id="dining-modal" class="fixed inset-0 z-50 bg-black/90 hidden items-center justify-center p-4">
           <div class="bg-luxury-black border border-gold/20 p-8 max-w-lg w-full relative">
              <button id="close-modal" class="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
              <h3 class="text-2xl font-display text-white mb-6">Outlet Details</h3>
              <form id="dining-form-element" class="space-y-4">
                 <input type="hidden" name="id">
                 <input type="text" name="name" placeholder="Outlet Name" required class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none">
                 <textarea name="description" placeholder="Description" rows="3" class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none"></textarea>
                 <input type="url" name="image" placeholder="Image URL" required class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none">
                 
                 <div class="flex justify-end gap-4 mt-6">
                    <button type="button" id="cancel-btn" class="px-6 py-2 border border-white/20 text-white hover:bg-white/10">Cancel</button>
                    <button type="submit" class="px-6 py-2 bg-gold text-black font-bold hover:bg-white">Save Outlet</button>
                 </div>
              </form>
           </div>
        </div>
      </div>
    `;
  },
  init: async () => {
    // Hide Nav
    const nav = document.getElementById('navbar');
    if(nav) nav.style.display = 'none';

    const resBody = document.getElementById('dining-reservations-body');
    const itemsBody = document.getElementById('dining-items-body');
    const modal = document.getElementById('dining-modal');
    const form = document.getElementById('dining-form-element');

    const renderData = () => {
       const state = store.getState();
       
       // Reservations
       const resEntries = state.bookings.filter(b => b.type === 'dining');
       if (resEntries.length === 0) {
          resBody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-gray-500">No reservations yet.</td></tr>`;
       } else {
          resBody.innerHTML = resEntries.map(b => `
            <tr class="hover:bg-white/5 transition-colors">
               <td class="px-6 py-4 text-gray-400">#${b.id.slice(-4)}</td>
               <td class="px-6 py-4">
                  <div class="font-medium text-white">${b.guestName}</div>
                  <div class="text-xs text-gray-500">${b.email}</div>
               </td>
               <td class="px-6 py-4 text-gray-300">${b.outlet}</td>
               <td class="px-6 py-4 text-gray-400">${b.time}</td>
               <td class="px-6 py-4 text-right">${b.guests}</td>
            </tr>
          `).join('');
       }

       // Items
       itemsBody.innerHTML = state.diningItems.map(item => `
          <tr class="hover:bg-white/5 transition-colors">
             <td class="px-6 py-4"><img src="${item.image}" class="w-12 h-12 object-cover rounded-sm"></td>
             <td class="px-6 py-4 font-medium text-white">${item.name}</td>
             <td class="px-6 py-4 text-gray-400 text-xs truncate max-w-xs">${item.description}</td>
             <td class="px-6 py-4 text-right space-x-2">
                <button class="text-white hover:text-gold text-xs uppercase edit-btn" data-id="${item.id}">Edit</button>
                <button class="text-red-400 hover:text-white text-xs uppercase delete-btn" data-id="${item.id}">Delete</button>
             </td>
          </tr>
       `).join('');

       // Attach listeners
       document.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', (e) => openModal(e.target.dataset.id));
       });
       document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
             if(confirm('Delete outlet?')) {
                store.deleteDining(e.target.dataset.id);
                renderData();
             }
          });
       });
    };

    const openModal = (id = null) => {
       form.reset();
       form.elements['id'].value = '';
       if(id) {
          const item = store.getState().diningItems.find(d => d.id === id);
          if(item) {
             form.elements['id'].value = item.id;
             form.elements['name'].value = item.name;
             form.elements['description'].value = item.description;
             form.elements['image'].value = item.image;
          }
       }
       modal.classList.remove('hidden');
       modal.classList.add('flex');
    };

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    };

    renderData();

    document.getElementById('add-dining-btn').addEventListener('click', () => openModal());
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);

    form.addEventListener('submit', (e) => {
       e.preventDefault();
       const formData = new FormData(form);
       const id = formData.get('id');
       const itemData = {
          id: id || 'dn_' + Date.now(),
          name: formData.get('name'),
          description: formData.get('description'),
          image: formData.get('image')
       };

       if(id) {
          store.updateDining(id, itemData);
       } else {
          store.state.diningItems.push(itemData);
          store.saveState();
       }
       
       closeModal();
       renderData();
    });
  }
};
