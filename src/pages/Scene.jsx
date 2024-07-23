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

const Edges = ({ position, scale }) => {
  const boxGeometry = new THREE.BoxGeometry(scale[0], scale[1], scale[2]);
  const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
  const lines = new THREE.LineSegments(
    edgesGeometry,
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 })
  );

  return <primitive object={lines} position={position} />;
};  

const Sphere = ({ position, onClick }) => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 16);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const sphere = new THREE.Mesh(geometry, material);
  return <primitive object={sphere} position={position} onClick={onClick} />;
};

const FirstView = ({ elements, position }) => {
  let sBoxCoord = [0, 0, 5];
  console.log(position);
  if (position.length > 0) {
    const sBox = position[0]?.selectedBox ?? -1;
    if (sBox >= 0 && position[sBox]) {
      sBoxCoord = [
        position[sBox].position.cX,
        position[sBox].position.cY,
        position[sBox].position.cZ,
      ];
    }
  }

  console.log(position);
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
          position={[sBoxCoord[1], sBoxCoord[2], sBoxCoord[0] + 5]}
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
  let sBoxCoord = [0, 0, 5];
  console.log(position);
  if (position.length > 0) {
    const sBox = position[0]?.selectedBox ?? -1;
    if (sBox >= 0 && position[sBox]) {
      sBoxCoord = [
        position[sBox].position.cX,
        position[sBox].position.cY,
        position[sBox].position.cZ,
      ];
    }
  }

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
          position={[sBoxCoord[0], sBoxCoord[2], -sBoxCoord[1] + 5]}
          near={0.1}
          far={1000}
        />
      </group>
      <PCDLoaderComponent />
      {elements}
    </Canvas>
  );
};

const ThirdView = ({ elements, position }) => {
  let sBoxCoord = [0, 0, 5];
  console.log(position);
  if (position.length > 0) {
    const sBox = position[0]?.selectedBox ?? -1;
    if (sBox >= 0 && position[sBox]) {
      sBoxCoord = [
        position[sBox].position.cX,
        position[sBox].position.cY,
        position[sBox].position.cZ,
      ];
    }
  }

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
          position={[sBoxCoord[0], sBoxCoord[1], sBoxCoord[2] + 5]}
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
  const [move, setMove] = useState(false);
  const [edit, setEdit] = useState(false);

  //Coordinates
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);
  const [coordX1, setCoordX1] = useState(0);
  const [coordY1, setCoordY1] = useState(0);
  const [coordZ1, setCoordZ1] = useState(0);

  const editObject = () => {
    setEdit(!edit);
    console.log(edit);
  };

  const toggleControls = () => {
    setOrbitControlsEnabled(!orbitControlsEnabled);
  };

  const getCoordinates = (event) => {
    if (edit === false) {
      console.log(event.clientX, event.nativeEvent.offsetX);
      setCoordX(event.nativeEvent.offsetX);
      setCoordY(event.nativeEvent.offsetY);
      let newPositions = [...boxPositions];
      setCoordX1(newPositions[selectedBox].x);
      setCoordY1(newPositions[selectedBox].y);
      setCoordZ1(newPositions[selectedBox].z);
      setMove(true);
    }
  };

  const getCoordinates1 = (event) => {
    if (move === true) {
      let x = event.nativeEvent.offsetX - coordX;
      let y = event.nativeEvent.offsetY - coordY;
      let newPositions = [...boxPositions];
      const screenId = event.currentTarget.id;
      console.log(screenId);

      switch (screenId) {
        case "screen1":
          newPositions[selectedBox] = {
            ...newPositions[selectedBox],
            y: coordY1 + x * 0.04,
            z: coordZ1 - y * 0.04,
          };
          break;
        case "screen2":
          newPositions[selectedBox] = {
            ...newPositions[selectedBox],
            x: coordX1 + x * 0.04,
            z: coordZ1 - y * 0.04,
          };
          break;
        case "screen3":
          newPositions[selectedBox] = {
            ...newPositions[selectedBox],
            x: coordX1 + x * 0.04,
            y: coordY1 - y * 0.04,
          };
          break;
        default:
          break;
      }
      setBoxPositions(newPositions);
      //setMove(false)
    }
  };

  const getCoordinates2 = () => {
    let newPositions = [...boxPositions];
    newPositions[selectedBox] = {
      ...newPositions[selectedBox],
      cX: newPositions[selectedBox].x,
      cY: newPositions[selectedBox].y,
      cZ: newPositions[selectedBox].z,
    };
    setBoxPositions(newPositions);
    setMove(false);
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
          return {
            ...position,
            color: position.color === "#E0736B" ? "#6BE092" : "#E0736B",
          };
        } else {
          return { ...position, color: (position.color = "#6BE092") };
        }
      });
    });
  };

  const buttonHandler = (event) => {
    const buttonId = event.target.id;
    let newPositions = [...boxPositions];
    console.log(newPositions);

    switch (buttonId) {
      case "forward-button":
        newPositions[selectedBox] = {
          ...newPositions[selectedBox],
          z: newPositions[selectedBox].z + 0.1,
        };
        break;
      case "right-button":
        newPositions[selectedBox] = {
          ...newPositions[selectedBox],
          x: newPositions[selectedBox].x + 0.1,
        };
        break;
      case "left-button":
        newPositions[selectedBox] = {
          ...newPositions[selectedBox],
          x: newPositions[selectedBox].x - 0.1,
        };
        break;
      case "back-button":
        newPositions[selectedBox] = {
          ...newPositions[selectedBox],
          z: newPositions[selectedBox].z - 0.1,
        };
        break;
      default:
        break;
    }
    setBoxPositions(newPositions);
  };

  const sizeHandler = () => {
    let newPositions = [...boxPositions];
    newPositions[selectedBox] = {
      ...newPositions[selectedBox],
      sX: newPositions[selectedBox].sX + 0.1,
    };
    setBoxPositions(newPositions);
    console.log(boxPositions);
  };

  const createObject = () => {
    const newPosition = {
      x: 0,
      y: 0,
      z: 0,
      sX: 3,
      sY: 3,
      sZ: 3,
      cX: 0,
      cY: 0,
      cZ: 0,
      color: "#6BE092",
    };
    setBoxPositions((prevPositions) => [...prevPositions, newPosition]);
  };

  const test = (event) => {
    const ID = event.object.id;
    console.log(ID);
    //setMove(true)
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
              <group
                key={index}
                position={[position.x, position.y, position.z]}
              >
                <mesh onClick={() => clickHandler(index)}>
                  <boxGeometry
                    attach="geometry"
                    args={[position.sX, position.sY, position.sZ]}
                  />
                  <meshStandardMaterial
                    attach="material"
                    color={position.color}
                    transparent
                    opacity={0.7}
                  />
                </mesh>
                <Edges
                  position={[0, 0, 0]}
                  scale={[position.sX, position.sY, position.sZ]}
                />
              </group>
            ))}
          </Canvas>
        </div>
        <div className="side-container">
          <div
            className="side-class"
            id="screen1"
            onMouseDown={getCoordinates}
            onMouseMove={getCoordinates1}
            onMouseUp={getCoordinates2}
          >
            {/* Side View Screen 1*/}
            <FirstView
              elements={boxPositions.map((position, index) => (
                <group
                  key={index}
                  position={[position.x, position.y, position.z]}
                >
                  <mesh onClick={test}>
                    <boxGeometry
                      attach="geometry"
                      args={[position.sX, position.sY, position.sZ]}
                    />
                    <meshStandardMaterial
                      attach="material"
                      color={position.color}
                      transparent
                      opacity={0.7}
                    />
                  </mesh>
                  <Edges
                    position={[0, 0, 0]}
                    scale={[position.sX, position.sY, position.sZ]}
                  />
                </group>
              ))}
              position={boxPositions.map((position) => ({
                position,
                selectedBox,
              }))}
            />
          </div>
          <div
            className="side-class"
            id="screen2"
            onMouseDown={getCoordinates}
            onMouseMove={getCoordinates1}
            onMouseUp={getCoordinates2}
          >
            {/* Top View Screen2*/}
            <SecondView
              elements={boxPositions.map((position, index) => (
                <group
                  key={index}
                  position={[position.x, position.y, position.z]}
                >
                  <mesh>
                    <boxGeometry
                      attach="geometry"
                      args={[position.sX, position.sY, position.sZ]}
                    />
                    <meshStandardMaterial
                      attach="material"
                      color={position.color}
                      transparent
                      opacity={0.7}
                    />
                  </mesh>
                  <Edges
                    position={[0, 0, 0]}
                    scale={[position.sX, position.sY, position.sZ]}
                  />
                </group>
              ))}
              position={boxPositions.map((position) => ({
                position,
                selectedBox,
              }))}
            />
          </div>
          <div
            className="side-class"
            id="screen3"
            onMouseDown={getCoordinates}
            onMouseMoveCapture={getCoordinates1}
            onMouseUp={getCoordinates2}
          >
            {/* Front View Screen3*/}
            <ThirdView
              elements={boxPositions.map((position, index) => (
                <group
                  key={index}
                  position={[position.x, position.y, position.z]}
                >
                  <mesh>
                    <boxGeometry
                      attach="geometry"
                      args={[position.sX, position.sY, position.sZ]}
                    />
                    <meshStandardMaterial
                      attach="material"
                      color={position.color}
                      transparent
                      opacity={0.7}
                    />
                  </mesh>
                  <Edges
                    position={[0, 0, 0]}
                    scale={[position.sX, position.sY, position.sz]}
                  />
                  <Sphere
                    onClick={test}
                    id="top-right"
                    position={[
                      position.sX / 2,
                      position.sY / 2,
                      position.sZ / 2,
                    ]}
                  />
                  <Sphere
                    position={[
                      position.sX / 2,
                      -position.sY / 2,
                      position.sZ / 2,
                    ]}
                  />
                  <Sphere
                    position={[
                      -position.sX / 2,
                      position.sY / 2,
                      position.sZ / 2,
                    ]}
                  />
                  <Sphere
                    position={[
                      -position.sX / 2,
                      -position.sY / 2,
                      position.sZ / 2,
                    ]}
                  />
                </group>
              ))}
              position={boxPositions.map((position) => ({
                position,
                selectedBox,
              }))}
            />
          </div>
        </div>
        <button onClick={createObject}>Create</button>
        <button onClick={editObject}>Edit</button>
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
        <button onClick={sizeHandler}>Size</button>
        <button onClick={toggleControls}>
          {orbitControlsEnabled
            ? "Disable OrbitControls"
            : "Enable OrbitControls"}
        </button>
      </div>
    </>
  );
}

export default Scene;
