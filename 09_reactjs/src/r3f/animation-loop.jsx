import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";

function Cube() {
  const cubeRef = useRef(null);

  useFrame((_, delta) => {
    cubeRef.current.rotation.y += delta * 1;
  });

  return (
    <mesh ref={cubeRef} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <boxGeometry />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}

export function AnimationLoop() {
  return (
    <div className="scene">
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 100,
          position: [0, 0, 5],
        }}
        gl={{ antialias: true }}
      >
        <Cube />
      </Canvas>
    </div>
  );
}
