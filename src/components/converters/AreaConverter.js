import React, { useState, useEffect } from 'react';
import { convertUnit, areaConversions } from '../../utils/conversions';

const AreaConverter = () => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [fromUnit, setFromUnit] = useState('squareMeter');
  const [toUnit, setToUnit] = useState('squareKilometer');

  const units = [
    { value: 'squareMeter', label: 'Square Meter (m²)' },
    { value: 'squareKilometer', label: 'Square Kilometer (km²)' },
    { value: 'squareCentimeter', label: 'Square Centimeter (cm²)' },
    { value: 'squareInch', label: 'Square Inch (in²)' },
    { value: 'squareFoot', label: 'Square Foot (ft²)' },
    { value: 'squareYard', label: 'Square Yard (yd²)' },
    { value: 'acre', label: 'Acre (ac)' },
    { value: 'hectare', label: 'Hectare (ha)' },
  ];

  useEffect(() => {
    if (fromValue !== '' && !isNaN(parseFloat(fromValue))) {
      const converted = convertUnit(
        parseFloat(fromValue),
        fromUnit,
        toUnit,
        areaConversions
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
      <div className="converter-container">
        <div className="card converter-card">
          <div className="card-body">
            <div className="text-center mb-4">
              <h2 className="card-title">📐 Area Converter</h2>
              <p className="text-muted">Convert between different area units</p>
            </div>

            <div className="converter-form">
              <div>
                <label className="form-label">From</label>
                <input
                  type="number"
                  className="form-control converter-input"
                  value={fromValue}
                  onChange={handleFromValueChange}
                  placeholder="Enter value"
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
              <div className="mt-4 p-3 bg-light rounded">
                <h6>Conversion Result:</h6>
                <p className="mb-0">
                  <strong>{fromValue}</strong> {units.find(u => u.value === fromUnit)?.label} = 
                  <strong> {toValue}</strong> {units.find(u => u.value === toUnit)?.label}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaConverter;
