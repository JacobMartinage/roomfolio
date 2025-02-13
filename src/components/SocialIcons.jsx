import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Decal, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const SocialIcon = ({ position, texture, url, color, name }) => {
  const meshRef = useRef();
  const [decal] = useTexture([texture], (loaded) => {
    console.log('Texture loaded:', loaded);
  });
  
  decal.colorSpace = THREE.SRGBColorSpace;
  decal.premultiplyAlpha = true;
  decal.needsUpdate = true;

  const handleClick = () => {
    window.open(url, '_blank');
  };

  return (
    <Float speed={Math.random() + .35 } rotationIntensity={Math.random() + .3} floatIntensity={Math.random() + .2}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={handleClick}
        castShadow
        receiveShadow
        scale={2}
        rotation={[0.3, -0.2, -0.2]}
        name={name}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.2}
          polygonOffset
          polygonOffsetFactor={-5}
        />

        <Decal
          position={[1.1, 0.1, 1]}
          rotation={[0,.8, 0]}
          scale={2.1}
          map={decal}
          transparent={true}
        />
      </mesh>
    </Float>
  );
};

const SocialIcons = () => {
  return (
    <group>
      <SocialIcon
        position={[-18, 10, -28]}
        texture="/images/github-icon.png"
        url="https://github.com/JacobMartinage"
        color="#24292e"
        name="github_icon"
      />
      <SocialIcon
        position={[-26, 14, -30]}
        texture="/images/linkedin-icon.png"
        url="https://linkedin.com/in/jacob-martinage"
        color="#0a66c2"
        name="linkedin_icon"
      />
    </group>
  );
};

export default SocialIcons;