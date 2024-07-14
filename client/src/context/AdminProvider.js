import {createContext, useState, useEffect} from "react"
import Auth from '../utils/auth'; // Helper functions to handle token storage

const AdminLoginContext = createContext({

})

export default function AdminProvider({children}) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const checkLoggedIn = async () => {
          const token = Auth.getToken();
          if (token) {
            if (!Auth.isTokenExpired(token)) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false)
                Auth.logout()
            }
            
          }
        };
        checkLoggedIn();
      }, []);

      const login = (token) => {
        Auth.login(token); // Store token in local storage
        setIsLoggedIn(true);
      };
    
      const logout = () => {
        Auth.logout(); // Remove token from local storage
        setIsLoggedIn(false);
        window.alert("You've been logged out!")
      };

    return <AdminLoginContext.Provider value={{isLoggedIn, setIsLoggedIn, login, logout}}>
        {children}
    </AdminLoginContext.Provider>

}

export { AdminLoginContext }