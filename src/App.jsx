import { useState, useRef, Suspense } from "react";
import * as THREE from "three"; // ✅ Import THREE
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Stars from "./components/Stars";
import Planets from "./components/Planets";
import Loader from "./components/Loader";
import RoomModel from "./components/RoomModel";
import "./index.css";
import PostProcessing from "./components/PostProcessing";
import RaycasterHandler from "./components/RaycasterHandler"; // ✅ Import RaycasterHandler

function App() {
  const [isSceneVisible, setIsSceneVisible] = useState(false);
  const outlinePassRef = useRef(null);

  return (
    <div className="canvas-container">
      {!isSceneVisible && (
        <button className="enter-button" onClick={() => setIsSceneVisible(true)}>
          Enter
        </button>
      )}

      {isSceneVisible && (
        <Canvas camera={{ position: [20, 10, 20], fov: 55 }} style={{ background: "#050816" }}>
          {/* ✅ Background Elements */}
          <Stars />
          <Planets />

          {/* ✅ Lighting Fix */}
          <ambientLight intensity={0.75} color={"#ffffff"} />
          <directionalLight position={[5, 10, 5]} intensity={2} />

          {/* ✅ Raycaster MUST be inside the Canvas */}
          <RaycasterHandler outlinePassRef={outlinePassRef} />

          {/* ✅ Post-processing should be inside Canvas too */}
          <PostProcessing outlinePassRef={outlinePassRef} />

          {/* ✅ Load Room Model */}
          <Suspense fallback={<Loader />}>
            <RoomModel />
          </Suspense>

          {/* ✅ Camera Controls */}
          <OrbitControls
            minPolarAngle={0}
            maxPolarAngle={1.3}
            minAzimuthAngle={0}
            maxAzimuthAngle={Math.PI / 2}
            minDistance={10}
            maxDistance={200}
            enablePan={false}
          />
        </Canvas>
      )}
    </div>
  );
}

export default App;
