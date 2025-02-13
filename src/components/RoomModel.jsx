import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Preload } from "@react-three/drei";
import { useEffect } from "react";

const INTERACTABLES = [
  "vt_flag",
  "retro_tv",
  "monitor_1",
  "monitor_2",
  "arcade_machine",
  "printer",
  "Mailbox",
  "coffee_table"
];

const RoomModel = () => {
  const gltf = useLoader(GLTFLoader, "/models/spaceRoom.glb");

  useEffect(() => {
    gltf.scene.traverse((child) => {
      console.log("Object name:", child.name, "Parent name:", child.parent?.name);
      
      if (child.material) {
        // Check if this object or any of its parents is named "pug" or "helmet"
        let currentObj = child;
        let skipMaterial = false;
        while (currentObj) {
          if (currentObj.name === "pug" || currentObj.name === "helmet") {
            console.log("Found special object in hierarchy:", currentObj.name);
            skipMaterial = true;
            break;
          }
          currentObj = currentObj.parent;
        }

        if (skipMaterial) {
          console.log("Skipping material modification for:", child.name);
          return;
        }

        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = 0;
        
        const fadeIn = () => {
          if (child.material.opacity < 1) {
            child.material.opacity += 0.01;
            requestAnimationFrame(fadeIn);
          }
        };
        
        setTimeout(() => fadeIn(), 1000);
      }

      if (INTERACTABLES.includes(child.name)) {
        child.userData.isInteractable = true;
      }
    });
  }, [gltf]);

  return (
    <>
      <primitive object={gltf.scene} position={[4, 0, 4]} />
      <Preload all />
    </>
  );
};

export default RoomModel;
