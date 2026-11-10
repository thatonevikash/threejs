import * as THREE from "three";
import * as utils from "../../utils";
import * as xutils from "../../utils.extra";

import data from "./data.json";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 8, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight - 1);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffcc, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 4);
light.position.set(2, 5, 2);
scene.add(light);

utils.controller(camera, renderer.domElement, {
  min: 10,
  max: 20,
});

// utils.helpers(scene);

const planet = xutils.createPlanet(2, "#6f960b");
scene.add(planet);

function createPlaneteryRing(
  innerRadius = 2,
  outerRadius = 3,
  color = "#b2a000",
  _material = {},
) {
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 128);
  const material = new THREE.MeshStandardMaterial({
    color,
    opacity: 0.32,
    transparent: true,
    side: THREE.DoubleSide,
    ..._material,
  });
  const ring = new THREE.Mesh(geometry, material);
  return ring;
}

function createRings(data) {
  const rings = [];

  data.forEach((element, index) => {
    const ring = createPlaneteryRing(
      element.innerRadius,
      element.outerRadius,
      element.color,
      element.material,
    );
    ring.rotation.x = (-Math.PI * 2) / 3;
    rings[index] = ring;
    scene.add(ring);
  });

  function rotate(delta) {
    if (!delta) return;

    rings.forEach((ring, index) => {
      ring.rotation.z += delta * 0.8 * data[index].rotation;
    });
  }

  return { rings, rotate };
}

const rings = createRings(data);

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  rings.rotate(delta);

  renderer.render(scene, camera);
}

animate();
