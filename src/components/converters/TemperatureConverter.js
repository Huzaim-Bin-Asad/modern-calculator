import React, { useState, useEffect } from 'react';
import { convertTemperature } from '../../utils/conversions';

const TemperatureConverter = () => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');

  const units = [
    { value: 'celsius', label: 'Celsius (°C)', symbol: '°C' },
    { value: 'fahrenheit', label: 'Fahrenheit (°F)', symbol: '°F' },
    { value: 'kelvin', label: 'Kelvin (K)', symbol: 'K' },
  ];

  useEffect(() => {
    if (fromValue !== '' && !isNaN(parseFloat(fromValue))) {
      const converted = convertTemperature(
        parseFloat(fromValue),
        fromUnit,
        toUnit
      );
      setToValue(converted.toFixed(2));
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

  const getTemperatureInfo = (unit) => {
    const info = {
      celsius: {
        freezing: 0,
        boiling: 100,
        description: 'Water freezes at 0°C and boils at 100°C'
      },
      fahrenheit: {
        freezing: 32,
        boiling: 212,
        description: 'Water freezes at 32°F and boils at 212°F'
      },
      kelvin: {
        freezing: 273.15,
        boiling: 373.15,
        description: 'Absolute zero is 0K, water freezes at 273.15K'
      }
    };
    return info[unit];
  };

  return (
    <div className="mode-transition">
      <div className="converter-container">
        <div className="card converter-card">
          <div className="card-body">
            <div className="text-center mb-4">
              <h2 className="card-title">🌡️ Temperature Converter</h2>
              <p className="text-muted">Convert between Celsius, Fahrenheit, and Kelvin</p>
            </div>

            <div className="converter-form">
              <div>
                <label className="form-label">From</label>
                <input
                  type="number"
                  className="form-control converter-input"
                  value={fromValue}
                  onChange={handleFromValueChange}
                  placeholder="Enter temperature"
                />
                <select
                  className="form-select converter-select mt-2"
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

              <div className="text-center">
                <button
                  className="btn btn-outline-primary converter-arrow"
                  onClick={swapUnits}
                  title="Swap units"
                >
                  ⇄
                </button>
              </div>

              <div>
                <label className="form-label">To</label>
                <input
                  type="number"
                  className="form-control converter-input"
                  value={toValue}
                  readOnly
                  placeholder="Result"
                />
                <select
                  className="form-select converter-select mt-2"
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
              <div className="mt-4">
                <div className="p-3 bg-light rounded mb-3">
                  <h6>Conversion Result:</h6>
                  <p className="mb-0">
                    <strong>{fromValue}</strong> {units.find(u => u.value === fromUnit)?.symbol} = 
                    <strong> {toValue}</strong> {units.find(u => u.value === toUnit)?.symbol}
                  </p>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">
                          {units.find(u => u.value === fromUnit)?.label} Reference
                        </h6>
                        <p className="card-text small">
                          {getTemperatureInfo(fromUnit).description}
                        </p>
                        <ul className="list-unstyled small">
                          <li>Freezing: {getTemperatureInfo(fromUnit).freezing}{units.find(u => u.value === fromUnit)?.symbol}</li>
                          <li>Boiling: {getTemperatureInfo(fromUnit).boiling}{units.find(u => u.value === fromUnit)?.symbol}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card">
                      <div className="card-body">
                        <h6 className="card-title">
                          {units.find(u => u.value === toUnit)?.label} Reference
                        </h6>
                        <p className="card-text small">
                          {getTemperatureInfo(toUnit).description}
                        </p>
                        <ul className="list-unstyled small">
                          <li>Freezing: {getTemperatureInfo(toUnit).freezing}{units.find(u => u.value === toUnit)?.symbol}</li>
                          <li>Boiling: {getTemperatureInfo(toUnit).boiling}{units.find(u => u.value === toUnit)?.symbol}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
