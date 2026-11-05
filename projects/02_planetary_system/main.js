import * as THREE from "three";
import * as utils from "../../utils";

import DATA from "./data.json";
import { config } from "./config";

// --------------------------------------------------------
// ORBIT CONSTRUCTION
// 1. Define ellipse parameters: `radiusX`, `radiusZ` and `speed`
// 2. Create a ellipse curve using `THREE.EllipseCurve`
// 3. Get points from the ellipse curve
// 4. Create 3D points using the points and vector3
// 5. Get path geometry using the 3D points
// 6. Define the line basic material
// 7. Create the path using line loop
// 8. Add moving animation on the planet using the ellipse equations
//    - x = a * cos(t)
//    - z = b * sin(t)
// 9. Enable antialias on the WebGLRenderer
// --------------------------------------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 40, 40);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight - 1);
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffcc, 0.4);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 5, 2);
scene.add(light);

utils.controller(camera, renderer.domElement, { min: 10, max: 100 });

const { radiusX, radiusZ, speed, scale, factor } = config;

function createOrbit(radiusX, radiusZ) {
  const curve = new THREE.EllipseCurve(
    0,
    0,
    radiusX,
    radiusZ,
    0,
    2 * Math.PI,
    false,
    0,
  );
  const points = curve.getPoints(128);
  const points3D = points.map((p) => new THREE.Vector3(p.x, 0, p.y));
  const geometry = new THREE.BufferGeometry().setFromPoints(points3D);
  const material = new THREE.LineBasicMaterial({
    color: 0x888888,
    opacity: 0.5,
    transparent: true,
  });
  const path = new THREE.LineLoop(geometry, material);
  return path;
}

function createPlanet(radius = 0.5, color = "#bcbcbc", roughness, metalness) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: roughness ?? 0.2,
    metalness: metalness ?? 0.1,
  });
  const planet = new THREE.Mesh(geometry, material);
  return planet;
}

const planets = {};
for (const [name, planet] of Object.entries(DATA)) {
  const rX = radiusX * planet.au * scale;
  const rZ = radiusZ * planet.au * scale;
  const orbit = createOrbit(rX, rZ);
  scene.add(orbit);

  const _planet = createPlanet(
    planet.radiusRatio * factor,
    planet.color,
    planet.roughness,
    planet.metalness,
  );
  planets[name] = _planet;
  scene.add(_planet);
}

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const elapsedTime = clock.getElapsedTime();

  for (const [name, planet] of Object.entries(DATA)) {
    const angle = elapsedTime * planet.speed * speed;

    const x = Math.cos(angle) * radiusX * planet.au;
    const z = Math.sin(angle) * radiusZ * planet.au;
    planets[name].position.set(x, 0, z);
  }

  renderer.render(scene, camera);
}

animate();
