## Helpers

```javascript
function helpers() {
  const helperAxes = new THREE.AxesHelper(3);
  const helperGrid = new THREE.GridHelper(5, 10);
  helperGrid.rotateX(Math.PI / 6);

  scene.add(helperAxes, helperGrid);
}

helpers();
```
