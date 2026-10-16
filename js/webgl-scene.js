/* ==========================================================================
   THREE.JS 3D LIQUID GLASS & ORBITAL SCENE
   ========================================================================== */
(function () {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 8.2;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Multi-point specular lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00f2fe, 4.2, 28);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xff007f, 4.0, 28);
  pointLight2.position.set(-5, -4, 3);
  scene.add(pointLight2);

  const pointLight3 = new THREE.PointLight(0x8a2be2, 3.8, 28);
  pointLight3.position.set(0, 6, -5);
  scene.add(pointLight3);

  // Central Deforming Liquid Glass Core
  const geometry = new THREE.IcosahedronGeometry(1.85, 64);
  const originalPositions = geometry.attributes.position.array.slice();

  const material = new THREE.MeshPhysicalMaterial({
    color: 0x0b132b,
    metalness: 0.35,
    roughness: 0.07,
    transmission: 0.68,
    transparent: true,
    opacity: 0.92,
    ior: 1.48,
    reflectivity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05
  });

  const liquidOrb = new THREE.Mesh(geometry, material);
  scene.add(liquidOrb);

  // Orbiting Secondary Liquid Droplets
  const droplets = [];
  const dropGeo = new THREE.SphereGeometry(0.26, 32, 32);
  for (let i = 0; i < 6; i++) {
    const dropMesh = new THREE.Mesh(dropGeo, material);
    scene.add(dropMesh);
    droplets.push({
      mesh: dropMesh,
      angle: (i / 6) * Math.PI * 2,
      radius: 3.1 + (i % 2) * 0.75,
      speed: 0.32 + i * 0.055,
      yOffset: (i - 2.5) * 0.6
    });
  }

  // Subtle Depth Starfield Particles
  const particleCount = 160;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 22;
    particlePositions[i + 1] = (Math.random() - 0.5) * 22;
    particlePositions[i + 2] = (Math.random() - 0.5) * 12 - 3;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x00f2fe,
    size: 0.035,
    transparent: true,
    opacity: 0.55
  });
  const starField = new THREE.Points(particleGeo, particleMat);
  scene.add(starField);

  // Pointer & Scroll State
  let mouseX = 0;
  let mouseY = 0;
  let scrollY = window.scrollY;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (document.hidden) return;

    const t = clock.getElapsedTime();
    const posAttr = geometry.attributes.position;
    const posArr = posAttr.array;

    for (let i = 0; i < posArr.length; i += 3) {
      const ox = originalPositions[i];
      const oy = originalPositions[i + 1];
      const oz = originalPositions[i + 2];

      const wave1 = Math.sin(ox * 2.2 + t * 1.55) * Math.cos(oy * 2.2 + t * 1.35);
      const wave2 = Math.sin(oz * 3.0 - t * 1.75) * 0.5;
      const displacement = 1 + (wave1 + wave2) * 0.14;

      posArr[i] = ox * displacement;
      posArr[i + 1] = oy * displacement;
      posArr[i + 2] = oz * displacement;
    }
    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();

    liquidOrb.rotation.x = t * 0.18 + scrollY * 0.0012 + mouseY * 0.35;
    liquidOrb.rotation.y = t * 0.26 + scrollY * 0.0015 + mouseX * 0.35;
    liquidOrb.position.x += (mouseX * 1.05 - liquidOrb.position.x) * 0.05;
    liquidOrb.position.y += (mouseY * 0.65 - liquidOrb.position.y) * 0.05;

    droplets.forEach((d, idx) => {
      const a = d.angle + t * d.speed;
      d.mesh.position.x = Math.cos(a) * d.radius + liquidOrb.position.x * 0.45;
      d.mesh.position.z = Math.sin(a) * d.radius - 1.0;
      d.mesh.position.y = Math.sin(t * 1.5 + idx) * 0.8 + d.yOffset;
    });

    starField.rotation.y = t * 0.025;
    starField.position.y = (scrollY * 0.0015) % 4;

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
