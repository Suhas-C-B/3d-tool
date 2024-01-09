// ResizableCube.js
import React from "react";
import { PivotControls } from "@react-three/drei";

const ResizableCube = ({ position }) => {
  return (
    <group position={position}>
        <PivotControls
        position={[0, 0, 0]}
        lineWidth={2}
        depthTest={false}
        displayValues={true}
        scale={1}
        >
      <mesh>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={"#6BE092"} transparent opacity={0.7} />
      </mesh>
      </PivotControls>
    </group>
  );
};

export default ResizableCube;
