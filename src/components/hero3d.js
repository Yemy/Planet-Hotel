import * as THREE from 'three';

export function initHero3D() {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Object: Golden Planet (Wireframe Sphere)
  const geometry = new THREE.IcosahedronGeometry(2, 4); // Detail level 4
  const material = new THREE.MeshBasicMaterial({ 
    color: 0xd4af37, // Gold
    wireframe: true, 
    transparent: true, 
    opacity: 0.3 
  });
  const sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Inner Glow Sphere (Subtle)
  const innerGeo = new THREE.SphereGeometry(1.8, 32, 32);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.8
  });
  const innerSphere = new THREE.Mesh(innerGeo, innerMat);
  scene.add(innerSphere);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 500;
  const posArray = new Float32Array(particlesCount * 3);

  for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xf7e7ce, // Champagne
    transparent: true,
    opacity: 0.5
  });
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Animation Loop
  let mouseX = 0;
  let mouseY = 0;

  function animate() {
    requestAnimationFrame(animate);

    // Rotation
    sphere.rotation.y += 0.002;
    sphere.rotation.x += 0.001;
    particlesMesh.rotation.y -= 0.0005;

    // Mouse Parallax (Subtle)
    sphere.rotation.y += mouseX * 0.05;
    sphere.rotation.x += mouseY * 0.05;

    renderer.render(scene, camera);
  }
  animate();

  // Event Listeners
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 0.2; // Normalize
    mouseY = (event.clientY / window.innerHeight - 0.5) * 0.2;
  });
}
