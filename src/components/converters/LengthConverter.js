import React, { useState, useEffect } from 'react';
import { convertUnit, lengthConversions } from '../../utils/conversions';

const LengthConverter = ({ sidebarCollapsed = false }) => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');

  const units = [
    { value: 'millimeter', label: 'Millimeter (mm)' },
    { value: 'centimeter', label: 'Centimeter (cm)' },
    { value: 'meter', label: 'Meter (m)' },
    { value: 'kilometer', label: 'Kilometer (km)' },
    { value: 'inch', label: 'Inch (in)' },
    { value: 'foot', label: 'Foot (ft)' },
    { value: 'yard', label: 'Yard (yd)' },
    { value: 'mile', label: 'Mile (mi)' },
  ];

  useEffect(() => {
    if (fromValue !== '' && !isNaN(parseFloat(fromValue))) {
      const converted = convertUnit(
        parseFloat(fromValue),
        fromUnit,
        toUnit,
        lengthConversions
      );
      setToValue(converted.toFixed(6));
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit]);

  const handleFromValueChange = (e) => {
    setFromValue(e.target.value);
  };

  const handleFromUnitChange = (e) => {
    setFromUnit(e.target.value);
  };

  const handleToUnitChange = (e) => {
    setToUnit(e.target.value);
  };

  const swapUnits = () => {
    const tempUnit = fromUnit;
    const tempValue = fromValue;
    setFromUnit(toUnit);
    setToUnit(tempUnit);
    setFromValue(toValue);
    setToValue(tempValue);
  };

  return (
    <div className="mode-transition">
      <div className={`calculator-layout ${sidebarCollapsed ? 'with-toggle-bar' : ''}`}>
        <div className="converter-header">
          <h2 className="converter-title">📏 Length Converter</h2>
          <p className="converter-subtitle">Convert between different length units</p>
        </div>
        
        <div className="converter-content">
          <div className="converter-form">
            <div className="converter-input-group">
              <label className="converter-label">From</label>
              <input
                type="number"
                className="converter-input"
                value={fromValue}
                onChange={handleFromValueChange}
                placeholder="Enter value"
              />
              <select
                className="converter-select"
                value={fromUnit}
                onChange={handleFromUnitChange}
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="converter-swap">
              <button
                className="converter-arrow"
                onClick={swapUnits}
                title="Swap units"
              >
                ⇄
              </button>
            </div>

            <div className="converter-input-group">
              <label className="converter-label">To</label>
              <input
                type="number"
                className="converter-input"
                value={toValue}
                readOnly
                placeholder="Result"
              />
              <select
                className="converter-select"
                value={toUnit}
                onChange={handleToUnitChange}
              >
                {units.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {fromValue && toValue && (
            <div className="converter-result">
              <h6 className="result-title">Conversion Result:</h6>
              <p className="result-text">
                <strong>{fromValue}</strong> {units.find(u => u.value === fromUnit)?.label} = 
                <strong> {toValue}</strong> {units.find(u => u.value === toUnit)?.label}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LengthConverter;
