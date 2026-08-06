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

const geometry = new THREE.BoxGeometry();

const material = new THREE.MeshBasicMaterial({
  color: 0xfac800,
});

const cube = new THREE.Mesh(geometry, material);
cube.rotateX(Math.PI / 6);

scene.add(cube);

camera.position.z = 5;

const clock = new THREE.Clock();

function update(delta) {
  cube.rotation.y += delta * 2;

  controls.update();
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
