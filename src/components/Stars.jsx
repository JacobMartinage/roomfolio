import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

const Stars = (props) => {
  const ref = useRef();
  // Create a temporary array for the points
  const tempArray = new Float32Array(3000 * 3); // 3000 points * 3 coordinates each
  
  // Generate points in a sphere
  const sphere = random.inSphere(tempArray, { radius: 200.25 });
  
  // Filter out points that are too close to center
  for (let i = 0; i < sphere.length; i += 3) {
    const x = sphere[i];
    const y = sphere[i + 1];
    const z = sphere[i + 2];
    
    // Calculate distance from center
    const distance = Math.sqrt(x * x + y * y + z * z);
    
    // If point is too close to center, move it outward
    if (distance < 60) {
      const scale = 60 / distance;
      sphere[i] *= scale;
      sphere[i + 1] *= scale;
      sphere[i + 2] *= scale;
    }
  }

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 50;
    ref.current.rotation.y -= delta / 75;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={"#ffffff"}
          size={0.75}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default Stars;
