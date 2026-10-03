import * as THREE from "three";
import * as utils from "../utils";

const scene = new THREE.Scene();

utils.helpers(scene);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 1);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshBasicMaterial({
  color: 0xfac800,
});

const cube = new THREE.Mesh(geometry, material);

cube.rotateX(Math.PI / 6);

scene.add(cube);

camera.position.z = 5;

const clock = new THREE.Clock();

function scale(element, delta, intensity = 0.1) {
  if (!element || !delta) return null;

  element.scale.x += delta * intensity;
  element.scale.y += delta * intensity;
  element.scale.z += delta * intensity;
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  scale(cube, delta, -1);

  cube.rotation.y += delta * 2;

  renderer.render(scene, camera);
}

animate();
