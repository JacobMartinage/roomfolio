import { Html } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const GlowingText = () => {
  const [opacity, setOpacity] = useState(0);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCharging((prev) => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="glowing-text" style={{ opacity }}>
      {charging ? "LOADING..." : "INITIALIZING..."}
    </h1>
  );
};

const RotatingObject = () => {
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += 0.02;
  });

  return (
    <mesh ref={ref} scale={1.5}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial color={"#ff0055"} emissive={"#ff0055"} emissiveIntensity={1.5} />
    </mesh>
  );
};

const Loader = ({ onLoaded }) => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingComplete(true);
      setTimeout(() => setShowEnter(true), 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Html center>
      <div className="loader-container">
        {!loadingComplete ? (
          <>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 5, 3]} intensity={2} />
              <RotatingObject />
              <OrbitControls enableZoom={false} />
            </Canvas>
            <GlowingText />
          </>
        ) : showEnter ? (
          <button className="enter-button" onClick={onLoaded}>
            Enter
          </button>
        ) : null}
      </div>
    </Html>
  );
};

export default Loader;
