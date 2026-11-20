import * as THREE from "three";
import * as utils from "../../utils";
import * as xutils from "../../utils.extra";

import DATA from "./data";

export const config = {
  radiusX: 5,
  radiusZ: 3.5,
  scale: 1,
  factor: 0.5,
  speed: 1.5,
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x030712);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 90, 140);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight - 1);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffcc, 0.4);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(2, 5, 2);
scene.add(light);

const controls = utils.controller(camera, renderer.domElement, {
  min: 10,
  max: 250,
});

const { radiusX, radiusZ, speed, scale, factor } = config;

function createSystem() {
  const planetSystems = {};

  for (const [name, planet] of Object.entries(DATA)) {
    const rX = radiusX * planet.au * scale;
    const rZ = radiusZ * planet.au * scale;
    const orbit = xutils.createOrbit(rX, rZ);
    scene.add(orbit);

    const planetRadius = planet.radiusRatio * factor;
    const planetMesh = xutils.createPlanet(
      planetRadius,
      planet.color,
      planet.roughness,
      planet.metalness,
    );
    const root = new THREE.Group();
    root.add(planetMesh);

    const ringSystem = planet.rings.length
      ? xutils.createPlanetaryRingSystem(planet.rings, {
          planetRadius,
          tilt: THREE.MathUtils.degToRad(planet.ringTilt ?? 0),
        })
      : null;

    if (ringSystem) root.add(ringSystem.group);

    planetSystems[name] = { root, ringSystem, rX, rZ };
    scene.add(root);
  }

  return function play(elapsedTime, delta) {
    for (const [name, planet] of Object.entries(DATA)) {
      const angle = elapsedTime * planet.speed * speed;
      const planetSystem = planetSystems[name];

      const x = Math.cos(angle) * planetSystem.rX;
      const z = Math.sin(angle) * planetSystem.rZ;
      planetSystem.root.position.set(x, 0, z);
      planetSystem.ringSystem?.rotate(delta);
    }
  };
}

const system = createSystem();

const clock = new THREE.Clock();
let elapsedTime = 0;

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  elapsedTime += delta;

  system(elapsedTime, delta);
  controls.update();

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight - 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
