import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const clock = new THREE.Clock();

export function delta() {
  const delta = clock.getDelta();
  return delta;
}

export function helpers(scene) {
  if (!scene) return null;

  const axesHelper = new THREE.AxesHelper(3);
  axesHelper.rotateX(Math.PI / 6);

  const gridHelper = new THREE.GridHelper(5, 10);
  gridHelper.rotateX(Math.PI / 6);

  scene.add(axesHelper, gridHelper);
}

export function rotateX(element, delta, intensity = 1) {
  if (!element || !delta) return null;
  element.rotation.x += delta * intensity;
}

export function rotateY(element, delta, intensity = 1) {
  if (!element || !delta) return null;
  element.rotation.y += delta * intensity;
}

export function rotateZ(element, delta, intensity = 1) {
  if (!element || !delta) return null;
  element.rotation.z += delta * intensity;
}

export function scale(element, delta, intensity = 0.1) {
  if (!element || !delta) return null;

  element.scale.x += delta * intensity;
  element.scale.y += delta * intensity;
  element.scale.z += delta * intensity;
}

export function controller(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.minDistance = 2;
  controls.maxDistance = 8;

  return controls;
}
