import { useRef, Suspense } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Planet = ({ modelPath, orbitRadius, rotationSpeed, scale, initialAngle }) => {
  const planetRef = useRef();
  const gltf = useLoader(GLTFLoader, modelPath);

  useFrame((state) => {
    if (planetRef.current) {
      const elapsedTime = state.clock.getElapsedTime();
      const angle = elapsedTime * rotationSpeed + initialAngle; // Offset starting position
      planetRef.current.rotation.y += 0.002; // Slower self-rotation
      planetRef.current.position.x = Math.cos(angle) * orbitRadius;
      planetRef.current.position.z = Math.sin(angle) * orbitRadius;
    }
  });

  return <primitive ref={planetRef} object={gltf.scene} scale={scale} />;
};

const Planets = () => {
  return (
    <Suspense fallback={null}>
      {/* Neptune: Starts in positive X/Z quadrant */}
      <Planet modelPath="/models/Neptune.glb" orbitRadius={275} rotationSpeed={0.007} scale={0.04} initialAngle={Math.PI * 1.1} />
      
      {/* Venus: Also starts in positive X/Z quadrant */}
      <Planet modelPath="/models/Venus.glb" orbitRadius={175} rotationSpeed={0.009} scale={0.05} initialAngle={Math.PI * 1.2} />
    </Suspense>
  );
};

export default Planets;
