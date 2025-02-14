import { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Stars from "./components/Stars";
import Planets from "./components/Planets";
import RoomModel from "./components/RoomModel";
import "./index.css";
import PostProcessing from "./components/PostProcessing";
import RaycasterHandler from "./components/RaycasterHandler";
import LoadingScreen from "./components/LoadingScreen";
import SocialIcons from './components/SocialIcons';
import InstructionOverlay from './components/InstructionOverlay';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const outlinePassRef = useRef(null);
  const controlsRef = useRef();

  const [interactedObjects, setInteractedObjects] = useState({
    "mailbox": false,
    "retro-tv": false,
    "vt-flag": false,
    "printer": false,
    "linkedin-orb": false,
    "github-orb": false,
    "arcade-machine": false,
  });

  const handleLoaded = () => {
    setIsFadingIn(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="canvas-container">
      {isLoading && <LoadingScreen onLoaded={handleLoaded} />}
      <InstructionOverlay 
        interactedObjects={interactedObjects} 
        isLoading={isLoading}
      />
      <Canvas 
        className={`main-scene ${isFadingIn ? 'fade-in' : ''}`}
        camera={{ position: [20, 10, 20], fov: 55 }} 
        style={{ background: "#050816" }}
      >
        <Suspense fallback={null}>
          <group visible={!isLoading}>
            <Stars />
            <RoomModel />
            <Planets />
            <SocialIcons />
            
            <ambientLight intensity={0.75} color={"#ffffff"} />
            <directionalLight position={[5, 10, 5]} intensity={2} />

            <RaycasterHandler outlinePassRef={outlinePassRef} controlsRef={controlsRef} interactedObjects={setInteractedObjects}/>
            <PostProcessing outlinePassRef={outlinePassRef} />

            <OrbitControls
              ref={controlsRef}
              minPolarAngle={0}
              maxPolarAngle={1.3}
              minAzimuthAngle={0}
              maxAzimuthAngle={Math.PI / 2}
              minDistance={10}
              maxDistance={200}
              enablePan={false}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
