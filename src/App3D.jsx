// src/App3D.jsx
import React, { useState, useRef, useEffect, Suspense } from "react";
import { useNavigate }                            from "react-router-dom";
import { Canvas }                                 from "@react-three/fiber";
import { OrbitControls }                          from "@react-three/drei";

import Stars               from "./components/Stars";
import Planets             from "./components/Planets";
import RoomModel           from "./components/RoomModel";
import PostProcessing      from "./components/PostProcessing";
import RaycasterHandler    from "./components/RaycasterHandler";
import LoadingScreen       from "./components/LoadingScreen";
import SocialIcons         from "./components/SocialIcons";
import InstructionOverlay  from "./components/InstructionOverlay";

import { PrinterViewOverlay }   from "./components/PrinterView";
import TVViewOverlay            from "./components/TVViewOverlay";
import ComputerViewOverlay      from "./components/ComputerViewOverlay";
import ArcadeViewOverlay        from "./components/ArcadeViewOverlay";

import TVView           from "./components/TVView";
import ComputerView     from "./components/ComputerView";
import ArcadeView       from "./components/ArcadeView";

import "./index.css";

export default function App3D() {
  const nav = useNavigate();

  // navigate back on T, but ignore form inputs
  useEffect(() => {
    const onKey = (e) => {
      const tgt = e.target;
      if (
        tgt.tagName === "INPUT" ||
        tgt.tagName === "TEXTAREA" ||
        tgt.tagName === "SELECT" ||
        tgt.isContentEditable
      ) {
        return;
      }
      if (e.key.toLowerCase() === "t") {
        nav("/");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  const [isLoading, setIsLoading]     = useState(true);
  const [isFadingIn, setIsFadingIn]   = useState(false);
  const [isPrinterActive, setPrinterActive]   = useState(false);
  const [isTVActive, setTVActive]             = useState(false);
  const [isComputerActive, setComputerActive] = useState(false);
  const [isArcadeActive, setArcadeActive]     = useState(false);

  const outlinePassRef = useRef(null);
  const controlsRef    = useRef();

  const [interactedObjects, setInteractedObjects] = useState({
    mailbox: false,
    "retro-tv": false,
    computer: false,
    "vt-flag": false,
    printer: false,
    "arcade-machine": false,
    "linkedin-orb": false,
    "github-orb": false,
  });

  // called by <LoadingScreen> once assets are loaded
  const handleLoaded = () => {
    setIsFadingIn(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  return (
    <div className="relative">
      <div className="canvas-container">
        {isLoading && <LoadingScreen onLoaded={handleLoaded} />}


        {/* Overlays */}
        <PrinterViewOverlay
          isActive={isPrinterActive}
          onClose={() => setPrinterActive(false)}
        />
        <TVViewOverlay
          isActive={isTVActive}
          onClose={() => setTVActive(false)}
        />
        <ComputerViewOverlay
          isActive={isComputerActive}
          onClose={() => setComputerActive(false)}
        />
        <ArcadeViewOverlay
          isActive={isArcadeActive}
          onClose={() => setArcadeActive(false)}
        />

        <Canvas
          className={`main-scene ${isFadingIn ? "fade-in" : ""}`}
          camera={{ position: [20, 10, 20], fov: 55 }}
          style={{ background: "#050816" }}
        >
          <Suspense fallback={null}>
            <group visible={!isLoading}>
              <Stars />
              <RoomModel
                isComputerActive={isComputerActive}
                isArcadeActive={isArcadeActive}
                isTVActive={isTVActive}
              />
              <Planets />
              <SocialIcons />

              <ambientLight intensity={0.75} color="#ffffff" />
              <directionalLight position={[5, 10, 5]} intensity={2} />

              <RaycasterHandler
                outlinePassRef={outlinePassRef}
                controlsRef={controlsRef}
                interactedObjects={setInteractedObjects}
                setPrinterActive={setPrinterActive}
                isPrinterActive={isPrinterActive}
                setTVActive={setTVActive}
                isTVActive={isTVActive}
                setComputerActive={setComputerActive}
                isComputerActive={isComputerActive}
                setArcadeActive={setArcadeActive}
                isArcadeActive={isArcadeActive}
              />

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

              <TVView
                isActive={isTVActive}
                controlsRef={controlsRef}
              />
              <ComputerView
                isActive={isComputerActive}
                controlsRef={controlsRef}
              />
              <ArcadeView
                isActive={isArcadeActive}
                controlsRef={controlsRef}
              />
            </group>
          </Suspense>
        </Canvas>
      </div>

      <InstructionOverlay
        interactedObjects={interactedObjects}
        isLoading={isLoading}
      />

      <button 
      className="absolute top-4 left-4 px-4 py-2 bg-cyan-600 text-white rounded-md shadow-lg hover:bg-cyan-500 transition"
      onClick={() => nav("/")}
    >
      Back to Minimal/2D
    </button>
    </div>
  );
}
