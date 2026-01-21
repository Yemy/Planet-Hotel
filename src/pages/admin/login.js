import { authService } from '../../services/auth';
import { Router } from '../../router'; // To access router if needed, or just use window.location

export const AdminLoginPage = {
  component: async () => {
    return `
      <div class="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        <!-- Background Decor -->
        <div class="absolute inset-0 z-0 opacity-30">
           <div class="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
           <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div class="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-sm shadow-2xl">
          <div class="text-center mb-8">
             <h1 class="text-3xl font-display text-gold mb-2">Planet Admin</h1>
             <p class="text-gray-400 text-sm">Authorized Personnel Only</p>
          </div>

          <form id="login-form" class="space-y-6">
             <div>
               <label class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Username</label>
               <input type="text" name="username" class="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors" placeholder="admin">
             </div>
             <div>
               <label class="block text-xs uppercase tracking-widest text-gray-500 mb-2">Password</label>
               <input type="password" name="password" class="w-full bg-black/50 border border-white/10 p-3 text-white focus:border-gold outline-none transition-colors" placeholder="••••••••">
             </div>
             
             <div id="login-error" class="text-red-500 text-sm text-center hidden">Invalid credentials</div>

             <button type="submit" class="w-full py-3 bg-gold text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
               Login
             </button>
          </form>
          
          <div class="mt-6 text-center">
            <a href="#/" class="text-xs text-gray-600 hover:text-white transition-colors">← Back to Website</a>
          </div>
        </div>
      </div>
    `;
  },
  init: async () => {
    const form = document.getElementById('login-form');
    const errorMsg = document.getElementById('login-error');

    // Hack: Hide Main Nav if it's visible (since we are on a standalone page essentially)
    const nav = document.getElementById('navbar');
    if(nav) nav.style.display = 'none';

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const success = authService.login(formData.get('username'), formData.get('password'));

      if (success) {
        window.location.hash = '#/admin';
      } else {
        errorMsg.classList.remove('hidden');
      }
    });
  }
};
