import React, { createContext, useContext, useState } from 'react';

const NewHabitContext = createContext();

export const NewHabitProvider = ({ children }) => {

    const [habit, setHabit] = useState({
        name: '',
        description: '',
        why: '',
        goal: '',
        frequency: '',
        emoji: ''
    });
    
    const updateHabit = (newHabit) => {
        setHabit(newHabit);
    };
    
    return (
        <NewHabitContext.Provider value={{ habit, updateHabit }}>
        {children}
        </NewHabitContext.Provider>
    );
};