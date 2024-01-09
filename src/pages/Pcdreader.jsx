import React, { useRef } from "react";
import { PointCloud } from "three";
import { BufferGeometry, BufferAttribute, Points, PointsMaterial } from "three";
import { useLoader } from "react-three-fiber";
import { PCFSoftShadowMap } from "three";
import { PCDLoader } from "three/examples/jsm/loaders/PCDLoader.js";

const PCDLoaderComponent = () => {
  const pointsRef = useRef();
  const obj = useLoader(PCDLoader, "/a.pcd");

  return (
    <>
      <primitive object={obj} ref={pointsRef} scale={1} />
    </>
  );
};

export default PCDLoaderComponent;
