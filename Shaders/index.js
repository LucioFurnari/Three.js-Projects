import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const w = window.innerWidth;
const h = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

renderer.render(scene, camera);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// Directional light
const light = new THREE.DirectionalLight( 0xffffff, 10);
scene.add(light);

// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);


// ---------------------------------------------------------------- //

// Create spheres
const s1 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({color: 0xFFFFF})
);

s1.castShadow = true;
s1.position.set(-10, 5, 0);
scene.add(s1);

const s2 = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({color: 0xFFFFF})
);

s2.castShadow = true;
s2.position.set(10, 5, 0);
scene.add(s2);

// ---------------------------------------------------------------- //

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
animate();

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};

window.addEventListener( 'resize', onWindowResize, false );