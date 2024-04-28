import * as THREE from 'three';
import { Loader } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

var renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector('.webgl')
});

const loader = new THREE.TextureLoader();
const height = loader.load('img/heightMap.jpg');
const alpha = loader.load('img/alpha.png');

/* Fullscreen */
renderer.setSize(window.innerWidth, window.innerHeight);
/* Append to HTML */
document.getElementById("contact").appendChild(renderer.domElement);
var onRenderFcts = [];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(25, (window.innerWidth )/ window.innerHeight, 0.01, 1000);
/* Play around with camera positioning */

camera.position.z = 22;
camera.position.x = 0;
//const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.PlaneGeometry(14, 14, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 'white', side: THREE.DoubleSide, wireframe: true, displacementMap: height, alphaMap: alpha, transparent: true});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x = 180.9;
plane.position.y = -2;


const light = new THREE.AmbientLight(0xc50094, 1);
light.position.set(1, 1, 1);
scene.add(light);

document.addEventListener('mousemove', (event) => {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    camera.position.x = x;
    camera.position.y = y;
    camera.lookAt(scene.position);
    plane.material.displacementScale =  1.5 + y * 1.5;
});

const animate = () => {
    requestAnimationFrame(animate);

    plane.rotation.z += 0.001;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}   

animate();
