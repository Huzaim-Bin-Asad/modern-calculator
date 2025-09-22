import React, { createContext, useContext, useState } from 'react';

const CalculatorContext = createContext();

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};

export const CalculatorProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);
  const [memoryHistory, setMemoryHistory] = useState([]);

  const addToHistory = (expression, result) => {
    const newEntry = {
      id: Date.now(),
      expression,
      result,
      timestamp: new Date().toLocaleTimeString()
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 50)); // Keep last 50 entries
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const removeFromHistory = (id) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  };

  const useHistoryEntry = (entry) => {
    return {
      expression: entry.expression,
      result: entry.result
    };
  };

  // Memory functions
  const memoryStore = (value) => {
    const storeValue = value || parseFloat(document.querySelector('.calculator-display')?.textContent || '0');
    setMemory(storeValue);
    setMemoryHistory(prev => [...prev, { action: 'MS', value: storeValue, timestamp: new Date().toLocaleTimeString() }]);
  };

  const memoryRecall = () => {
    return memory;
  };

  const memoryClear = () => {
    setMemory(0);
    setMemoryHistory(prev => [...prev, { action: 'MC', value: 0, timestamp: new Date().toLocaleTimeString() }]);
  };

  const memoryAdd = (value) => {
    const currentValue = value || parseFloat(document.querySelector('.calculator-display')?.textContent || '0');
    const newMemory = memory + currentValue;
    setMemory(newMemory);
    setMemoryHistory(prev => [...prev, { action: 'M+', value: currentValue, newMemory, timestamp: new Date().toLocaleTimeString() }]);
  };

  const memorySubtract = (value) => {
    const currentValue = value || parseFloat(document.querySelector('.calculator-display')?.textContent || '0');
    const newMemory = memory - currentValue;
    setMemory(newMemory);
    setMemoryHistory(prev => [...prev, { action: 'M-', value: currentValue, newMemory, timestamp: new Date().toLocaleTimeString() }]);
  };

  const clearMemoryHistory = () => {
    setMemoryHistory([]);
  };

  const value = {
    // History
    history,
    addToHistory,
    clearHistory,
    removeFromHistory,
    useHistoryEntry,
    
    // Memory
    memory,
    memoryHistory,
    memoryStore,
    memoryRecall,
    memoryClear,
    memoryAdd,
    memorySubtract,
    clearMemoryHistory
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
};
