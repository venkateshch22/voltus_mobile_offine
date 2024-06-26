import {createContext, userState, useEffect, Children, useContext} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({Children}) => {
  const [isAuthenticated, setIsAuthenticated] = userState(false);

  const login = () => {
    setIsAuthenticated(true);
  };
  const logout = () => {
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{isAuthenticated, login, logout}}>
      {Children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
