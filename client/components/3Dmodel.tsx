"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/models/backpacker.glb");

  return <primitive object={scene} scale={2} />;
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 4, 5] }}>
      
      <ambientLight intensity={2} />
      <directionalLight position={[2, 2, 2]} />

      
      <Model />

      
      <OrbitControls
        autoRotate
        enableZoom={false} 
        enablePan={true} 
        enableRotate={true}
      />
    </Canvas>
  );
}
