import React, { createContext, useContext, useState } from 'react';

// Create Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const updateHabitState = (newState) => {
    setUserData(newState);
  };

  return (
    <UserContext.Provider value={{ userData, updateHabitState }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for Easy Consumption
export const useUser = () => useContext(UserContext);