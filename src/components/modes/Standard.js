import React, { useState, useEffect } from 'react';
import { calculate, formatNumber } from '../../utils/mathUtils';
import { useCalculator } from '../../contexts/CalculatorContext';

const Standard = ({ sidebarCollapsed = false }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  
  const { addToHistory, memory, memoryStore, memoryRecall, memoryClear, memoryAdd, memorySubtract } = useCalculator();

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(`${currentValue} ${operation} ${inputValue}`);

      if (newValue === 'Error') {
        setDisplay('Error');
        return;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const expression = `${previousValue} ${operation} ${inputValue}`;
      const newValue = calculate(expression);
      
      if (newValue === 'Error') {
        setDisplay('Error');
      } else {
        const formattedValue = formatNumber(newValue);
        setDisplay(String(formattedValue));
        
        // Add to history
        addToHistory(expression, String(formattedValue));
      }

      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleMemory = (action) => {
    const currentValue = parseFloat(display);
    
    switch (action) {
      case 'MC':
        memoryClear();
        break;
      case 'MR':
        setDisplay(String(memoryRecall()));
        break;
      case 'MS':
        memoryStore(currentValue);
        break;
      case 'M+':
        memoryAdd(currentValue);
        break;
      case 'M-':
        memorySubtract(currentValue);
        break;
      default:
        break;
    }
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        handleNumber(parseInt(key));
      } else if (key === '.') {
        handleDecimal();
      } else if (key === '+') {
        handleOperation('+');
      } else if (key === '-') {
        handleOperation('-');
      } else if (key === '*') {
        handleOperation('*');
      } else if (key === '/') {
        handleOperation('/');
      } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === 'Backspace') {
        handleBackspace();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleNumber, handleDecimal, handleOperation, handleEquals, handleClear, handleBackspace]);

  const buttons = [
    { label: 'C', className: 'clear', onClick: handleClear },
    { label: '⌫', className: 'function', onClick: handleBackspace },
    { label: 'MC', className: 'memory', onClick: () => handleMemory('MC') },
    { label: 'MR', className: 'memory', onClick: () => handleMemory('MR') },
    { label: 'MS', className: 'memory', onClick: () => handleMemory('MS') },
    { label: 'M+', className: 'memory', onClick: () => handleMemory('M+') },
    { label: 'M-', className: 'memory', onClick: () => handleMemory('M-') },
    { label: '÷', className: 'operator', onClick: () => handleOperation('/') },
    { label: '7', className: 'number', onClick: () => handleNumber(7) },
    { label: '8', className: 'number', onClick: () => handleNumber(8) },
    { label: '9', className: 'number', onClick: () => handleNumber(9) },
    { label: '×', className: 'operator', onClick: () => handleOperation('*') },
    { label: '4', className: 'number', onClick: () => handleNumber(4) },
    { label: '5', className: 'number', onClick: () => handleNumber(5) },
    { label: '6', className: 'number', onClick: () => handleNumber(6) },
    { label: '-', className: 'operator', onClick: () => handleOperation('-') },
    { label: '1', className: 'number', onClick: () => handleNumber(1) },
    { label: '2', className: 'number', onClick: () => handleNumber(2) },
    { label: '3', className: 'number', onClick: () => handleNumber(3) },
    { label: '+', className: 'operator', onClick: () => handleOperation('+') },
    { label: '0', className: 'number', onClick: () => handleNumber(0), span: 2 },
    { label: '.', className: 'function', onClick: handleDecimal },
    { label: '=', className: 'equals', onClick: handleEquals },
  ];

  return (
    <div className="mode-transition">
      <div className={`calculator-layout ${sidebarCollapsed ? 'with-toggle-bar' : ''}`}>
        <div className="calculator-display">
          {display}
          {memory !== 0 && <div className="memory-indicator">M</div>}
        </div>
        
        <div className="calculator-keypad">
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`calc-button ${button.className}`}
              onClick={button.onClick}
              style={button.span ? { gridColumn: `span ${button.span}` } : {}}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Standard;
