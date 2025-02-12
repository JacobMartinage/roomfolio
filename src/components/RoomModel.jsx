import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";

const RoomModel = () => {
  const gltf = useLoader(GLTFLoader, "/models/spaceRoom.glb");

  return <primitive object={gltf.scene} position={[4, 0, 4]} />; 
};

const RoomModelWrapper = () => (
  <Suspense fallback={null}>
    <RoomModel />
  </Suspense>
);

export default RoomModelWrapper;
