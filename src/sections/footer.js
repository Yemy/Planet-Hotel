export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="bg-black py-12 border-t border-white/5">
      <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div class="mb-8 md:mb-0">
          <h2 class="text-2xl font-display text-white mb-2">PLANET HOTEL</h2>
          <p class="text-gray-500 text-xs uppercase tracking-widest">Mek'ele, Ethiopia</p>
        </div>
        
        <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12">
          <a href="#/admin" class="text-gray-500 hover:text-gold text-sm transition-colors">Admin Login</a>
          <a href="#" class="text-gray-500 hover:text-gold text-sm transition-colors">Privacy Policy</a>
          <a href="#" class="text-gray-500 hover:text-gold text-sm transition-colors">Terms of Service</a>
          <div class="flex space-x-6">
            <!-- Socials (Placeholders) -->
            <a href="#" class="text-white hover:text-gold">FB</a>
            <a href="#" class="text-white hover:text-gold">IG</a>
            <a href="#" class="text-white hover:text-gold">TW</a>
          </div>
        </div>
      </div>
      <div class="border-t border-white/5 mt-12 pt-8 text-center">
        <p class="text-gray-600 text-xs">© ${year} Planet Hotel. All rights reserved.</p>
      </div>
    </footer>
  `;
}
