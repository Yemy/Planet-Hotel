import { store } from '../../services/store';

export const AdminRoomsPage = {
  component: async () => {
    return `
      <div class="flex h-screen bg-gray-900 text-white overflow-hidden">
        <!-- Sidebar (Duplicated for prototype simplicity, normally a layout component) -->
        <aside class="w-64 bg-black border-r border-white/10 flex flex-col">
          <div class="h-16 flex items-center justify-center border-b border-white/10">
            <span class="text-xl font-display text-gold">PLANET MANAGER</span>
          </div>
          <nav class="flex-1 p-4 space-y-2">
            <a href="#/admin" class="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Dashboard</a>
            <a href="#/admin/rooms" class="block px-4 py-3 bg-white/10 text-gold rounded-sm border-l-4 border-gold">Rooms</a>
            <a href="#/admin/dining" class="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Dining</a>
            <button onclick="localStorage.removeItem('planet_hotel_auth'); window.location.hash='#/admin/login'" class="w-full text-left px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors mt-8">Logout</button>
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto p-8">
           <header class="flex justify-between items-center mb-8">
              <h2 class="text-2xl font-display">Room Management</h2>
              <button id="add-room-btn" class="px-6 py-2 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
                + Add Room
              </button>
           </header>

           <div class="bg-black border border-white/10 rounded-sm overflow-hidden">
              <table class="w-full text-left text-sm">
                 <thead>
                    <tr class="bg-white/5 text-gray-400 uppercase tracking-wider border-b border-white/10">
                       <th class="px-6 py-3">Image</th>
                       <th class="px-6 py-3">Name</th>
                       <th class="px-6 py-3">Price</th>
                       <th class="px-6 py-3">Status</th>
                       <th class="px-6 py-3 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody id="rooms-table-body" class="divide-y divide-white/10">
                    <!-- Rows injected here -->
                 </tbody>
              </table>
           </div>
        </main>
        
        <!-- Add/Edit Modal -->
        <div id="room-modal" class="fixed inset-0 z-50 bg-black/90 hidden items-center justify-center p-4">
           <div class="bg-luxury-black border border-gold/20 p-8 max-w-lg w-full relative">
              <button id="close-modal" class="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
              <h3 class="text-2xl font-display text-white mb-6">Room Details</h3>
              <form id="room-form" class="space-y-4">
                 <input type="hidden" name="id">
                 <input type="text" name="name" placeholder="Room Name" required class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none">
                 <input type="text" name="price" placeholder="Price String (e.g. $200)" required class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none">
                 <textarea name="description" placeholder="Description" rows="3" class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none"></textarea>
                 <input type="url" name="image" placeholder="Image URL" required class="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-gold outline-none">
                 
                 <div class="flex justify-end gap-4 mt-6">
                    <button type="button" id="cancel-btn" class="px-6 py-2 border border-white/20 text-white hover:bg-white/10">Cancel</button>
                    <button type="submit" class="px-6 py-2 bg-gold text-black font-bold hover:bg-white">Save Room</button>
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

    const tbody = document.getElementById('rooms-table-body');
    const modal = document.getElementById('room-modal');
    const form = document.getElementById('room-form');

    const renderRooms = () => {
      const state = store.getState();
      tbody.innerHTML = state.rooms.map(room => `
        <tr class="hover:bg-white/5 transition-colors">
           <td class="px-6 py-4"><img src="${room.image}" class="w-12 h-12 object-cover rounded-sm"></td>
           <td class="px-6 py-4 font-medium text-white">${room.name}</td>
           <td class="px-6 py-4 text-gold">${room.price}</td>
           <td class="px-6 py-4"><span class="px-2 py-1 rounded bg-green-900/30 text-green-400 text-xs uppercase border border-green-900/50">Active</span></td>
           <td class="px-6 py-4 text-right space-x-2">
              <button class="text-white hover:text-gold text-xs uppercase edit-btn" data-id="${room.id}">Edit</button>
              <button class="text-red-400 hover:text-white text-xs uppercase delete-btn" data-id="${room.id}">Delete</button>
           </td>
        </tr>
      `).join('');

      // Attach Listeners
      document.querySelectorAll('.edit-btn').forEach(btn => {
         btn.addEventListener('click', (e) => openModal(e.target.dataset.id));
      });
      document.querySelectorAll('.delete-btn').forEach(btn => {
         btn.addEventListener('click', (e) => {
            if(confirm('Delete room?')) {
               const state = store.getState();
               state.rooms = state.rooms.filter(r => r.id !== e.target.dataset.id);
               store.saveState();
               renderRooms();
            }
         });
      });
    };

    const openModal = (id = null) => {
       form.reset();
       form.elements['id'].value = '';
       
       if(id) {
          const room = store.getState().rooms.find(r => r.id === id);
          if(room) {
             form.elements['id'].value = room.id;
             form.elements['name'].value = room.name;
             form.elements['price'].value = room.price;
             form.elements['description'].value = room.description;
             form.elements['image'].value = room.image;
          }
       }
       modal.classList.remove('hidden');
       modal.classList.add('flex');
    };

    const closeModal = () => {
       modal.classList.add('hidden');
       modal.classList.remove('flex');
    };

    renderRooms();

    document.getElementById('add-room-btn').addEventListener('click', () => openModal());
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('cancel-btn').addEventListener('click', closeModal);

    form.addEventListener('submit', (e) => {
       e.preventDefault();
       const formData = new FormData(form);
       const id = formData.get('id');
       
       const roomData = {
          id: id || 'rm_' + Date.now(),
          name: formData.get('name'),
          price: formData.get('price'),
          priceValue: parseInt(formData.get('price').replace(/[^0-9]/g, '')),
          description: formData.get('description'),
          image: formData.get('image'),
          features: ["Luxury", "View"] // Default features for simplicity
       };

       if(id) {
          store.updateRoom(id, roomData);
       } else {
          const state = store.getState();
          state.rooms.push(roomData);
          store.saveState();
       }
       
       closeModal();
       renderRooms();
    });
  }
};
