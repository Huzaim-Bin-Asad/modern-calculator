import React, { useState, createContext, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { CalculatorProvider } from './contexts/CalculatorContext';
import Sidebar from './components/Sidebar';
import HistoryPanel from './components/HistoryPanel';
import Standard from './components/modes/Standard';
import Scientific from './components/modes/Scientific';
import Graphing from './components/modes/Graphing';
import Programmer from './components/modes/Programmer';
import DateCalc from './components/modes/DateCalc';
import LengthConverter from './components/converters/LengthConverter';
import VolumeConverter from './components/converters/VolumeConverter';
import WeightConverter from './components/converters/WeightConverter';
import TemperatureConverter from './components/converters/TemperatureConverter';
import EnergyConverter from './components/converters/EnergyConverter';
import AreaConverter from './components/converters/AreaConverter';
import SpeedConverter from './components/converters/SpeedConverter';
import TimeConverter from './components/converters/TimeConverter';
import PowerConverter from './components/converters/PowerConverter';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

function App() {
  const [currentMode, setCurrentMode] = useState('standard');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const toggleMobileHistory = () => {
    setMobileHistoryOpen(!mobileHistoryOpen);
  };

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'standard':
        return <Standard sidebarCollapsed={sidebarCollapsed} />;
      case 'scientific':
        return <Scientific sidebarCollapsed={sidebarCollapsed} />;
      case 'graphing':
        return <Graphing sidebarCollapsed={sidebarCollapsed} />;
      case 'programmer':
        return <Programmer sidebarCollapsed={sidebarCollapsed} />;
      case 'date':
        return <DateCalc sidebarCollapsed={sidebarCollapsed} />;
      case 'length':
        return <LengthConverter sidebarCollapsed={sidebarCollapsed} />;
      case 'volume':
        return <VolumeConverter sidebarCollapsed={sidebarCollapsed} />;
      case 'weight':
        return <WeightConverter sidebarCollapsed={sidebarCollapsed} />;
      case 'temperature':
        return <TemperatureConverter sidebarCollapsed={sidebarCollapsed} />;
      case 'energy':
        return <EnergyConverter sidebarCollapsed={sidebarCollapsed} />;
      case 'area':
        return <AreaConverter sidebarCollapsed={sidebarCollapsed} />;
      case 'speed':
        return <SpeedConverter sidebarCollapsed={sidebarCollapsed} />;
      case 'time':
        return <TimeConverter sidebarCollapsed={sidebarCollapsed} />;
      case 'power':
        return <PowerConverter sidebarCollapsed={sidebarCollapsed} />;
      default:
        return <Standard sidebarCollapsed={sidebarCollapsed} />;
    }
  };

  const themeClass = isDarkTheme ? 'dark-theme' : 'light-theme';

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      <CalculatorProvider>
        <div className={`app-container ${themeClass}`}>
        <div className="container-fluid h-100 p-0">
          {/* Mobile Controls */}
          <div className="mobile-controls d-md-none">
            <button 
              className="mobile-menu-btn"
              onClick={toggleMobileSidebar}
              title="Open menu"
            >
              ☰
            </button>
            <div className="mobile-mode-title">
              {currentMode === 'standard' && 'Standard'}
              {currentMode === 'scientific' && 'Scientific'}
              {currentMode === 'graphing' && 'Graphing'}
              {currentMode === 'programmer' && 'Programmer'}
              {currentMode === 'date' && 'Date calculation'}
              {currentMode === 'length' && 'Length'}
              {currentMode === 'volume' && 'Volume'}
              {currentMode === 'weight' && 'Weight and mass'}
              {currentMode === 'temperature' && 'Temperature'}
              {currentMode === 'energy' && 'Energy'}
              {currentMode === 'area' && 'Area'}
              {currentMode === 'speed' && 'Speed'}
              {currentMode === 'time' && 'Time'}
              {currentMode === 'power' && 'Power'}
            </div>
            <button 
              className="mobile-history-btn"
              onClick={toggleMobileHistory}
              title="Open history"
            >
              📊
            </button>
          </div>

          <div className="row h-100 g-0">
            {/* Sidebar */}
            <div className={`col-3 ${sidebarCollapsed ? 'd-none' : ''} ${mobileSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
              <Sidebar 
                currentMode={currentMode}
                setCurrentMode={setCurrentMode}
                onToggleSidebar={toggleSidebar}
                onMobileClose={() => setMobileSidebarOpen(false)}
              />
            </div>
            
            {/* Main Calculator Area */}
            <div className={`${sidebarCollapsed ? 'col-9' : 'col-6'}`}>
              <div className="calculator-main">
                {sidebarCollapsed && (
                  <div className="sidebar-toggle-bar">
                    <button 
                      className="open-sidebar-btn"
                      onClick={toggleSidebar}
                      title="Open sidebar"
                    >
                      ☰
                    </button>
                    <div className="selected-mode">
                      {currentMode === 'standard' && 'Standard'}
                      {currentMode === 'scientific' && 'Scientific'}
                      {currentMode === 'graphing' && 'Graphing'}
                      {currentMode === 'programmer' && 'Programmer'}
                      {currentMode === 'date' && 'Date calculation'}
                      {currentMode === 'length' && 'Length'}
                      {currentMode === 'volume' && 'Volume'}
                      {currentMode === 'weight' && 'Weight and mass'}
                      {currentMode === 'temperature' && 'Temperature'}
                      {currentMode === 'energy' && 'Energy'}
                      {currentMode === 'area' && 'Area'}
                      {currentMode === 'speed' && 'Speed'}
                      {currentMode === 'time' && 'Time'}
                      {currentMode === 'power' && 'Power'}
                    </div>
                  </div>
                )}
                {renderCurrentMode()}
              </div>
            </div>
            
            {/* History and Memory Panel */}
            <div className={`col-3 ${mobileHistoryOpen ? 'mobile-history-open' : ''}`}>
              <HistoryPanel />
            </div>
          </div>
        </div>
        </div>
      </CalculatorProvider>
    </ThemeContext.Provider>
  );
}

export default App;