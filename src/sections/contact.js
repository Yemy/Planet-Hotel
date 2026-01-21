import { hotelContent } from '../data/content';

export function renderContact() {
  return `
    <section id="contact" class="py-20 md:py-32 bg-luxury-black relative">
       <div class="container mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <!-- Contact Info -->
          <div>
             <h2 class="text-gold text-xs uppercase tracking-[0.2em] mb-4">Get in Touch</h2>
             <h3 class="text-4xl md:text-6xl font-display text-white mb-12">Contact Us</h3>
             
             <div class="space-y-8">
                <div>
                   <h4 class="text-white font-display text-xl mb-2">Location</h4>
                   <p class="text-gray-400 font-light">${hotelContent.general.contact.address}</p>
                </div>
                <div>
                   <h4 class="text-white font-display text-xl mb-2">Reservation</h4>
                   <p class="text-gray-400 font-light">${hotelContent.general.contact.phone[0]}</p>
                   <p class="text-gray-400 font-light">${hotelContent.general.contact.email}</p>
                </div>
                <div>
                   <h4 class="text-white font-display text-xl mb-2">Addis Ababa Office</h4>
                   <p class="text-gray-400 font-light">Kirkos sub city woreda 02/3 (Bole, Wollosefer)</p>
                   <p class="text-gray-400 font-light">+251 96 117 5552</p>
                </div>
             </div>

             <!-- Form -->
             <form class="mt-12 space-y-6">
                <div>
                  <input type="text" placeholder="Your Name" class="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-gold transition-colors placeholder-gray-600">
                </div>
                <div>
                  <input type="email" placeholder="Email Address" class="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-gold transition-colors placeholder-gray-600">
                </div>
                <div>
                  <textarea placeholder="Message" rows="4" class="w-full bg-transparent border-b border-white/20 py-4 text-white focus:outline-none focus:border-gold transition-colors placeholder-gray-600 resize-none"></textarea>
                </div>
                <button type="submit" class="mt-6 px-10 py-4 bg-gold text-black uppercase tracking-widest text-sm font-bold hover:bg-white transition-colors">
                  Send Message
                </button>
             </form>
          </div>

          <!-- Map / Visual -->
          <div class="relative h-[600px] w-full border border-white/10 p-4">
             <div class="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 bg-neutral-900 overflow-hidden relative">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.22855172421!2d39.4604!3d13.4967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x166badf111111111%3A0x1111111111111111!2sPlanet%20Hotel!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set" 
                 width="100%" 
                 height="100%" 
                 style="border:0;" 
                 allowfullscreen="" 
                 loading="lazy">
               </iframe>
               <div class="absolute inset-0 bg-gold/10 pointer-events-none mix-blend-overlay"></div>
             </div>
          </div>
       </div>
    </section>
  `;
}
