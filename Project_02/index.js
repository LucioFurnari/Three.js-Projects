import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});
const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

// Add light
const hemiLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 4)
scene.add(hemiLight);

function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.x += 0.001;
  earthMesh.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();