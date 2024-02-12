import * as THREE from "three";

// The provided function  creates a custom material in Three.js using a shader program. Creates a Fresnel effect.

// It takes an optional parameter object with rimHex and facingHex properties, both defaulting to hexadecimal color codes. 
// These colors represent the rim color of the Fresnel effect and the color facing the viewer.
function getFresnelMat({rimHex = 0x0088ff, facingHex = 0x000000} = {}) {

  // uniforms: 
  // This object is defined to hold the parameters that will be passed to the shader programs. 
  // These include the two colors and values for the Fresnel bias, scale, and power, which control the intensity and spread of the Fresnel effect.
  const uniforms = {
    color1: { value: new THREE.Color(rimHex) },
    color2: { value: new THREE.Color(facingHex) },
    fresnelBias: { value: 0.1 },
    fresnelScale: { value: 1.0 },
    fresnelPower: { value: 4.0 },
  };

  // The vertex shader (vs) is responsible for transforming the vertices of the mesh. 
  // It calculates the reflection factor based on the angle between the view direction and the surface normal. 
  // This reflection factor is passed to the fragment shader as a varying variable vReflectionFactor. 
  const vs = `
  uniform float fresnelBias;
  uniform float fresnelScale;
  uniform float fresnelPower;
  
  varying float vReflectionFactor;
  
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  
    vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );
  
    vec3 I = worldPosition.xyz - cameraPosition;
  
    vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );
  
    gl_Position = projectionMatrix * mvPosition;
  }
  `;

  // Fragment Shader: 
  // The fragment shader (fs) interpolates between the two colors based on the reflection factor calculated in the vertex shader. 
  // The clamp function ensures that the reflection factor stays within the range.
  const fs = `
  uniform vec3 color1;
  uniform vec3 color2;
  
  varying float vReflectionFactor;
  
  void main() {
    float f = clamp( vReflectionFactor, 0.0, 1.0 );
    gl_FragColor = vec4(mix(color2, color1, vec3(f)), f);
  }
  `;

  // Shader Material: 
  // A new THREE.ShaderMaterial is created with the uniforms and shader code. 
  // The material is set to be transparent and uses additive blending, which means that the colors of the object and the background are added together to produce the final color 1.
  const fresnelMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vs,
    fragmentShader: fs,
    transparent: true,
    blending: THREE.AdditiveBlending,
    // wireframe: true,
  });
  return fresnelMat;
}
export { getFresnelMat };