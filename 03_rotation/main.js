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
  color: 0xfac800,
});

const cube = new THREE.Mesh(geometry, material);

cube.position.set(0, 0, 1);
cube.rotation.set(0.5, 0.75, 0);
cube.scale.set(1, 1, 0.75);

scene.add(cube);

camera.position.z = 5;

renderer.render(scene, camera);
