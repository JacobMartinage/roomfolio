import { useThree } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

const VTFlagView = ({ isActive, onClose, controlsRef }) => {
  const { camera } = useThree();
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(isActive);

  // Store the initial camera position & rotation
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

  useEffect(() => {
    if (isActive) {
      setShouldAnimate(true);
    }
  }, [isActive]);

  // Target position for viewing education details
  const targetPosition = shouldAnimate ? new THREE.Vector3(-3, 10, -6) : initialCamera.position;
  const targetQuaternion = shouldAnimate
    ? new THREE.Quaternion().setFromEuler(new THREE.Euler(0, Math.PI / 2, 0))
    : initialCamera.quaternion;

  // Camera transition animation
  const { pos, rot } = useSpring({
    pos: targetPosition.toArray(),
    rot: [targetQuaternion.x, targetQuaternion.y, targetQuaternion.z, targetQuaternion.w],
    config: { mass: 1, tension: 180, friction: 40, clamp: true },
    onStart: () => setIsAnimating(true),
    onChange: ({ value }) => {
      camera.position.set(...value.pos);
      const newQuat = new THREE.Quaternion(value.rot[0], value.rot[1], value.rot[2], value.rot[3]);
      camera.quaternion.slerp(newQuat, 0.1);
      camera.updateProjectionMatrix();
    },
    onRest: () => {
      setIsAnimating(false);
      if (!shouldAnimate && controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    },
  });

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !shouldAnimate;
    }
  }, [shouldAnimate, controlsRef]);

  const closeAndReset = () => {
    // First close the form
    onClose();
    // Then start camera movement
    setTimeout(() => {
      setShouldAnimate(false);
    }, 50);
  };

  return isActive ? (
    <group>
      <Html 
        position={[-10, 12.5, -5]} 
        center
        occlude = "blending"
        zIndexRange={[4,4]}
      >
        <div
          style={{
            background: "#731A19", // VT Maroon
            color: "#FFC72C", // VT Orange
            padding: "20px",
            borderRadius: "10px",
            width: "500px",
            position: "absolute",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
            border: "2px solid #000",
            fontFamily: "'Courier New', Courier, monospace",
            textAlign: "center",
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeAndReset}
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              fontWeight: "bold",
              color: "white",
            }}
          >
            ✕
          </button>

          <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>🎓 Virginia Tech</h2>
          <p style={{ fontSize: "18px", marginTop: "10px" }}>📅 Expected Graduation: <b>May 2026</b></p>
          <p style={{ fontSize: "18px", marginTop: "5px" }}>📊 GPA: <b>3.4</b></p>

          <h3 style={{ marginTop: "15px", fontSize: "24px", fontWeight: "bold" }}>Relevant Courses:</h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "16px" }}>
            <li>🖥️ Data Structures & Algorithms</li>
            <li>🥽 Extended Reality(AR/VR)</li>
            <li>📈 Computer Organization</li>
            <li>🔍 Problem Solving in CS</li>
            <li>🛠️ Software Engineering</li>
            <li>💻 Computer Systems</li>
          </ul>

          <h3 style={{ marginTop: "15px", fontSize: "24px", fontWeight: "bold" }}>Organizations:</h3>
          <p style={{ fontSize: "16px" }}>🔬 <b>PRIME Lab</b> (HCI Research for AI in Education)</p>
          <p style={{ fontSize: "16px" }}>🏍️ <b>BOLT @ VT</b> (Electric Motorcycle Design Team)</p>
        </div>
      </Html>
    </group>
  ) : null;
};

export default VTFlagView;
