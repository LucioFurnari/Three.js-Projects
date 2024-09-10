import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from './src/getStarfield.js';
import { getFresnelMat } from "./src/getFresnelMat.js";

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

// Create geometry and material
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
  map: loader.load('./textures/00_earthmap1k.jpg'),
});
// Create earth mesh
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

// Create earth lights material and mesh
const lightsMat = new THREE.MeshStandardMaterial( {
  map: loader.load('./textures/03_earthlights1k.jpg'),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

// Create earth clouds material and mesh
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load('./textures/04_earthcloudmap.jpg'),
  blending: THREE.AdditiveBlending,
  transparent: true,
  opacity: 0.8
});
const cloudMesh = new THREE.Mesh(geometry, cloudsMat);
cloudMesh.scale.setScalar(1.003);
earthGroup.add(cloudMesh);

// Add shader material
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01)
earthGroup.add(glowMesh)

// Add stars
const stars = getStarfield({numStars: 2000});
scene.add(stars);

// Add light
const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

// Create animation for frame
function animate() {
  requestAnimationFrame(animate);

  earthMesh.rotation.y += 0.002;
  lightsMesh.rotation.y += 0.002;
  cloudMesh.rotation.y += 0.0023;
  glowMesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}

animate();