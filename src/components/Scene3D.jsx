import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D({ mousePosition }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const moonRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00d4ff, 1, 100);
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);
    const rimLight = new THREE.PointLight(0xff6633, 2, 20);
rimLight.position.set(3, -2, 4);
scene.add(rimLight);

    // Create Moon with detailed texture
    const moonGeometry = new THREE.IcosahedronGeometry(1, 32);
    
    // Create canvas texture for moon surface
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    // Moon surface
// Base mars color
const marsGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
marsGradient.addColorStop(0, '#5c1f12');
marsGradient.addColorStop(0.5, '#a63d1a');
marsGradient.addColorStop(1, '#d96b2b');

ctx.fillStyle = marsGradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add craters
for (let i = 0; i < 250; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 40 + 5;

  const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

  const colors = [
    'rgba(255,140,80,0.4)',
    'rgba(120,40,20,0.35)',
    'rgba(255,180,120,0.25)'
  ];

  gradient.addColorStop(0, colors[Math.floor(Math.random() * colors.length)]);
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

    const texture = new THREE.CanvasTexture(canvas);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();    
const moonMaterial = new THREE.MeshStandardMaterial({
  map: texture,
  roughness: 0.9,
  metalness: 0.05,
  emissive: 0x220000,
  emissiveIntensity: 0.15,
});

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moonRef.current = moon;
    scene.add(moon);

    // Add glow effect
    const glowGeometry = new THREE.IcosahedronGeometry(1.05, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.15,
      wireframe: false,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    moon.add(glow);

    // Orbit line
    const orbitGeometry = new THREE.BufferGeometry();
    const orbitPoints = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      const x = Math.cos(angle) * 2;
      const y = Math.sin(angle) * 2;
      orbitPoints.push(x, y, 0);
    }
    orbitGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(orbitPoints), 3));

    const orbitMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.2,
      linewidth: 1,
    });
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitRef.current = orbit;
    scene.add(orbit);

    // Particles around moon
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 3 + 1.5;
      const height = (Math.random() - 0.5) * 2;

      particlePositions[i * 3] = Math.cos(angle) * distance;
      particlePositions[i * 3 + 1] = height;
      particlePositions[i * 3 + 2] = Math.sin(angle) * distance;
      particleSizes[i] = Math.random() * 2 + 0.5;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      targetRotationX = (e.clientY / window.innerHeight) * 0.5 - 0.25;
      targetRotationY = (e.clientX / window.innerWidth) * 0.5 - 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationId;
    let time = 0;

    const animate = () => {
      time += 0.001;
      animationId = requestAnimationFrame(animate);

      // Moon rotation
      moon.rotation.x += 0.0005;
      moon.rotation.y += 0.0008;

      // Smooth mouse tracking
      moon.rotation.x += (targetRotationX - moon.rotation.x) * 0.1;
      moon.rotation.y += (targetRotationY - moon.rotation.y) * 0.1;

      // Orbit rotation
      if (orbitRef.current) {
        orbitRef.current.rotation.z += 0.0002;
      }

      // Particle animation
      if (particles) {
        particles.rotation.z += 0.0003;
        const positions = particleGeometry.getAttribute('position').array;
        for (let i = 0; i < particleCount; i++) {
          const x = particlePositions[i * 3];
          const y = particlePositions[i * 3 + 1];
          const z = particlePositions[i * 3 + 2];
          
          const angle = Math.atan2(z, x);
          const distance = Math.sqrt(x * x + z * z);
          
          positions[i * 3] = Math.cos(angle + time * 0.3) * distance;
          positions[i * 3 + 1] = y + Math.sin(time * 0.5 + i) * 0.1;
          positions[i * 3 + 2] = Math.sin(angle + time * 0.3) * distance;
        }
        particleGeometry.getAttribute('position').needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-screen" />;
}