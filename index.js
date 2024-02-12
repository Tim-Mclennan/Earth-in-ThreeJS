import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

import getStarfield from "./src/getStarfield.js";
import { getFresnelMat } from "./src/getFresnelMat.js";

// Scene setup: 
// The following lines define the scene dimensions (w and h) and initialize the scene, camera, and renderer. 
// The camera is set to a perspective projection with specific field of view and near/far clipping planes, and its position is set along the Z-axis. 
// The renderer is configured for WebGL with anti-aliasing enabled and attached to the document body.
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Earth group creation: 
// I created a 'THREE.Group' instance named earthGroup here to hold all objects related to Earth, including the Earth sphere itself, its glow effect, and atmospheric effects. 
// The rotation of this group is adjusted to account for the tilt of the Earth's axis.
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);
new OrbitControls(camera, renderer.domElement);

// Textures loading:
// A THREE.TextureLoader instance is created to load textures for the Earth model, including the surface texture, specular map, bump map, and others for the glow and cloud effects.
const detail = 12;
const loader = new THREE.TextureLoader();

// Earth model creation: 
// A THREE.IcosahedronGeometry is created for the Earth sphere with a specified level of detail. 
// A THREE.MeshPhongMaterial is then applied to the geometry to give it a realistic appearance with lighting. 
// The material properties include maps for textures and bump scaling.
