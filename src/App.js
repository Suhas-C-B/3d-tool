import React from "react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Scene from "./pages/Scene";
import Scene2 from "./pages/Scene2";
import Lidar from "./pages/Lidar";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="main-div">
        <Scene />
      </div>
    </Router>
  );
};

export default App;
