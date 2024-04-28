import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(50   ,50);
document.getElementById("tv").appendChild(renderer.domElement);



const ambientLight = new THREE.AmbientLight(0x341245, 4);

const loader = new GLTFLoader();
let object;


const animate = () => {
    requestAnimationFrame(animate);
  

  
    renderer.render(scene, camera);
  }

  animate();