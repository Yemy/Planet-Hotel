import { initHero3D } from '../components/hero3d';
import { renderHero } from '../sections/hero';
import { renderDatePicker } from '../components/datepicker';
import { renderAbout } from '../sections/about';
import { renderRooms, initRooms } from '../sections/rooms';
import { renderAmenities } from '../sections/amenities';
import { renderDining } from '../sections/dining';
import { renderGallery } from '../sections/gallery';
import { renderContact } from '../sections/contact';
import { renderFooter } from '../sections/footer';

export const HomePage = {
  component: async () => {
    return `
      ${renderHero()}
      
      <!-- Quick Booking Widget -->
      <div class="relative z-20 -mt-24 px-6 container mx-auto mb-20">
         ${renderDatePicker()}
      </div>

      ${renderAbout()}
      ${renderRooms()}
      ${renderAmenities()}
      ${renderDining()}
      ${renderGallery()}
      ${renderContact()}
      ${renderFooter()}
    `;
  },
  init: async () => {
    initHero3D();
    initRooms();
    
    // Re-trigger scroll animations if needed or rely on ScrollTrigger refresh
    // We might need to refresh ScrollTrigger here if routing messed it up
    
    // Ensure 3D canvas is visible
    const canvas = document.getElementById('canvas-container');
    if(canvas) canvas.style.opacity = '1';

    // Hook up Widget to redirect to booking page
    const searchBtn = document.getElementById('search-btn');
    if(searchBtn) {
        searchBtn.addEventListener('click', () => {
            window.location.hash = '#/booking';
        });
    }
  }
};
