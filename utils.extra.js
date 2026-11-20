import * as THREE from "three";

export function createPlanet(
  radius = 0.5,
  color = "#bcbcbc",
  roughness,
  metalness,
) {
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: roughness ?? 0.2,
    metalness: metalness ?? 0.1,
  });
  const planet = new THREE.Mesh(geometry, material);
  return planet;
}

export function createOrbit(radiusX, radiusZ) {
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

export function createPlanetaryRing(
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
    depthWrite: false,
    side: THREE.DoubleSide,
    ..._material,
  });
  const ring = new THREE.Mesh(geometry, material);
  return ring;
}

export function createPlanetaryRingSystem(
  data,
  { planetRadius = 1, tilt = 0 } = {},
) {
  const group = new THREE.Group();
  const rings = [];

  data.forEach((element, index) => {
    const innerRadius =
      element.innerRadiusRatio == null
        ? element.innerRadius
        : element.innerRadiusRatio * planetRadius;
    const outerRadius =
      element.outerRadiusRatio == null
        ? element.outerRadius
        : element.outerRadiusRatio * planetRadius;

    const ring = createPlanetaryRing(
      innerRadius,
      outerRadius,
      element.color,
      element.material,
    );
    rings[index] = ring;
    group.add(ring);
  });

  group.rotation.x = -Math.PI / 2 + tilt;

  function rotate(delta) {
    if (!delta) return;

    rings.forEach((ring, index) => {
      ring.rotation.z += delta * 0.8 * data[index].rotation;
    });
  }

  return { group, rings, rotate };
}
