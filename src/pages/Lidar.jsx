import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PCDLoader } from 'three/addons/loaders/PCDLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Lidar = () => {
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const sceneRef = useRef(new THREE.Scene());
  const camera1Ref = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const camera2Ref = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const rendererRef = useRef(new THREE.WebGLRenderer());
  const controls1Ref = useRef(new OrbitControls(camera1Ref.current, rendererRef.current.domElement));
  const controls2Ref = useRef(new OrbitControls(camera2Ref.current, rendererRef.current.domElement));

  useEffect(() => {
    const container = containerRef.current;
    const scene = sceneRef.current;
    const camera1 = camera1Ref.current;
    const camera2 = camera2Ref.current;
    const renderer = rendererRef.current;
    const controls1 = controls1Ref.current;
    const controls2 = controls2Ref.current;

    // Set up camera positions
    camera1.position.set(0, 0, 5);
    camera2.position.set(5, 0, 0);

    // Set up renderer
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Set up controls
    controls1.enableDamping = true;
    controls1.dampingFactor = 0.25;
    controls1.screenSpacePanning = true;
    controls1.maxPolarAngle = Math.PI / 2;

    controls2.enableDamping = true;
    controls2.dampingFactor = 0.25;
    controls2.screenSpacePanning = true;
    controls2.maxPolarAngle = Math.PI / 2;

    // Handle window resizing
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera1.aspect = newWidth / newHeight;
      camera1.updateProjectionMatrix();

      camera2.aspect = newWidth / newHeight;
      camera2.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Handle WebGL context loss
    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn('WebGL context lost. Attempting to restore...');
      // Handle context loss, e.g., reset resources, recreate WebGL state
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored. Resuming rendering...');
      // Handle context restoration, e.g., reload resources, recreate WebGL state
    };

    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls
      controls1.update();
      controls2.update();

      // Render the scene from camera 1
      renderer.setViewport(0, 0, container.clientWidth / 2, container.clientHeight);
      renderer.setScissor(0, 0, container.clientWidth / 2, container.clientHeight);
      renderer.setScissorTest(true);
      renderer.render(scene, camera1);

      // Render the scene from camera 2
      renderer.setViewport(container.clientWidth / 2, 0, container.clientWidth / 2, container.clientHeight);
      renderer.setScissor(container.clientWidth / 2, 0, container.clientWidth / 2, container.clientHeight);
      renderer.setScissorTest(true);
      renderer.render(scene, camera2);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const loader = new PCDLoader();
      loader.load(URL.createObjectURL(file), (points) => {
        sceneRef.current.add(points);
      });
    }
  };

  return (
    <div>
      <div ref={containerRef}></div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} />
    </div>
  );
};

export default Lidar;
