import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(3);
axesHelper.rotateX(Math.PI / 6);

const gridHelper = new THREE.GridHelper(5, 10);
gridHelper.rotateX(Math.PI / 6);

scene.add(axesHelper);
scene.add(gridHelper);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight - 1);

document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 2;
controls.minDistance = 2;
controls.maxDistance = 8;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(3, 3, 3);
scene.add(light);

const geometry = new THREE.BoxGeometry();

const material1 = new THREE.MeshStandardMaterial({
  color: 0xbc0022,
  roughness: 0.8,
  metalness: 0,
});
const material2 = new THREE.MeshStandardMaterial({
  color: 0xbc0022,
  roughness: 0.2,
  metalness: 1,
});
const material3 = new THREE.MeshStandardMaterial({
  color: 0xbc0022,
  roughness: 1,
  metalness: 0,
});

const cube1 = new THREE.Mesh(geometry, material1);
const cube2 = new THREE.Mesh(geometry, material2);
const cube3 = new THREE.Mesh(geometry, material3);
cube1.rotateX(Math.PI / 6);
cube2.rotateX(Math.PI / 6);
cube2.position.set(1, 1, -2);
cube3.rotateX(Math.PI / 6);
cube3.position.set(-1, 1, -2);

scene.add(cube1, cube2, cube3);

camera.position.z = 5;

const clock = new THREE.Clock();

function update(delta) {
  cube1.rotation.y += delta * 2;
  cube2.rotation.y += delta * 2;
  cube3.rotation.y += delta * 2;

  //   controls.update();
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  update(delta);

  render();
}

animate();
