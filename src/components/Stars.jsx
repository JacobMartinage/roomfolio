import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { memo } from "react";

const Stars = memo((props) => {
  const ref = useRef();
  
  // Memoize the star positions so they don't change on re-render
  const sphere = useMemo(() => {
    const tempArray = new Float32Array(3000 * 3);
    const positions = random.inSphere(tempArray, { radius: 200.25 });
    
    // Filter out points that are too close to center
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];
      
      // Calculate distance from center
      const distance = Math.sqrt(x * x + y * y + z * z);
      
      // If point is too close to center, move it outward
      if (distance < 60) {
        const scale = 60 / distance;
        positions[i] *= scale;
        positions[i + 1] *= scale;
        positions[i + 2] *= scale;
      }
    }
    
    return positions;
  }, []); // Empty dependency array means this only runs once

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
});

export default Stars;
