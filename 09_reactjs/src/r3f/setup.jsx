import { Canvas } from "@react-three/fiber";

export function Setup() {
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
        frameloop="demand"
      >
        <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <boxGeometry />
          <meshBasicMaterial color="orange" />
        </mesh>
      </Canvas>
    </div>
  );
}
