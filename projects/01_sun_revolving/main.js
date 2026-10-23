import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 1);

document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffcc, 0.2);
scene.add(ambientLight);
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(4, 4, 4);
scene.add(light);

const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({
  color: 0x0aad39,
  roughness: 0.2,
  metalness: 0,
});

const planet = new THREE.Mesh(geometry, material);
scene.add(planet);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();
  const radius = 5;
  const speed = 2;

  light.position.x = Math.cos(elapsedTime * speed) * radius;
  light.position.z = Math.sin(elapsedTime * speed) * radius;

  renderer.render(scene, camera);
}

animate();
