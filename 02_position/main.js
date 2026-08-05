import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 2);

const material = new THREE.MeshBasicMaterial({
  color: 0xfa7800,
});

const cube1 = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material);
const cube3 = new THREE.Mesh(geometry, material);
const cube4 = new THREE.Mesh(geometry, material);

cube1.position.set(2, 0, 0);
cube2.position.x = -2;
cube3.position.y = 2;
cube4.position.y = -2;

scene.add(cube1, cube2, cube3, cube4);

camera.position.z = 5;

renderer.render(scene, camera);
