import { useState, useEffect } from "react";
import "./InstructionOverlay.css";

const InstructionOverlay = ({ interactedObjects, isLoading }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Only show overlay after loading is complete
  useEffect(() => {
    if (!isLoading) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="instruction-overlay">
      <div className="instruction-content">
        <h3>Welcome to my portfolio! 👋</h3>
        <div className="instruction-section">
          <h4>Controls</h4>
          <p>🖱️ Click and drag to rotate the view</p>
          <p>⚡ Interactable objects will glow when hovered over</p>
          <p>👆 Click on highlighted objects to interact</p>
        </div>

        <div className="instruction-section">
          <h4>Progress</h4>
          <div className="checklist">
            {Object.entries(interactedObjects).map(([key, value]) => (
              <div key={key} className={`checklist-item ${value ? 'completed' : ''}`}>
                <span className="checkbox">
                  {value ? '✓' : ''}
                </span>
                <span className="item-label">
                  {key.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button className="dismiss-button" onClick={handleDismiss}>
          Got it!
        </button>
      </div>
    </div>
  );
};

export default InstructionOverlay;
