import React, { createContext, useContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const updateUserState = (newState) => {
    setUserData(newState);
  };

  return (
    <UserContext.Provider value={{ userData, updateUserState }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for Easy Consumption
export const useUser = () => useContext(UserContext);