import React, { useState, useEffect } from 'react';
import { calculate, formatNumber, scientificFunctions, mathConstants } from '../../utils/mathUtils';

const Scientific = ({ sidebarCollapsed = false }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [angleMode, setAngleMode] = useState('deg'); // deg or rad
  const [history, setHistory] = useState([]);

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

  const handleFunction = (func) => {
    const inputValue = parseFloat(display);
    let result;

    try {
      switch (func) {
        case 'sin':
          result = angleMode === 'deg' ? 
            scientificFunctions.sin(inputValue * Math.PI / 180) : 
            scientificFunctions.sin(inputValue);
          break;
        case 'cos':
          result = angleMode === 'deg' ? 
            scientificFunctions.cos(inputValue * Math.PI / 180) : 
            scientificFunctions.cos(inputValue);
          break;
        case 'tan':
          result = angleMode === 'deg' ? 
            scientificFunctions.tan(inputValue * Math.PI / 180) : 
            scientificFunctions.tan(inputValue);
          break;
        case 'asin':
          result = angleMode === 'deg' ? 
            scientificFunctions.asin(inputValue) * 180 / Math.PI : 
            scientificFunctions.asin(inputValue);
          break;
        case 'acos':
          result = angleMode === 'deg' ? 
            scientificFunctions.acos(inputValue) * 180 / Math.PI : 
            scientificFunctions.acos(inputValue);
          break;
        case 'atan':
          result = angleMode === 'deg' ? 
            scientificFunctions.atan(inputValue) * 180 / Math.PI : 
            scientificFunctions.atan(inputValue);
          break;
        case 'log':
          result = scientificFunctions.log(inputValue);
          break;
        case 'ln':
          result = scientificFunctions.ln(inputValue);
          break;
        case 'sqrt':
          result = scientificFunctions.sqrt(inputValue);
          break;
        case 'cbrt':
          result = scientificFunctions.cbrt(inputValue);
          break;
        case 'x2':
          result = scientificFunctions.pow(inputValue, 2);
          break;
        case 'x3':
          result = scientificFunctions.pow(inputValue, 3);
          break;
        case 'exp':
          result = scientificFunctions.exp(inputValue);
          break;
        case 'abs':
          result = scientificFunctions.abs(inputValue);
          break;
        case 'floor':
          result = scientificFunctions.floor(inputValue);
          break;
        case 'ceil':
          result = scientificFunctions.ceil(inputValue);
          break;
        case 'round':
          result = scientificFunctions.round(inputValue);
          break;
        default:
          result = inputValue;
      }

      if (isNaN(result) || !isFinite(result)) {
        setDisplay('Error');
      } else {
        const formattedResult = formatNumber(result);
        setDisplay(String(formattedResult));
        
        // Add to history
        const historyEntry = `${func}(${inputValue}) = ${formattedResult}`;
        setHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
      }
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleConstant = (constant) => {
    const value = mathConstants[constant];
    setDisplay(String(value));
    setWaitingForOperand(true);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(`${previousValue} ${operation} ${inputValue}`);
      
      if (newValue === 'Error') {
        setDisplay('Error');
      } else {
        const formattedValue = formatNumber(newValue);
        setDisplay(String(formattedValue));
        
        // Add to history
        const historyEntry = `${previousValue} ${operation} ${inputValue} = ${formattedValue}`;
        setHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
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

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleHistoryClick = (entry) => {
    const result = entry.split(' = ')[1];
    setDisplay(result);
    setWaitingForOperand(true);
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
    { label: 'π', className: 'function', onClick: () => handleConstant('PI') },
    { label: 'e', className: 'function', onClick: () => handleConstant('E') },
    { label: '÷', className: 'operator', onClick: () => handleOperation('/') },
    
    { label: 'sin', className: 'function', onClick: () => handleFunction('sin') },
    { label: 'cos', className: 'function', onClick: () => handleFunction('cos') },
    { label: 'tan', className: 'function', onClick: () => handleFunction('tan') },
    { label: 'log', className: 'function', onClick: () => handleFunction('log') },
    { label: '×', className: 'operator', onClick: () => handleOperation('*') },
    
    { label: 'asin', className: 'function', onClick: () => handleFunction('asin') },
    { label: 'acos', className: 'function', onClick: () => handleFunction('acos') },
    { label: 'atan', className: 'function', onClick: () => handleFunction('atan') },
    { label: 'ln', className: 'function', onClick: () => handleFunction('ln') },
    { label: '-', className: 'operator', onClick: () => handleOperation('-') },
    
    { label: '7', className: 'number', onClick: () => handleNumber(7) },
    { label: '8', className: 'number', onClick: () => handleNumber(8) },
    { label: '9', className: 'number', onClick: () => handleNumber(9) },
    { label: '√', className: 'function', onClick: () => handleFunction('sqrt') },
    { label: '+', className: 'operator', onClick: () => handleOperation('+') },
    
    { label: '4', className: 'number', onClick: () => handleNumber(4) },
    { label: '5', className: 'number', onClick: () => handleNumber(5) },
    { label: '6', className: 'number', onClick: () => handleNumber(6) },
    { label: 'x²', className: 'function', onClick: () => handleFunction('x2') },
    { label: 'x³', className: 'function', onClick: () => handleFunction('x3') },
    
    { label: '1', className: 'number', onClick: () => handleNumber(1) },
    { label: '2', className: 'number', onClick: () => handleNumber(2) },
    { label: '3', className: 'number', onClick: () => handleNumber(3) },
    { label: '^', className: 'function', onClick: () => handleOperation('^') },
    { label: 'exp', className: 'function', onClick: () => handleFunction('exp') },
    
    { label: '0', className: 'number', onClick: () => handleNumber(0), span: 2 },
    { label: '.', className: 'function', onClick: handleDecimal },
    { label: '=', className: 'equals', onClick: handleEquals },
    { label: 'abs', className: 'function', onClick: () => handleFunction('abs') },
  ];

  return (
    <div className="mode-transition">
      <div className={`calculator-layout ${sidebarCollapsed ? 'with-toggle-bar' : ''}`}>
        <div className="scientific-header">
          <div className="angle-mode-toggle">
            <button
              className={`angle-btn ${angleMode === 'deg' ? 'active' : ''}`}
              onClick={() => setAngleMode('deg')}
            >
              DEG
            </button>
            <button
              className={`angle-btn ${angleMode === 'rad' ? 'active' : ''}`}
              onClick={() => setAngleMode('rad')}
            >
              RAD
            </button>
          </div>
        </div>
        
        <div className="calculator-display">
          {display}
        </div>
        
        <div className="calculator-keypad scientific">
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

export default Scientific;
