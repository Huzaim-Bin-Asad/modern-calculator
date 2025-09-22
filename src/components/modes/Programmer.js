import React, { useState } from 'react';

const Programmer = ({ sidebarCollapsed = false }) => {
  const [display, setDisplay] = useState('0');
  const [currentBase, setCurrentBase] = useState('DEC');
  const [wordSize, setWordSize] = useState(32);

  const bases = {
    BIN: 2,
    OCT: 8,
    DEC: 10,
    HEX: 16
  };

  const convertToBase = (value, fromBase, toBase) => {
    const num = parseInt(value, fromBase);
    if (isNaN(num)) return '0';
    
    switch (toBase) {
      case 'BIN':
        return num.toString(2);
      case 'OCT':
        return num.toString(8);
      case 'DEC':
        return num.toString(10);
      case 'HEX':
        return num.toString(16).toUpperCase();
      default:
        return num.toString();
    }
  };

  const handleNumber = (num) => {
    const currentValue = display === '0' ? '' : display;
    const newValue = currentValue + num;
    
    // Validate based on current base
    if (currentBase === 'BIN' && !/^[01]*$/.test(newValue)) return;
    if (currentBase === 'OCT' && !/^[0-7]*$/.test(newValue)) return;
    if (currentBase === 'DEC' && !/^[0-9]*$/.test(newValue)) return;
    if (currentBase === 'HEX' && !/^[0-9A-F]*$/i.test(newValue)) return;
    
    setDisplay(newValue || '0');
  };

  const handleBaseChange = (newBase) => {
    if (display !== '0') {
      const converted = convertToBase(display, bases[currentBase], bases[newBase]);
      setDisplay(converted);
    }
    setCurrentBase(newBase);
  };

  const handleBitwiseOperation = (operation) => {
    const value = parseInt(display, bases[currentBase]);
    let result;

    switch (operation) {
      case 'NOT':
        result = (~value) & ((1 << wordSize) - 1);
        break;
      case 'AND':
        // For AND, we need two operands - this is simplified
        result = value;
        break;
      case 'OR':
        result = value;
        break;
      case 'XOR':
        result = value;
        break;
      case 'LSH':
        result = (value << 1) & ((1 << wordSize) - 1);
        break;
      case 'RSH':
        result = value >> 1;
        break;
      default:
        result = value;
    }

    const convertedResult = convertToBase(result.toString(), 10, currentBase);
    setDisplay(convertedResult);
  };

  const handleClear = () => {
    setDisplay('0');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const getNumberButtons = () => {
    const buttons = [];
    
    if (currentBase === 'BIN') {
      buttons.push({ label: '0', value: '0' }, { label: '1', value: '1' });
    } else if (currentBase === 'OCT') {
      for (let i = 0; i <= 7; i++) {
        buttons.push({ label: i.toString(), value: i.toString() });
      }
    } else if (currentBase === 'DEC') {
      for (let i = 0; i <= 9; i++) {
        buttons.push({ label: i.toString(), value: i.toString() });
      }
    } else if (currentBase === 'HEX') {
      for (let i = 0; i <= 9; i++) {
        buttons.push({ label: i.toString(), value: i.toString() });
      }
      for (let i = 0; i <= 5; i++) {
        const letter = String.fromCharCode(65 + i);
        buttons.push({ label: letter, value: letter });
      }
    }
    
    return buttons;
  };

  const getDisplayValue = () => {
    if (display === '0') return '0';
    return display;
  };

  return (
    <div className="mode-transition">
      <div className={`calculator-layout ${sidebarCollapsed ? 'with-toggle-bar' : ''}`}>
        <div className="programmer-header">
          <div className="base-selector">
            <button
              className={`base-btn ${currentBase === 'BIN' ? 'active' : ''}`}
              onClick={() => handleBaseChange('BIN')}
            >
              BIN
            </button>
            <button
              className={`base-btn ${currentBase === 'OCT' ? 'active' : ''}`}
              onClick={() => handleBaseChange('OCT')}
            >
              OCT
            </button>
            <button
              className={`base-btn ${currentBase === 'DEC' ? 'active' : ''}`}
              onClick={() => handleBaseChange('DEC')}
            >
              DEC
            </button>
            <button
              className={`base-btn ${currentBase === 'HEX' ? 'active' : ''}`}
              onClick={() => handleBaseChange('HEX')}
            >
              HEX
            </button>
          </div>
          <div className="word-size-selector">
            <select
              className="word-size-select"
              value={wordSize}
              onChange={(e) => setWordSize(parseInt(e.target.value))}
            >
              <option value={8}>8-bit</option>
              <option value={16}>16-bit</option>
              <option value={32}>32-bit</option>
              <option value={64}>64-bit</option>
            </select>
          </div>
        </div>
        
        <div className="calculator-display">
          {getDisplayValue()}
        </div>
        
        <div className="calculator-keypad programmer">
          {getNumberButtons().map((button, index) => (
            <button
              key={index}
              className="calc-button number"
              onClick={() => handleNumber(button.value)}
            >
              {button.label}
            </button>
          ))}
          
          <button className="calc-button function" onClick={() => handleBitwiseOperation('NOT')}>
            NOT
          </button>
          <button className="calc-button function" onClick={() => handleBitwiseOperation('AND')}>
            AND
          </button>
          <button className="calc-button function" onClick={() => handleBitwiseOperation('OR')}>
            OR
          </button>
          <button className="calc-button function" onClick={() => handleBitwiseOperation('XOR')}>
            XOR
          </button>
          <button className="calc-button function" onClick={() => handleBitwiseOperation('LSH')}>
            LSH
          </button>
          <button className="calc-button function" onClick={() => handleBitwiseOperation('RSH')}>
            RSH
          </button>
          <button className="calc-button clear" onClick={handleClear}>
            C
          </button>
          <button className="calc-button function" onClick={handleBackspace}>
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
};

export default Programmer;
