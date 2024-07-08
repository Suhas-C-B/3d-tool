import React, { useRef, useState } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  PivotControls,
} from "@react-three/drei";
import PCDLoaderComponent from "./Pcdreader";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import "./Scene.css";

const Edges = ({ position }) => {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
  const lines = new THREE.LineSegments(
    edgesGeometry,
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 })
  );

  return <primitive object={lines} position={position} />;
};

const Scene = () => {
  const [elements, setElements] = useState([]);
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);

  const toggleControls = () => {
    setOrbitControlsEnabled(!orbitControlsEnabled);
  };

  const buttonHandler = (event) => {
    const buttonId = event.target.id;
    console.log(buttonId);
  };

  const createObject = () => {
    setElements((prevElements) => [
      ...prevElements,
      <group
        key={prevElements.length}
        position={[Math.random() * 10, Math.random() * 10, Math.random() * 10]}
      >
        <PivotControls
          position={[0, 0, 0]}
          enabled={!orbitControlsEnabled}
          lineWidth={2}
          depthTest={false}
          displayValues={true}
          scale={1}
        >
          <mesh>
            <boxGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial
              attach="material"
              color={"#6BE092"}
              transparent
              opacity={0.7}
            />
          </mesh>
          <Edges position={[0, 0, 0]} />
        </PivotControls>
      </group>,
    ]);
  };

  return (
    <>
      <div>
        <div className="scene-class">
          <Canvas
            shadowmap="pcfsoft"
            pixelratio={window.devicePixelRatio}
            gl={{ alpha: false }}
            onCreated={({ gl }) => {
              if (gl) {
                gl.shadowMap.enabled = true;
              }
            }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 10]}
              fov={45}
              aspect={window.innerWidth / window.innerHeight}
              near={0.1}
              far={1000}
            />
            {orbitControlsEnabled && <OrbitControls />}
            <PCDLoaderComponent />
            {elements}
          </Canvas>
        </div>
        <button onClick={createObject}>Create</button>
        <button id="forward-button" onClick={buttonHandler}>
          Forward
        </button>
        <button id="right-button" onClick={buttonHandler}>
          Right
        </button>
        <button id="left-button" onClick={buttonHandler}>
          Left
        </button>
        <button id="back-button" onClick={buttonHandler}>
          Back
        </button>
        <button onClick={toggleControls}>
          {orbitControlsEnabled
            ? "Disable OrbitControls"
            : "Enable OrbitControls"}
        </button>
      </div>
    </>
  );
};

export default Scene;

