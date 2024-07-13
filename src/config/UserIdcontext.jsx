import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
const UserIdContext = createContext();


export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        
        return;
      }
      const decodedToken = jwtDecode(token);
    if (decodedToken.userId) {
      setUserId(decodedToken.userId); 
    }
  }, [userId]);


  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => useContext(UserIdContext);