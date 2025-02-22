// components/TVViewOverlay.js
import "./TVView.css";

const TVViewOverlay = ({ isActive, onClose }) => {
  if (!isActive) return null;

  return (
    <div className="tv-view-overlay">
      <button className="close-button" onClick={onClose}>x</button>
    </div>
  );
};

export default TVViewOverlay;
