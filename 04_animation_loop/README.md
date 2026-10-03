## Animation loop

```js
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  // replace the box {element} with yours
  box.rotation.z += delta * 0.2;

  renderer.render(scene, camera);
}

animate();
```
