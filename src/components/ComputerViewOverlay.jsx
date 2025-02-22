// components/ComputerViewOverlay.js
import "./ComputerView.css";

const ComputerViewOverlay = ({ isActive, onClose }) => {
  if (!isActive) return null;

  return (
    <div className="computer-view-overlay">
      <button className="close-button" onClick={onClose}>×</button>
    </div>
  );
};

export default ComputerViewOverlay;
