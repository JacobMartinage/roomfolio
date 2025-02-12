import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";

const INTERACTABLES = [
  "vt_flag",
  "retro_tv",
  "monitor_1",
  "monitor_2",
  "arcade_machine",
  "arcade_screen",
  "printer",
  "Mailbox",
  "coffee_table"
];

const RoomModel = () => {
  const gltf = useLoader(GLTFLoader, "/models/spaceRoom.glb");

  // Ensure objects are properly named
  gltf.scene.traverse((child) => {
    if (INTERACTABLES.includes(child.name)) {
      child.userData.isInteractable = true;
    }
  });

  return <primitive object={gltf.scene} position={[4, 0, 4]} />;
};

export default RoomModel;
