import { useThree } from "@react-three/fiber";
import { useSpring, animated } from "@react-spring/three";
import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

const PrinterView = ({ isActive, onClose, controlsRef }) => {
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

  const targetPosition = isActive ? new THREE.Vector3(2.35, 4.5, -4.15) : initialCamera.position;
  const targetQuaternion = isActive
    ? new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          -69.35 * Math.PI / 180,
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
      // Apply position
      camera.position.set(...value.pos);

      // Apply quaternion for smooth rotation
      const newQuat = new THREE.Quaternion(value.rot[0], value.rot[1], value.rot[2], value.rot[3]);
      camera.quaternion.slerp(newQuat, 0.1); // Smoothly interpolate
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

  return isActive ? (
    <group>
      {/* Close Button */}
      <Html position={[2.6, 3.5, -5.2]} center>
        <button 
          onClick={onClose}
          style={{
            background: '#915eff',
            border: 'none',
            color: '#fff',
            fontSize: '54px',
            cursor: 'pointer',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={e => e.target.style.backgroundColor = 'rgba(206, 14, 14, 0.6)'}
          onMouseLeave={e => e.target.style.backgroundColor = '#915eff'}
        >
          ×
        </button>
      </Html>

      {/* Download Button */}
      <Html position={[1.5, 3.5, -5]} center>
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          padding: '15px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
        }}>
          <button 
            onClick={() => window.open('/resume.pdf', '_blank')}
            style={{
              background: '#915eff',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'transform 0.2s, background-color 0.2s'
            }}
            onMouseEnter={e => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.backgroundColor = '#7f45ff';
            }}
            onMouseLeave={e => {
              e.target.style.transform = 'scale(1)';
              e.target.style.backgroundColor = '#915eff';
            }}
          >
            Download PDF
          </button>
        </div>
      </Html>
    </group>
  ) : null;
};

export default PrinterView;
