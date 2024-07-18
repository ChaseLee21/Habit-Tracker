import React, { createContext, useContext, useState } from 'react';

const NewHabitContext = createContext();

export const NewHabitProvider = ({ children }) => {

    const [habit, setHabit] = useState(undefined);
    const [descriptions, setDescriptions] = useState(undefined);
    const [showHabitSelection, setShowHabitSelection] = useState(true)
    const [showNameSelection, setShowNameSelection] = useState(false)
    const [showDescriptionSelection, setShowDescriptionSelection] = useState(false)
    const [showWhySelection, setShowWhySelection] = useState(false)
    const [ShowGoalSelection, setShowGoalSelection] = useState(false)
    const [showFrequencySelection, setShowFrequencySelection] = useState(false)
    const [showEmojiSelection, setShowEmojiSelection] = useState(false)
    const [showHabitSummary, setShowHabitSummary] = useState(false)
    
    const updateShowHabitSelection = (bool) => {
        setShowHabitSelection(bool);
    }
    const updateShowNameSelection = (bool) => {
        setShowNameSelection(bool);
    }
    const updateShowDescriptionSelection = (bool) => {
        setShowDescriptionSelection(bool);
    }
    const updateShowWhySelection = (bool) => {
        setShowWhySelection(bool);
    }
    const updateShowGoalSelection = (bool) => {
        setShowGoalSelection(bool);
    }
    const updateShowFrequencySelection = (bool) => {
        setShowFrequencySelection(bool);
    }
    const updateShowEmojiSelection = (bool) => {
        setShowEmojiSelection(bool);
    }
    const updateShowHabitSummary = (bool) => {
        setShowHabitSummary(bool);
    }

    const updateHabit = (newHabit) => {
        if (habit === undefined) {
            setHabit(newHabit);
            return;
        }
        setHabit(...habit, newHabit);
    };

    const updateDescriptions = (newDescriptions) => {
        setDescriptions(newDescriptions);
    }
    
    return (
        <NewHabitContext.Provider value={{ 
            habit, descriptions, showHabitSelection, showNameSelection, showDescriptionSelection, showWhySelection, ShowGoalSelection, showFrequencySelection, showEmojiSelection, showHabitSummary,
            updateHabit, updateDescriptions, updateShowHabitSelection, updateShowNameSelection, updateShowDescriptionSelection, updateShowWhySelection, updateShowGoalSelection, updateShowFrequencySelection, updateShowEmojiSelection, updateShowHabitSummary }}>
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