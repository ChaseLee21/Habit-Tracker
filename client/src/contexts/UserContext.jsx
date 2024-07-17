import React, { createContext, useContext, useState } from 'react';
import { findDay, findWeek } from '../util/helpers';
import { putDay } from '../util/axios';
import moment from 'moment-timezone';

// Create Context
const UserContext = createContext();

// Provider Component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const updateUserState = (newState) => {
    setUserData(newState);
  };

  const updateHabitCompletedState = async (habit) => {
    try {
      // Find the day to update
      const day = findDay(findWeek(habit), userData.timezone);
      // Toggle the completed state
      day.completed = !day.completed;
      // Save the updated day
      const updatedDay = await putDay(day);
  
      setUserData((prevUserData) => {
        // Directly update the state based on the previous state
        const updatedUser = { ...prevUserData };
        const habitIndex = updatedUser.habits.findIndex(h => h._id === habit._id);
        if (habitIndex !== -1) {
          const habitToUpdate = updatedUser.habits[habitIndex];
          const weekToUpdate = findWeek(habitToUpdate);
          const dayToUpdate = findDay(weekToUpdate, updatedUser.timezone);
          if (dayToUpdate) {
            dayToUpdate.completed = updatedDay.completed;
            // Update the streak based on the new completed state
            habitToUpdate.streak = dayToUpdate.completed ? (habitToUpdate.streak || 0) + 1 : Math.max(0, (habitToUpdate.streak || 0) - 1);
          }
        }
        return updatedUser;
      });
    } catch (error) {
      console.error("Failed to update habit completed state:", error);
    }
  }


  return (
    <UserContext.Provider value={{ userData, updateUserState, updateHabitCompletedState }}>
      {children}
    </UserContext.Provider>
  );
};


// Custom Hook for Easy Consumption
export const useUser = () => useContext(UserContext);