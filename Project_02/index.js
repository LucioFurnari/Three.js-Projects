import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from './src/getStarfield.js';

const w = window.innerWidth;
const h = window.innerHeight;
// Create scene
const scene = new THREE.Scene();
// Create camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
// Create render instance
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Create group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 100;
scene.add(earthGroup);

// Create orbital controls
new OrbitControls(camera, renderer.domElement);

const loader = new THREE.TextureLoader();

const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
  map: loader.load('./textures/00_earthmap1k.jpg'),
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// Add stars
const stars = getStarfield({numStars: 2000});
scene.add(stars);

// Add light
// const hemiLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 4)
// scene.add(hemiLight);
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Create animation for frame
function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();