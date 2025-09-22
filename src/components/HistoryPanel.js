import React, { useState } from 'react';
import { useCalculator } from '../contexts/CalculatorContext';

const HistoryPanel = () => {
  const [activeTab, setActiveTab] = useState('history');
  const {
    history,
    memory,
    memoryHistory,
    clearHistory,
    removeFromHistory,
    clearMemoryHistory,
    memoryClear
  } = useCalculator();

  const handleHistoryClick = (entry) => {
    // This would be used to populate the calculator with the history entry
    // For now, we'll just log it
    console.log('Using history entry:', entry);
  };

  return (
    <div className="history-panel">
      <div className="history-tabs">
        <button 
          className={`history-tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
        <button 
          className={`history-tab ${activeTab === 'memory' ? 'active' : ''}`}
          onClick={() => setActiveTab('memory')}
        >
          Memory
        </button>
      </div>
      
      <div className="history-content">
        {activeTab === 'history' ? (
          <div>
            {history.length > 0 ? (
              <>
                <div className="history-header">
                  <span>History</span>
                  <button 
                    className="clear-button"
                    onClick={clearHistory}
                    title="Clear all history"
                  >
                    Clear
                  </button>
                </div>
                <div className="history-list">
                  {history.map((entry) => (
                    <div key={entry.id} className="history-item" onClick={() => handleHistoryClick(entry)}>
                      <div className="history-expression">{entry.expression}</div>
                      <div className="history-result">{entry.result}</div>
                      <button 
                        className="remove-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromHistory(entry.id);
                        }}
                        title="Remove from history"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="empty-state">
                <p>There's no history yet.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="memory-section">
              <div className="memory-value">
                <span className="memory-label">Memory:</span>
                <span className="memory-number">{memory}</span>
                <button 
                  className="memory-clear-btn"
                  onClick={memoryClear}
                  title="Clear memory"
                >
                  MC
                </button>
              </div>
              
              {memoryHistory.length > 0 ? (
                <>
                  <div className="memory-history-header">
                    <span>Memory History</span>
                    <button 
                      className="clear-button"
                      onClick={clearMemoryHistory}
                      title="Clear memory history"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="memory-history-list">
                    {memoryHistory.map((entry, index) => (
                      <div key={index} className="memory-history-item">
                        <div className="memory-action">{entry.action}</div>
                        <div className="memory-details">
                          {entry.action === 'MS' && `Stored: ${entry.value}`}
                          {entry.action === 'MC' && 'Cleared memory'}
                          {entry.action === 'M+' && `Added ${entry.value} → ${entry.newMemory}`}
                          {entry.action === 'M-' && `Subtracted ${entry.value} → ${entry.newMemory}`}
                        </div>
                        <div className="memory-time">{entry.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="empty-state">
                  <p>No memory operations yet.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;