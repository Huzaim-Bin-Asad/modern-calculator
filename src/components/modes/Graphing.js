import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Helper function to safely evaluate mathematical expressions
const evaluateFunction = (expression, x) => {
  try {
    // Simple function evaluation for common mathematical functions
    let result = expression;
    
    // Replace x with the actual value
    result = result.replace(/x/g, `(${x})`);
    
    // Handle basic operations safely
    result = result
      .replace(/\^/g, '**') // Convert ^ to ** for Math.pow
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/abs/g, 'Math.abs')
      .replace(/exp/g, 'Math.exp');
    
    // Use a safer evaluation method
    // eslint-disable-next-line no-new-func
    return new Function('x', `return ${result}`)(x);
  } catch (e) {
    throw new Error('Invalid function');
  }
};

const Graphing = ({ sidebarCollapsed = false }) => {
  const [functionInput, setFunctionInput] = useState('x^2');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [plotData, setPlotData] = useState([]);
  const [error, setError] = useState('');

  const generatePlotData = useCallback(() => {
    try {
      setError('');
      const points = [];
      const step = (xMax - xMin) / 100;
      
      for (let x = xMin; x <= xMax; x += step) {
        try {
          // Simple function evaluation - in a real app, you'd use a proper math parser
          let y;
          const func = functionInput.replace(/x/g, `(${x})`);
          
          // Handle common functions
          const processedFunc = func
            .replace(/\^/g, '**')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log10')
            .replace(/ln/g, 'Math.log')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/abs/g, 'Math.abs')
            .replace(/exp/g, 'Math.exp');
          
          // Use a safer approach for function evaluation
          // For basic functions, we'll use a simple parser
          y = evaluateFunction(processedFunc, x);
          
          if (isFinite(y) && y >= yMin && y <= yMax) {
            points.push({ x, y });
          }
        } catch (e) {
          // Skip invalid points
          continue;
        }
      }
      
      setPlotData(points);
    } catch (e) {
      setError('Invalid function. Please check your syntax.');
    }
  }, [functionInput, xMin, xMax, yMin, yMax]);

  useEffect(() => {
    generatePlotData();
  }, [generatePlotData]);

  const chartData = {
    labels: plotData.map(point => point.x.toFixed(2)),
    datasets: [
      {
        label: `y = ${functionInput}`,
        data: plotData.map(point => point.y),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        fill: false,
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: `Graph of y = ${functionInput}`
      },
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'x'
        },
        min: xMin,
        max: xMax
      },
      y: {
        title: {
          display: true,
          text: 'y'
        },
        min: yMin,
        max: yMax
      }
    }
  };

  const handleFunctionChange = (e) => {
    setFunctionInput(e.target.value);
  };

  const handleXMinChange = (e) => {
    setXMin(parseFloat(e.target.value));
  };

  const handleXMaxChange = (e) => {
    setXMax(parseFloat(e.target.value));
  };

  const handleYMinChange = (e) => {
    setYMin(parseFloat(e.target.value));
  };

  const handleYMaxChange = (e) => {
    setYMax(parseFloat(e.target.value));
  };

  const resetView = () => {
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
  };

  const zoomIn = () => {
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const xCenter = (xMax + xMin) / 2;
    const yCenter = (yMax + yMin) / 2;
    
    setXMin(xCenter - xRange / 4);
    setXMax(xCenter + xRange / 4);
    setYMin(yCenter - yRange / 4);
    setYMax(yCenter + yRange / 4);
  };

  const zoomOut = () => {
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const xCenter = (xMax + xMin) / 2;
    const yCenter = (yMax + yMin) / 2;
    
    setXMin(xCenter - xRange);
    setXMax(xCenter + xRange);
    setYMin(yCenter - yRange);
    setYMax(yCenter + yRange);
  };

  const exampleFunctions = [
    'x^2',
    'x^3',
    'sin(x)',
    'cos(x)',
    'tan(x)',
    'log(x)',
    'sqrt(x)',
    'exp(x)',
    'x^2 + 2*x + 1',
    'sin(x) * cos(x)'
  ];

  return (
    <div className="mode-transition">
      <div className={`calculator-layout ${sidebarCollapsed ? 'with-toggle-bar' : ''}`}>
        <div className="graphing-header">
          <div className="function-input-section">
            <div className="function-input-group">
              <span className="function-label">y =</span>
              <input
                type="text"
                className="function-input"
                value={functionInput}
                onChange={handleFunctionChange}
                placeholder="Enter function (e.g., x^2, sin(x), log(x))"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
          
          <div className="graph-controls">
            <div className="range-inputs">
              <div className="range-input">
                <label>X Min</label>
                <input
                  type="number"
                  value={xMin}
                  onChange={handleXMinChange}
                  step="0.1"
                />
              </div>
              <div className="range-input">
                <label>X Max</label>
                <input
                  type="number"
                  value={xMax}
                  onChange={handleXMaxChange}
                  step="0.1"
                />
              </div>
              <div className="range-input">
                <label>Y Min</label>
                <input
                  type="number"
                  value={yMin}
                  onChange={handleYMinChange}
                  step="0.1"
                />
              </div>
              <div className="range-input">
                <label>Y Max</label>
                <input
                  type="number"
                  value={yMax}
                  onChange={handleYMaxChange}
                  step="0.1"
                />
              </div>
            </div>
            
            <div className="graph-buttons">
              <button className="graph-btn primary" onClick={generatePlotData}>
                Update Graph
              </button>
              <button className="graph-btn" onClick={resetView}>
                Reset View
              </button>
              <button className="graph-btn" onClick={zoomIn}>
                Zoom In
              </button>
              <button className="graph-btn" onClick={zoomOut}>
                Zoom Out
              </button>
            </div>
          </div>
        </div>
        
        <div className="graph-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Graphing;
