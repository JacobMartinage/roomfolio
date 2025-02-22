// components/ArcadeViewOverlay.js
import "./ArcadeView.css";

const ArcadeViewOverlay = ({ isActive, onClose }) => {
  if (!isActive) return null;

  return (
    <div className="arcade-view-overlay">
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
};

export default ArcadeViewOverlay;
