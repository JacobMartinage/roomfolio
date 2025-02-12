import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RoomModel from "./components/RoomModel";
import Stars from "./components/Stars";
import Loader from "./components/Loader";
import Planets from "./components/Planets";
import "./index.css";

function App() {
  const [isSceneVisible, setIsSceneVisible] = useState(false);

  return (
    <div className="canvas-container">
      {!isSceneVisible && <button className="enter-button" onClick={() => setIsSceneVisible(true)}>Enter</button>}

      {isSceneVisible && (
        <Canvas camera={{ position: [20, 10, 20], fov: 55 }} style={{ background: "#050816" }}>
          <Stars />
          <Planets />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={2} />

          <Suspense fallback={<Loader />}>
            <RoomModel />
          </Suspense>

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
