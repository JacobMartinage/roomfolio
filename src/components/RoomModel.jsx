import { useLoader } from "@react-three/fiber";
import { Html, Preload } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { useEffect, useState } from "react";

function RoomModel() {
  const gltf = useLoader(GLTFLoader, "/models/SpaceRoom4.glb");

  // We'll store each screen's transform in state after the GLTF loads
  const [screenTransforms, setScreenTransforms] = useState({
    computer: null,
    retroTv: null,
    arcade: null
  });

  useEffect(() => {
    if (!gltf?.scene) return;

    // Helper to grab the world transform of an object by name:
    function getWorldTransform(objectName) {
      const obj = gltf.scene.getObjectByName(objectName);
      if (!obj) return null;

      // Hide the original mesh so you don't see it behind the iframe
      obj.visible = false;

      // Get world position/rotation/scale
      const position = new THREE.Vector3();
      const quaternion = new THREE.Quaternion();
      const scale = new THREE.Vector3();

      obj.updateMatrixWorld(true);
      obj.getWorldPosition(position);
      obj.getWorldQuaternion(quaternion);
      obj.getWorldScale(scale);

      return { position, quaternion, scale };
    }

    // Capture each screen once
    setScreenTransforms({
      computer: getWorldTransform("monitor_1_screen"),
      retroTv: getWorldTransform("retro_tv_screen"),
      arcade: getWorldTransform("arcade_screen"),

    });
  }, [gltf]);
  


  return (
    <>
      <Preload all />
      <primitive object={gltf.scene} position={[4, 0, 4]} zIndexRange={[2,2]}/>
      

      {/* For each screen, place an Html element at that transform */}
      
       {/* The main GLTF object */}
       {screenTransforms.computer && (
        <group
          position={[-1.93,4.6,-4.95]}
          rotation={[0,Math.PI/14,0]}
          scale={[0.062,0.05,0.1]}
          // scale everything down (try 0.01, or see what fits)
          
        >
          <Html 
            transform 
            occlude="blending"
            zIndexRange={[3,3]}
            unselectable={true}
            style={{ pointerEvents: 'none' }}
          >
            <iframe
              occlude="blending"
              src="https://example.com/simple-arcade"
              width={1600}
              height={900}
              style={{ border: "none" }}
              name="Computer"
            />
          </Html>
        </group>
      )}

      The main GLTF object
      {screenTransforms.retroTv && (
        <group
          position={[-4.55,4.44,-2.85]}
          rotation={[0,Math.PI/4.1,0]}
          scale={[0.058,0.046,0.1]}
          // scale everything down (try 0.01, or see what fits)
          
        >
          <Html 
            transform 
            occlude="blending"
            zIndexRange={[3,3]} 
            unselectable={true}
            style={{ pointerEvents: 'none' }}
          >
            <iframe
              occlude="blending"
              src="https://jacobmartinage.github.io/2d-site/"
              width={1100}
              height={1000}
              style={{ border: "none" }}
              name="retroTv"
            />
          </Html>
        </group>
      )}

      {/* The main GLTF object */}
      {screenTransforms.arcade && (
        <group
          position={[-4.4,6.2,9.6]}
          rotation={[0,Math.PI/2,0]}
          scale={[0.062,0.05,0.1]}
          // scale everything down (try 0.01, or see what fits)
          
        >
          <Html 
            transform 
            occlude="blending"
            zIndexRange={[3,3]} 
            unselectable={true}
            style={{ pointerEvents: 'none' }}
          >
            <iframe
              src="https://example.com/simple-arcade"
              width={1200}
              height={1200}
              style={{ border: "none" }}              
              name="arcade_screen"
            />
          </Html>
        </group>
      )}

      
    </>
  );
}

export default RoomModel;
