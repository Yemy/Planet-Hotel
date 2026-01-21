import { hotelContent } from '../data/content';

const STORE_KEY = 'planet_hotel_db';

class Store {
  constructor() {
    this.state = this.loadState();
    this.listeners = [];
  }

  loadState() {
    const stored = localStorage.getItem(STORE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initial Seed
    return {
      rooms: hotelContent.rooms.map(r => ({
        ...r,
        priceValue: parseInt(r.price.replace(/[^0-9]/g, '')), // Parse price to number
        available: true
      })),
      diningItems: hotelContent.dining.map(d => ({
        ...d,
        id: 'dn_' + Math.random().toString(36).substr(2, 9)
      })),
      bookings: [],
      content: hotelContent,
      stats: {
        revenue: 0,
        occupancy: 0
      }
    };
  }

  saveState() {
    localStorage.setItem(STORE_KEY, JSON.stringify(this.state));
    this.notify();
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(l => l(this.state));
  }

  getState() {
    return this.state;
  }

  // --- Actions ---

  addBooking(booking) {
    const newBooking = {
      id: 'bk_' + Date.now(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...booking
    };
    this.state.bookings.push(newBooking);
    
    // Update Stats
    this.state.stats.revenue += newBooking.totalPrice;
    this.state.stats.occupancy++; // Simplified
    
    this.saveState();
    return newBooking;
  }

  updateRoom(roomId, updates) {
    const index = this.state.rooms.findIndex(r => r.id === roomId);
    if (index !== -1) {
      this.state.rooms[index] = { ...this.state.rooms[index], ...updates };
      
      // Sync back to content if needed (for title/desc)
      // For now, we assume the store is the source of truth for the app
      this.saveState();
    }
  }

  updateDining(itemId, updates) {
    const index = this.state.diningItems.findIndex(d => d.id === itemId);
    if (index !== -1) {
      this.state.diningItems[index] = { ...this.state.diningItems[index], ...updates };
      this.saveState();
    }
  }

  deleteDining(itemId) {
    this.state.diningItems = this.state.diningItems.filter(d => d.id !== itemId);
    this.saveState();
  }

  deleteBooking(bookingId) {
    this.state.bookings = this.state.bookings.filter(b => b.id !== bookingId);
    this.saveState();
  }
}

export const store = new Store();
