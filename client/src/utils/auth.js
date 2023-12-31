import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    const decodedToken = decode(this.getToken());
    return decodedToken.data; // Accessing the data key here
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken, username) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    localStorage.setItem('username', username);
    window.location.assign('/profile');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('username');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}
// eslint-disable-next-line
export default new AuthService();
