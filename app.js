import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';

import vertexShader from './shaders/vertex.js';
import fragmentShader from './shaders/fragment.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';



let canvas = document.querySelector("#canvas");

// Scene
let scene = new THREE.Scene();

// Renderer
let gl = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
gl.outputEncoding = THREE.sRGBEncoding;

// Camera
let width = window.innerWidth;
let height = window.innerHeight;

let camera = new THREE.PerspectiveCamera(75, width / height, 0.01, 100);
camera.position.z = 2.5;
// camera.position.x = 2.5;
camera.lookAt(0, 0, 0)
scene.add(camera);
window.addEventListener("resize", () => {
  // Update
  width = window.innerWidth;
  height = window.innerHeight;

  // Update camera
  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  // Update renderer
  gl.setSize(width, height);
  gl.setPixelRatio(window.devicePixelRatio);
});

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.3, 1000, 1000),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    wireframe: false,
    uniforms: {
      uTime: { value: 0 },
    },
  })
);

scene.add(torus);

let composer = new EffectComposer(gl);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.3, 0.001, 0.01);
composer.addPass(bloomPass);

const clock = new THREE.Clock();

let animate = () => {
  const elapsedTime = clock.getElapsedTime();
  torus.material.uniforms.uTime.value = elapsedTime;
  composer.render();
  requestAnimationFrame(animate);
};

animate();
