import React from "react";
import { useRef } from "react";
import { useLoader } from "react-three-fiber";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader.js";
import { Points, PointsMaterial } from "three";

const PCDLoaderComponent = () => {
  const pointsRef = useRef();
  const obj = useLoader(PCDLoader, "/a.pcd");

  const material = new PointsMaterial({ color: 0x00ff00, size: 0.1 });

  return (
    <>
      <points ref={pointsRef} scale={1}>
        <bufferGeometry attach="geometry" {...obj.geometry} />
        <pointsMaterial attach="material" {...material} />
      </points>
    </>
  );
};

export default PCDLoaderComponent;

