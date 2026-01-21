import { authService } from './services/auth';

export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.appElement = document.getElementById('app');
    
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Handle initial load
    this.handleRoute();
  }

  async handleRoute() {
    const hash = window.location.hash || '#/';
    
    // Auth Guard
    if (hash.startsWith('#/admin') && hash !== '#/admin/login') {
      if (!authService.isAuthenticated()) {
        this.navigate('#/admin/login');
        return;
      }
    }
    
    // Find matching route
    let route = this.routes.find(r => r.path === hash);
    
    // Default to home if not found
    if (!route) {
        // Check for parameterized routes (simple check for now)
        // For /admin/* fallback
        if (hash.startsWith('#/admin')) {
             route = this.routes.find(r => r.path === '#/admin');
        } else {
             route = this.routes.find(r => r.path === '#/');
        }
    }

    if (this.currentRoute === route) return;
    this.currentRoute = route;

    // Fade out
    this.appElement.style.opacity = '0';
    
    setTimeout(async () => {
      // Clear current content
      this.appElement.innerHTML = '';
      
      // Render new content
      if (route && route.component) {
        // Dynamic import support or function call
        const content = await route.component();
        // If content is a string (HTML), inject it
        if (typeof content === 'string') {
             this.appElement.innerHTML = content;
        } 
        // If content is an element, append it
        else if (content instanceof HTMLElement) {
            this.appElement.appendChild(content);
        }
      }

      // Initialize any route specific scripts/animations
      if (route && route.init) {
        await route.init();
      }

      // Fade in
      this.appElement.style.opacity = '1';
      
      // Scroll to top
      window.scrollTo(0, 0);

      // Simple Layout Logic (Hide Nav on Admin Routes)
      const nav = document.getElementById('navbar');
      const floatingBtn = document.querySelector('a[href="#/booking"].fixed');
      
      if (route && route.path.startsWith('#/admin')) {
        if(nav) nav.style.display = 'none';
        if(floatingBtn) floatingBtn.style.display = 'none';
      } else {
        if(nav) nav.style.display = 'block';
        if(floatingBtn) floatingBtn.style.display = 'flex';
      }

      // Update Navigation State (Active Link)
      this.updateActiveNav(hash);

    }, 300); // Wait for transition
  }

  navigate(path) {
    window.location.hash = path;
  }

  updateActiveNav(hash) {
      // Simple logic to highlight active nav items can go here
  }
}
