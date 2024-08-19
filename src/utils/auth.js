// auth.js
const auth = {
    isAuthenticated: () => !!localStorage.getItem('authToken'),
    getToken: () => localStorage.getItem('authToken'),
    setToken: (token) => localStorage.setItem('authToken', token),
    clearToken: () => localStorage.removeItem('authToken'),
  };
  
  export default auth;
  