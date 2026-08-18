## THREE JS

Hello,<br />
I'm **Vikash Kumar**.

In this repo, I am documenting the concepts of _threejs_!

## Installation

```bash
npm init -y

npm install three

npm install -D vite@5.4.11
```

> ![NOTE]
> `vite@^6.x.x` is not well compatible with standalone `vite` development.

```bash
touch index.html main.js
```

```html
<!-- index.html -->

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>threejs</title>

    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: "hidden";
      }
    </style>
  </head>
  <body>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```

```js
// main.js

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

const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;

renderer.render(scene, camera);
```

Read 👇

## Chapters

- Basic
- Position
- Rotation
- Animation Loop
- Helpers
- Orbit Controls
- Lights & Materials
- Shadows
