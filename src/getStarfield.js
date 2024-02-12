import * as THREE from "three";

// This function accepts an options object with a numStars property that defaults to 500 if not provided 
export default function getStarfield({ numStars = 500 } = {}) {

  // Random Sphere Point Function: 
  // Inside getStarfield, another function randomSpherePoint is defined, which calculates random positions within a sphere. 
  // These positions are used to place stars in the starfield. 
  // Each point is calculated using spherical coordinates and converted to Cartesian coordinates. 
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
      minDist: radius,
    };
  }

  // Vertices and Colors Arrays: 
  // Two arrays, verts and colors, are initialized to store the positions and colors of the stars. 
  // A positions array is also initialized to store the complete data for each star. 
  const verts = [];
  const colors = [];
  const positions = [];
  let col;

  // Star Generation Loop: 
  // A loop runs numStars times, generating a random position for each star using randomSpherePoint. 
  // It then assigns a color to each star, using a constant hue value of 0.6 and varying the lightness randomly. 
  // The position and color data are stored in the positions, verts, and colors arrays 3.
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    positions.push(p);
    col = new THREE.Color().setHSL(hue, 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }

  // BufferGeometry Creation: 
  // After generating all the star data, a THREE.BufferGeometry is created and populated with the vertex positions and colors using setAttribute. 
  // This geometry will be used to create the points for the starfield 3.
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  
  
  // Material Creation: 
  // A THREE.PointsMaterial is created with a size of 0.2 and vertex colors enabled. 
  // A texture map is loaded for the stars, which will determine their appearance. 
  // The size attribute specifies the size of the points, and the map attribute applies the texture to the points. 
  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load(
      "./textures/stars/circle.png"
    ),
  });

  // Points Object Creation: 
  // A THREE.Points object is created with the buffer geometry and material, which represents the entire starfield. 
  // This object is returned by the getStarfield function.
  const points = new THREE.Points(geo, mat);
  return points;
}