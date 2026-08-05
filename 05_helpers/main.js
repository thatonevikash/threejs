import * as THREE from "three";

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(3);

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
renderer.setSize(window.innerWidth, window.innerHeight);

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

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  cube.rotation.y += delta * 2;

  renderer.render(scene, camera);
}

animate();
