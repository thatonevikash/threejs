## Orbit Controls

```javascript
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function controller(camera, domElement) {
  const controls = new OrbitControls(camera, domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;
  controls.minDistance = 2;
  controls.maxDistance = 8;

  return controls;
}

const controls = controller(camera, renderer.domElement);
```
