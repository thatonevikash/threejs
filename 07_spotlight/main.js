import * as THREE from "three";

import * as utils from "../utils";

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

const ambientLight = new THREE.AmbientLight(0xffffcc, 0.08);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xf0f0f0, 10, 4, Math.PI / 6);
spotLight.position.set(2, 2, 2);
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

utils.controller(camera, renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshStandardMaterial({
  color: 0x451b78,
  roughness: 0.2,
  metalness: 0.1,
});
const element = new THREE.Mesh(geometry, material);
scene.add(element);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
