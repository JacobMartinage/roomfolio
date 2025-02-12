import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const Interactions = ({ onObjectClick }) => {
  const { scene, camera } = useThree();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  useEffect(() => {
    const handleClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        onObjectClick(intersects[0].object);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [scene, camera]);

  return null; // This component doesn't render anything, just handles logic
};

export default Interactions;
