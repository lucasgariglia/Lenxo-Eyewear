import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

export const OpticalMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uMouse: new THREE.Vector2(0, 0),
    uScrollVelocity: 0,
    uResolution: new THREE.Vector2(0, 0),
    uImageResolution: new THREE.Vector2(0, 0),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uScrollVelocity;

    void main() {
      vUv = uv;
      vPosition = position;
      
      vec3 pos = position;
      
      // Subtle vertex lag based on scroll velocity (liquid effect)
      float lag = uScrollVelocity * 0.05;
      pos.y += sin(uv.x * 3.14) * lag;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    uniform vec2 uImageResolution;
    uniform float uScrollVelocity;
    
    varying vec2 vUv;

    // Chromatic aberration intensity
    const float CHROMATIC_ABBERATION = 0.02;

    void main() {
      // Cover logic (like CSS background-size: cover)
      vec2 ratio = vec2(
        min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
        min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
      );
      vec2 uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );

      // Distortion based on velocity
      float distortion = uScrollVelocity * 0.1;
      vec2 distortedUv = uv;
      distortedUv.y -= distortion * (uv.x - 0.5);

      // RGB Split
      float r = texture2D(uTexture, distortedUv + vec2(CHROMATIC_ABBERATION * uScrollVelocity, 0.0)).r;
      float g = texture2D(uTexture, distortedUv).g;
      float b = texture2D(uTexture, distortedUv - vec2(CHROMATIC_ABBERATION * uScrollVelocity, 0.0)).b;

      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
);

extend({ OpticalMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      opticalMaterial: any;
    }
  }
}
