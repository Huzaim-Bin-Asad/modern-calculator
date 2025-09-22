import React from 'react';
import { useTheme } from '../App';

const Sidebar = ({ currentMode, setCurrentMode, onToggleSidebar }) => {
  const { isDarkTheme, toggleTheme } = useTheme();

  const modes = [
    { id: 'standard', name: 'Standard', icon: '🧮' },
    { id: 'scientific', name: 'Scientific', icon: '🔬' },
    { id: 'graphing', name: 'Graphing', icon: '📈' },
    { id: 'programmer', name: 'Programmer', icon: '💻' },
    { id: 'date', name: 'Date Calculation', icon: '📅' },
  ];

  const converters = [
    { id: 'length', name: 'Length', icon: '📏' },
    { id: 'volume', name: 'Volume', icon: '📦' },
    { id: 'weight', name: 'Weight & Mass', icon: '⚖️' },
    { id: 'temperature', name: 'Temperature', icon: '🌡️' },
    { id: 'energy', name: 'Energy', icon: '⚡' },
    { id: 'area', name: 'Area', icon: '📐' },
    { id: 'speed', name: 'Speed', icon: '🏃' },
    { id: 'time', name: 'Time', icon: '⏰' },
    { id: 'power', name: 'Power', icon: '🔋' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="d-flex align-items-center">
          <button 
            className="menu-toggle me-2"
            onClick={onToggleSidebar}
            title="Close sidebar"
          >
            ☰
          </button>
          <h2 className="sidebar-title">Calculator</h2>
        </div>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        >
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
      </div>

      <div className="sidebar-content">
        <ul className="mode-list">
          {modes.map((mode) => (
            <li key={mode.id} className="mode-item">
              <button
                className={`mode-button ${currentMode === mode.id ? 'active' : ''}`}
                onClick={() => setCurrentMode(mode.id)}
              >
                <span className="mode-icon">{mode.icon}</span>
                <span className="mode-text">{mode.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Converter</div>
          <ul className="mode-list">
            {converters.map((converter) => (
              <li key={converter.id} className="mode-item">
                <button
                  className={`mode-button ${currentMode === converter.id ? 'active' : ''}`}
                  onClick={() => setCurrentMode(converter.id)}
                >
                  <span className="mode-icon">{converter.icon}</span>
                  <span className="mode-text">{converter.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
