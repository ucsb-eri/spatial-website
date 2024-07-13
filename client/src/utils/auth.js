import { jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from sessionStorage
    return sessionStorage.getItem("id_token");
  }

  login(idToken) {
    // Saves user token to sessionStorage
    sessionStorage.setItem("id_token", idToken);

    window.location.assign("/");
  }

  logout() {
    // Clear user token and profile data from sessionStorage
    sessionStorage.removeItem("id_token");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();