import React, { useState, useEffect } from 'react';
import { 
  calculateDateDifference, 
  addToDate, 
  subtractFromDate, 
  formatDate 
} from '../../utils/dateUtils';

const DateCalc = ({ sidebarCollapsed = false }) => {
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const [result, setResult] = useState('');
  const [calculationType, setCalculationType] = useState('difference');
  const [unit, setUnit] = useState('days');
  const [amount, setAmount] = useState('');
  const [baseDate, setBaseDate] = useState('');
  const [operation, setOperation] = useState('add');

  useEffect(() => {
    if (calculationType === 'difference' && date1 && date2) {
      const diff = calculateDateDifference(date1, date2, unit);
      if (diff !== null) {
        setResult(`${diff} ${unit}`);
      } else {
        setResult('Invalid dates');
      }
    } else if (calculationType === 'add_subtract' && baseDate && amount) {
      let resultDate;
      if (operation === 'add') {
        resultDate = addToDate(baseDate, parseInt(amount), unit);
      } else {
        resultDate = subtractFromDate(baseDate, parseInt(amount), unit);
      }
      
      if (resultDate) {
        const formatted = formatDate(resultDate, 'yyyy-MM-dd');
        setResult(formatted);
      } else {
        setResult('Invalid date or amount');
      }
    }
  }, [date1, date2, unit, calculationType, baseDate, amount, operation]);

  const handleDate1Change = (e) => {
    setDate1(e.target.value);
  };

  const handleDate2Change = (e) => {
    setDate2(e.target.value);
  };

  const handleBaseDateChange = (e) => {
    setBaseDate(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCalculationTypeChange = (e) => {
    setCalculationType(e.target.value);
    setResult('');
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  const getCurrentDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  const setToday = () => {
    const today = getCurrentDate();
    if (calculationType === 'difference') {
      setDate1(today);
    } else {
      setBaseDate(today);
    }
  };

  return (
    <div className="mode-transition">
      <div className={`calculator-layout ${sidebarCollapsed ? 'with-toggle-bar' : ''}`}>
        <div className="date-calculator-header">
          <h2 className="date-title">📅 Date Calculator</h2>
          <p className="date-subtitle">Calculate date differences and perform date arithmetic</p>
        </div>
        
        <div className="date-calculator-content">

          <div className="calculation-type-section">
            <label className="date-label">Calculation Type</label>
            <select
              className="date-select"
              value={calculationType}
              onChange={handleCalculationTypeChange}
            >
              <option value="difference">Date Difference</option>
              <option value="add_subtract">Add/Subtract from Date</option>
            </select>
          </div>

          {calculationType === 'difference' ? (
            <div className="date-form-section">
              <div className="date-inputs-row">
                <div className="date-input-group">
                  <label className="date-label">From Date</label>
                  <div className="date-input-with-button">
                    <input
                      type="date"
                      className="date-input"
                      value={date1}
                      onChange={handleDate1Change}
                    />
                    <button
                      className="date-button"
                      onClick={() => setDate1(getCurrentDate())}
                    >
                      Today
                    </button>
                  </div>
                </div>
                <div className="date-input-group">
                  <label className="date-label">To Date</label>
                  <div className="date-input-with-button">
                    <input
                      type="date"
                      className="date-input"
                      value={date2}
                      onChange={handleDate2Change}
                    />
                    <button
                      className="date-button"
                      onClick={() => setDate2(getCurrentDate())}
                    >
                      Today
                    </button>
                  </div>
                </div>
              </div>

              <div className="unit-section">
                <label className="date-label">Unit</label>
                <select
                  className="date-select"
                  value={unit}
                  onChange={handleUnitChange}
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="date-form-section">
              <div className="date-inputs-row">
                <div className="date-input-group">
                  <label className="date-label">Base Date</label>
                  <div className="date-input-with-button">
                    <input
                      type="date"
                      className="date-input"
                      value={baseDate}
                      onChange={handleBaseDateChange}
                    />
                    <button
                      className="date-button"
                      onClick={() => setBaseDate(getCurrentDate())}
                    >
                      Today
                    </button>
                  </div>
                </div>
                <div className="date-input-group">
                  <label className="date-label">Amount</label>
                  <input
                    type="number"
                    className="date-input"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div className="date-inputs-row">
                <div className="date-input-group">
                  <label className="date-label">Operation</label>
                  <select
                    className="date-select"
                    value={operation}
                    onChange={handleOperationChange}
                  >
                    <option value="add">Add</option>
                    <option value="subtract">Subtract</option>
                  </select>
                </div>
                <div className="date-input-group">
                  <label className="date-label">Unit</label>
                  <select
                    className="date-select"
                    value={unit}
                    onChange={handleUnitChange}
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="date-result">
              <h6 className="result-title">Result:</h6>
              <p className="result-text">
                {calculationType === 'difference' ? (
                  <>
                    <strong>{result}</strong> between {date1} and {date2}
                  </>
                ) : (
                  <>
                    {operation === 'add' ? 'Adding' : 'Subtracting'} <strong>{amount} {unit}</strong> from {baseDate} = <strong>{result}</strong>
                  </>
                )}
              </p>
            </div>
          )}

          <div className="date-actions">
            <h6 className="actions-title">Quick Actions</h6>
            <div className="actions-buttons">
              <button
                className="date-action-btn primary"
                onClick={setToday}
              >
                Set Today's Date
              </button>
              <button
                className="date-action-btn"
                onClick={() => {
                  setDate1('');
                  setDate2('');
                  setBaseDate('');
                  setAmount('');
                  setResult('');
                }}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateCalc;
