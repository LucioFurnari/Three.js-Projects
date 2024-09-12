import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);


// Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040, 20);
scene.add(ambientLight);

// Directional Light
const sunLight = new THREE.DirectionalLight(0x404040, 100);
sunLight.castShadow = true;
scene.add(sunLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Add plane
const planeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.PlaneGeometry(10,10);
const plane = new THREE.Mesh(planeMesh, planeMat);
plane.receiveShadow = true;
plane.rotateX(-Math.PI * 0.5);
plane.position.y = -1
scene.add(plane)

// Add sphere
const sphereMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
});
const sphereMesh = new THREE.SphereGeometry(1);
const sphere = new THREE.Mesh(sphereMesh, sphereMat);
sphere.castShadow = true
sphere.position.y = 1
sphere.position.x = 2
scene.add(sphere);

// Add loader for 3d model (GLTF format)
const loader = new GLTFLoader();
loader.setPath('./assets/models/')
loader.load('scene.gltf', (gltf) => {
  gltf.scene.position.y = 0.2;
  gltf.scene.castShadow = true
  scene.add(gltf.scene);
  gltf.scene.traverse(child => {
    if (child.isObject3D ) child.castShadow = true
  })
}, undefined, (error) => {
  console.error(error)
})

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();


function handleWindowResize() {
  camera.aspect = window.innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize);