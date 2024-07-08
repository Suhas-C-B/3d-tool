import React, { useState } from "react";
import {
  OrbitControls,
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";
import PCDLoaderComponent from "./Pcdreader";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import "./Scene.css";
import { MathUtils } from "three/src/math/MathUtils";

const Edges = ({ position }) => {
  const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
  const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
  const lines = new THREE.LineSegments(
    edgesGeometry,
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 })
  );

  return <primitive object={lines} position={position} />;
};

const FirstView = ({ elements }) => {
  return (
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
      <group
        rotation={[
          MathUtils.degToRad(90),
          MathUtils.degToRad(90),
          MathUtils.degToRad(0),
        ]}
      >
        <OrthographicCamera
          makeDefault
          zoom={1}
          top={10}
          bottom={-10}
          left={-10}
          right={10}
          position={[0, 0, 5]}
          near={0.1}
          far={1000}
        />
      </group>
      <PCDLoaderComponent />
      {elements}
    </Canvas>
  );
};

const SecondView = ({ elements, position }) => {
  return (
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
      <group
        rotation={[
          MathUtils.degToRad(90),
          MathUtils.degToRad(0),
          MathUtils.degToRad(0),
        ]}
      >
        <OrthographicCamera
          makeDefault
          zoom={1}
          top={10}
          bottom={-10}
          left={-10}
          right={10}
          position={[0, 0, 5]}
          near={0.1}
          far={1000}
        />
      </group>
      <PCDLoaderComponent />
      {elements}
    </Canvas>
  );
};

const ThirdView = ({ elements }) => {
  
  return (
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
      <group
        rotation={[
          MathUtils.degToRad(0),
          MathUtils.degToRad(0),
          MathUtils.degToRad(0),
        ]}
      >
        <OrthographicCamera
          makeDefault
          zoom={1}
          top={10}
          bottom={-10}
          left={-10}
          right={10}
          position={[0, 0, 5]}
          near={0.1}
          far={1000}
        />
      </group>
      <PCDLoaderComponent />
      {elements}
    </Canvas>
  );
};

function Scene() {
  const [boxPositions, setBoxPositions] = useState([]);
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true);
  const [selectedBox, setSelectedBox] = useState(0);

  const toggleControls = () => {
    setOrbitControlsEnabled(!orbitControlsEnabled);
  };

  const clickHandler = (index) => {
    console.log(boxPositions);
    setSelectedBox(index);
    colorChange(index);
    console.log(index);
  };

  const colorChange = (index) => {
    setBoxPositions((prevPositions) => {
      return prevPositions.map((position, i) => {
        if (i === index) {
          return { ...position, color: position.color === "#E0736B" ? "#6BE092" : "#E0736B" };
        } else {
          return { ...position, color: position.color = "#6BE092" };
        }
      });
    });
  }

  const buttonHandler = (event) => {
    const buttonId = event.target.id;
    let newPositions = [...boxPositions];
    console.log(newPositions)

    switch (buttonId) {
      case "forward-button":
        newPositions[selectedBox] = {
          ...newPositions[selectedBox],
          z: newPositions[selectedBox].z + 0.1
        };
        break;
      case "right-button":
        newPositions[selectedBox] = {
          ...newPositions[selectedBox],
          x: newPositions[selectedBox].x + 0.1
        };
        break;
      case "left-button":
        newPositions[selectedBox] = {
          ...newPositions[selectedBox],
          x: newPositions[selectedBox].x - 0.1
        };
        break;
      case "back-button":
        newPositions[selectedBox] = {
          ...newPositions[selectedBox],
          z: newPositions[selectedBox].z - 0.1
        };
        break;
      default:
        break;
    }
    setBoxPositions(newPositions);
  };

  const createObject = () => {
    const newPosition = { x: 0, y: 0, z: 0, color: '#6BE092' };
    setBoxPositions((prevPositions) => [...prevPositions, newPosition]);
  };

  return (
    <>
      <div>
        <div className="scene-class">
          {/* Isometric View */}
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
              position={[-20, -10, 20]}
              fov={45}
              aspect={window.innerWidth / window.innerHeight}
              near={0.1}
              far={1000}
            />
            {orbitControlsEnabled && <OrbitControls />}
            <PCDLoaderComponent />
            {boxPositions.map((position, index) => (
              <group key={index} position={[position.x, position.y, position.z]}>
                <mesh onClick={() => clickHandler(index)}>
                  <boxGeometry attach="geometry" args={[3, 3, 3]} />
                  <meshStandardMaterial
                    attach="material"
                    color={position.color}
                    transparent
                    opacity={0.7}
                  />
                </mesh>
                <Edges position={[0, 0, 0]} />
              </group>
            ))}
          </Canvas>
        </div>
        <div className="side-container">
          <div className="side-class">
            {/* Side View Screen 1*/}
            <FirstView
              elements={boxPositions.map((position, index) => (
                <group key={index} position={[position.x, position.y, position.z]}>
                  <mesh onClick={() => clickHandler(index)}>
                    <boxGeometry attach="geometry" args={[3, 3, 3]} />
                    <meshStandardMaterial
                      attach="material"
                      color={position.color}
                      transparent
                      opacity={0.7}
                    />
                  </mesh>
                  <Edges position={[0, 0, 0]} />
                </group>
              ))}
            />
          </div>
          <div className="side-class">
            {/* Top View Screen2*/}
            <SecondView
              elements={boxPositions.map((position, index) => (
                <group key={index} position={[position.x, position.y, position.z]}>
                  <mesh onClick={() => clickHandler(index)}>
                    <boxGeometry attach="geometry" args={[3, 3, 3]} />
                    <meshStandardMaterial
                      attach="material"
                      color={position.color}
                      transparent
                      opacity={0.7}
                    />
                  </mesh>
                  <Edges position={[0, 0, 0]} />
                </group>
              ))}
              position={boxPositions.map((position, index) => (
                [position.x, position.y, position.z]
              ))}
            />
          </div>
          <div className="side-class">
            {/* Front View Screen3*/}
            <ThirdView
              elements={boxPositions.map((position, index) => (
                <group key={index} position={[position.x, position.y, position.z]}>
                  <mesh onClick={() => clickHandler(index)}>
                    <boxGeometry attach="geometry" args={[3, 3, 3]} />
                    <meshStandardMaterial
                      attach="material"
                      color={position.color}
                      transparent
                      opacity={0.7}
                    />
                  </mesh>
                  <Edges position={[0, 0, 0]} />
                </group>
              ))}
            />
          </div>
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
          {orbitControlsEnabled ? "Disable OrbitControls" : "Enable OrbitControls"}
        </button>
      </div>
    </>
  );
}

export default Scene;
