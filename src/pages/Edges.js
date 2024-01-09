import React from "react";
import * as THREE from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from "three";

const Edges = ({ position }) => {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const edgesGeometry = new THREE.EdgesGeometry(boxGeometry);
  const lines = new THREE.LineSegments(
    edgesGeometry,
    new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 3 })
  );

  return <primitive object={lines} position={position} />;
};

export default Edges;
