import { useThree } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useEffect, useState } from "react";
import * as THREE from "three";
import "./PrinterView.css";

const PrinterView = ({ isActive, controlsRef, onClose }) => {
  const { camera } = useThree();

  // Store the initial position & quaternion (for smooth rotation)
  const [initialCamera] = useState({
    position: new THREE.Vector3(20, 10, 20),
    quaternion: new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        -69.35 * Math.PI / 180,
        6.5 * Math.PI / 180,
        11.5 * Math.PI / 180
      )
    ),
  });

  const targetPosition = isActive ? new THREE.Vector3(2.1, 4.5, -4.2) : initialCamera.position;
  const targetQuaternion = isActive
    ? new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          -71.35 * Math.PI / 180,
          6.5 * Math.PI / 180,
          11.5 * Math.PI / 180
        )
      )
    : initialCamera.quaternion;

  // Interpolated camera movement
  const { pos, rot } = useSpring({
    pos: targetPosition.toArray(),
    rot: [targetQuaternion.x, targetQuaternion.y, targetQuaternion.z, targetQuaternion.w],
    config: { mass: 1, tension: 180, friction: 40, clamp: true },
    onChange: ({ value }) => {
      camera.position.set(...value.pos);
      const newQuat = new THREE.Quaternion(value.rot[0], value.rot[1], value.rot[2], value.rot[3]);
      camera.quaternion.slerp(newQuat, 0.1);
      camera.updateProjectionMatrix();
    },
    onRest: () => {
      if (!isActive && controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    },
  });

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !isActive;
    }
  }, [isActive, controlsRef]);

  return null;
};

export const PrinterViewOverlay = ({ isActive, onClose }) => {
  if (!isActive) return null;
  
  const handleClose = () => {
    console.log("Close button clicked"); // Debug log
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="printer-view-overlay">
      <button 
        className="close-button"
        onClick={handleClose}
      >
        ×
      </button>
      <button 
        className="download-button"
        onClick={() => window.open('/resume.pdf', '_blank')}
      >
        Download PDF
      </button>
    </div>
  );
};

export default PrinterView;
