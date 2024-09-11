import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);


const sunlight = new THREE.DirectionalLight();
sunlight.position.y= 2;
scene.add(sunlight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


const loader = new GLTFLoader();
loader.setPath('./assets/models/')
loader.load('scene.gltf', (gltf) => {
  scene.add(gltf.scene);
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