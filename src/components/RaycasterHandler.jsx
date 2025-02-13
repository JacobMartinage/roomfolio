import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const SCREEN_TO_PARENT_MAP = {
  'retro_tv_screen': 'retro_tv',
  'monitor_1_screen': 'monitor_1',
  'monitor_2_screen': 'monitor_2',
  'arcade_screen': 'arcade_machine'
};

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

function findInteractableObject(object) {
  while (object) {
    if (object.name in SCREEN_TO_PARENT_MAP) {
      let parent = object;
      while (parent) {
        if (parent.name === SCREEN_TO_PARENT_MAP[object.name]) {
          return parent;
        }
        parent = parent.parent;
      }
    }
    if (INTERACTABLES.includes(object.name)) return object;
    object = object.parent;
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
