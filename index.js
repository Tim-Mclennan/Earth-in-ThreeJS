
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

