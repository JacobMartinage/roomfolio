import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import PrinterView from "./PrinterView";
import MailboxView from "./MailboxView";
import VTFlagView from "./VTFlagView";

const SCREEN_TO_PARENT_MAP = {
  "retro_tv_screen": "retro_tv",
  "monitor_1_screen": "Computer",
  "arcade_screen": "arcade",
};


const SHOWN_INTERACTABLES = [
  "vt_flag",
  "retro_tv",
  "Computer",
  "arcade_machine",
  "printer",
  "Mailbox",
  "github_orb",
  "linkedin_orb",
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
    if (SHOWN_INTERACTABLES.includes(object.name)) return object;
    object = object.parent;
  }
  return null;
}

const RaycasterHandler = ({ outlinePassRef, controlsRef, interactedObjects, setPrinterActive, isPrinterActive, setTVActive, isTVActive, setComputerActive, isComputerActive, setArcadeActive, isArcadeActive }) => {
  const { camera, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const selectedObjects = useRef([]);

  const [activeMailbox, setActiveMailbox] = useState(false);
  const [activeFlag, setActiveFlag] = useState(false);


  useEffect(() => {
    const handlePointerMove = (event) => {
      if (!outlinePassRef.current || activeMailbox || activeFlag || isComputerActive || isArcadeActive || isTVActive) {
        console.log("not active");
        console.log(isComputerActive, isArcadeActive, isTVActive);
        selectedObjects.current = [];
        return;
      }


      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(scene.children, true);

      const interactable = intersects.map((hit) => findInteractableObject(hit.object)).find(Boolean);

      if (interactable) {
        console.log("view status's");
        console.log(isComputerActive, isArcadeActive, isTVActive);
        selectedObjects.current = [interactable];

        if (interactable.name == "arcade_screen") {
          selectedObjects.current.push(interactable.parent);
        }

        outlinePassRef.current.selectedObjects = selectedObjects.current;
      } else {
        selectedObjects.current = [];
        outlinePassRef.current.selectedObjects = [];
      }
    };

    const handleClick = (event) => {
      
      if (activeMailbox || activeFlag) return;

      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(scene.children, true);
      const interactable = intersects.map((hit) => findInteractableObject(hit.object)).find(Boolean);
     
      if (interactable) {
        interactedObjects((prev) => ({
          ...prev,
          [interactable.name.toLowerCase().replace("_", "-")]: true,
        }));

        switch (interactable.name) {
          case "Mailbox":
            setActiveMailbox(true);
            break;
          case "printer":
            setPrinterActive(true);
            break;
          case "vt_flag":
            setActiveFlag(true);
            break;
          case "retro_tv":
            setTVActive(true);
            break;
          case "retro_tv_screen":
            setTVActive(true);
            break;
          case "monitor_1_screen":
            setComputerActive(true);
            console.log("computer active");
            break;
          case "arcade_screen":
            setArcadeActive(true);
            break;
          case "Computer":
            setComputerActive(true);
            break;
          case "arcade_machine":
            setArcadeActive(true);
            break;
            
          default:
            console.log("interactable", interactable.name);
        }
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
    };
  }, [camera, scene, outlinePassRef, activeMailbox, activeFlag, interactedObjects, setPrinterActive]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
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
        isActive={isPrinterActive}
        controlsRef={controlsRef}
        onClose={() => setPrinterActive(false)}
        
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
