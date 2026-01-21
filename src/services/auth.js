const AUTH_KEY = 'planet_hotel_auth';

export const authService = {
  isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  login(username, password) {
    // Mock Credentials
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.hash = '#/admin/login';
  }
};
