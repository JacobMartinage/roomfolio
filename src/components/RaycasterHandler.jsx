import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import PrinterView from "./PrinterView";
import MailboxView from "./MailboxView";
import VTFlagView from "./VTFlagView";

const SCREEN_TO_PARENT_MAP = {
  "retro_tv_screen": "retro_tv",
  "monitor_1_screen": "monitor_1",
  "monitor_2_screen": "monitor_2",
  "arcade_screen": "arcade_machine",
};

const INTERACTABLES = [
  "vt_flag",
  "retro_tv",
  "monitor_1",
  "monitor_2",
  "arcade_machine",
  "printer",
  "Mailbox",
  "coffee_table",
  "github_icon",
  "linkedin_icon",
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

const RaycasterHandler = ({ outlinePassRef, controlsRef }) => {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const selectedObjects = useRef([]);

  const [activePrinter, setActivePrinter] = useState(false);
  const [activeMailbox, setActiveMailbox] = useState(false);
  const [activeFlag, setActiveFlag] = useState(false);

  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!outlinePassRef.current || activePrinter || activeMailbox || activeFlag) return;

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

    const handleClick = (event) => {
      if (activePrinter || activeMailbox || activeFlag) return;

      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(scene.children, true);

      const interactable = intersects.map((hit) => findInteractableObject(hit.object)).find(Boolean);

      if (interactable) {
        switch (interactable.name) {
          case "Mailbox":
            console.log("Mailbox position:", interactable.position);
            console.log("Mailbox world position:", interactable.getWorldPosition(new THREE.Vector3()));
            setActiveMailbox(true);
            break;
          case "printer":
            setActivePrinter(true);
            break;
          case "vt_flag":
            console.log("VT Flag position:", interactable.position);
            console.log("VT Flag world position:", interactable.getWorldPosition(new THREE.Vector3()));
            setActiveFlag(true);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
    };
  }, [camera, scene, outlinePassRef, activePrinter, activeMailbox, activeFlag]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setActivePrinter(false);
        setActiveMailbox(false);
        setActiveFlag(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <PrinterView
        isActive={activePrinter}
        onClose={() => setActivePrinter(false)}
        controlsRef={controlsRef}
      />
      <MailboxView
        isActive={activeMailbox}
        onClose={() => setActiveMailbox(false)}
        controlsRef={controlsRef}
      />
      <VTFlagView
        isActive={activeFlag}
        onClose={() => setActiveFlag(false)}
        controlsRef={controlsRef}
      />
    </>
  );
};

export default RaycasterHandler;
