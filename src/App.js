import React from "react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Scene from "./pages/Scene";
import Lidar from "./pages/Lidar";
import "./App.css";

const App = () => {
  return (
    <div className="main-div">
      <div className="scene-class">
          <Scene />
      </div>
    </div>
  );
};

export default App;
