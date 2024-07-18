import React, { createContext, useContext, useState } from 'react';

const NewHabitContext = createContext();

export const NewHabitProvider = ({ children }) => {

    const [habit, setHabit] = useState({
        name: 'New Habit',
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

export const useNewHabit = () => {
    const context = useContext(NewHabitContext);
    if (context === undefined) {
        throw new Error('useNewHabit must be used within a NewHabitProvider');
    }
    return context;
};