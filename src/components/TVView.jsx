// components/TVView.js
import { useThree } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { useEffect, useState } from "react";
import * as THREE from "three";
import "./TVView.css";

const TVView = ({ isActive, controlsRef }) => {
  const { camera } = useThree();

  const [initialCamera] = useState({
    position: new THREE.Vector3(20, 10, 20),
    quaternion: new THREE.Quaternion().setFromEuler(
      new THREE.Euler(-69.35 * Math.PI / 180, 6.5 * Math.PI / 180, 11.5 * Math.PI / 180)
    ),
  });

  // Target position for the TV view
  const targetPosition = isActive ? new THREE.Vector3(-2.6, 4.5, -1.5) : initialCamera.position;
  const targetQuaternion = isActive
    ? new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0 * Math.PI / 180, 45 * Math.PI / 180, 0) // Adjust angles to center the TV
      )
    : initialCamera.quaternion;

  const { pos, rot } = useSpring({
    pos: targetPosition.toArray(),
    rot: [targetQuaternion.x, targetQuaternion.y, targetQuaternion.z, targetQuaternion.w],
    config: { mass: 1, tension: 180, friction: 40, clamp: true },
    onChange: ({ value }) => {
      camera.position.set(...value.pos);
      camera.quaternion.slerp(
        new THREE.Quaternion(value.rot[0], value.rot[1], value.rot[2], value.rot[3]),
        0.1
      );
      camera.updateProjectionMatrix();
    },
    onRest: () => {
      if (!isActive && controlsRef.current) {
        controlsRef.current.enabled = true;
      }
    },
  });

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !isActive;
    }
  }, [isActive, controlsRef]);

  return null; // No JSX needed; this purely handles camera motion
};

export default TVView;
