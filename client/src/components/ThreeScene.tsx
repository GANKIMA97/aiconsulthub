import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    let renderer: THREE.WebGLRenderer;
    try {
      // Check WebGL support
      if (!window.WebGLRenderingContext) {
        console.warn('WebGL is not supported in this environment');
        return;
      }

      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: 'low-power' // Prefer low power mode for better compatibility
      });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for better performance
      mountRef.current.appendChild(renderer.domElement);

      // Create neural network visualization
      const nodes: THREE.Mesh[] = [];
      const connections: THREE.Line[] = [];
      
      // Create nodes
      const nodeGeometry = new THREE.SphereGeometry(0.1, 32, 32);
      const nodeMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        emissive: 0x00ff88,
        emissiveIntensity: 0.5,
      });

      for (let i = 0; i < 50; i++) {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        nodes.push(node);
        scene.add(node);
      }

      // Create connections
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.3,
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (Math.random() > 0.9) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              nodes[i].position,
              nodes[j].position,
            ]);
            const line = new THREE.Line(geometry, lineMaterial);
            connections.push(line);
            scene.add(line);
          }
        }
      }

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x00ff88, 2);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      // Camera position
      camera.position.z = 15;

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        
        nodes.forEach((node) => {
          node.rotation.x += 0.001;
          node.rotation.y += 0.001;
        });

        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (renderer && mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
      };
    } catch (error) {
      console.error('Error initializing ThreeScene:', error);
      return undefined;
    }
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}
