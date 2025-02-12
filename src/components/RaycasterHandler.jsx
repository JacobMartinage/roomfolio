import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

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

// ✅ Traverse parent objects to find interactables
function findInteractableObject(object) {
  while (object) {
    if (INTERACTABLES.includes(object.name)) return object; // ✅ Found interactable object
    object = object.parent; // Move up to the parent
  }
  return null;
}

function RaycasterHandler({ outlinePassRef }) {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const selectedObjects = useRef([]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!outlinePassRef.current) return;

      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(scene.children, true);

      // ✅ Check parents for interactable objects
      const interactable = intersects.map((hit) => findInteractableObject(hit.object)).find(Boolean);

      if (interactable) {
        selectedObjects.current = [interactable];
        outlinePassRef.current.selectedObjects = selectedObjects.current;
      } else {
        selectedObjects.current = [];
        outlinePassRef.current.selectedObjects = [];
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [camera, scene, outlinePassRef]);

  return null;
}

export default RaycasterHandler;
