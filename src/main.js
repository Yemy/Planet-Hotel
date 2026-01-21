import './style.css';
import { Router } from './router';
import { initNavigation } from './components/navigation';
import { initScroll } from './components/scrollManager';
import { HomePage } from './pages/home';
import { BookingPage } from './pages/booking';
import { AdminPage } from './pages/admin/dashboard';
import { AdminLoginPage } from './pages/admin/login';
import { AdminRoomsPage } from './pages/admin/rooms';
import { AdminDiningPage } from './pages/admin/dining';
import gsap from 'gsap';

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  
  // Routes Configuration
  const routes = [
    { path: '#/', ...HomePage },
    { path: '#/booking', ...BookingPage },
    { path: '#/admin', ...AdminPage },
    { path: '#/admin/login', ...AdminLoginPage },
    { path: '#/admin/rooms', ...AdminRoomsPage },
    { path: '#/admin/dining', ...AdminDiningPage }
  ];

  // Initialize Router
  const router = new Router(routes);

  // Initialize Global Components (Nav, Scroll)
  initNavigation();
  initScroll();

  // Loader Animation
  const loader = document.getElementById('loader');
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.style.display = 'none';
        document.getElementById('app').classList.remove('opactiy-0');
      }
    });
  }, 1000);
});

