import * as THREE from 'three';
import { ObjectLoader } from 'three';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0xfffff0,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const sunlight = new THREE.DirectionalLight();
sunlight.position.y= 2;
scene.add(sunlight);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.002;
  cube.rotation.y += 0.002;
  renderer.render(scene, camera);
}
animate();



function handleWindowResize() {
  camera.aspect = window.innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize);