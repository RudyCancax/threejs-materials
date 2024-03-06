import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import GUI from 'lil-gui';

// DEBUG GUI
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures importations
const textureLoader = new THREE.TextureLoader();
const doorAlpha = textureLoader.load('./textures/door/alpha.jpg');
const doorAmbientOcclusion = textureLoader.load('./textures/door/ambientOcclusion.jpg');
const doorColor = textureLoader.load('./textures/door/color.jpg');
doorColor.colorSpace = THREE.SRGBColorSpace;
const doorHeight = textureLoader.load('./textures/door/height.jpg');
const doorMetalness = textureLoader.load('./textures/door/metalness.jpg');
const doorNormal = textureLoader.load('./textures/door/normal.jpg');
const doorRoughness = textureLoader.load('./textures/door/roughness.jpg');

const matcaps1 = textureLoader.load('./textures/matcaps/1.png');
matcaps1.colorSpace = THREE.SRGBColorSpace;
const matcaps2 = textureLoader.load('./textures/matcaps/2.png');
matcaps2.colorSpace = THREE.SRGBColorSpace;
const matcaps3 = textureLoader.load('./textures/matcaps/3.png');
matcaps3.colorSpace = THREE.SRGBColorSpace;
const matcaps4 = textureLoader.load('./textures/matcaps/4.png');
matcaps4.colorSpace = THREE.SRGBColorSpace;
const matcaps5 = textureLoader.load('./textures/matcaps/5.png');
matcaps5.colorSpace = THREE.SRGBColorSpace;
const matcaps6 = textureLoader.load('./textures/matcaps/6.png');
matcaps6.colorSpace = THREE.SRGBColorSpace;
const matcaps7 = textureLoader.load('./textures/matcaps/7.png');
matcaps7.colorSpace = THREE.SRGBColorSpace;
const matcaps8 = textureLoader.load('./textures/matcaps/8.png');
matcaps8.colorSpace = THREE.SRGBColorSpace;

const gradients3 = textureLoader.load('./textures/gradients/3.jpg');
const gradients5 = textureLoader.load('./textures/gradients/5.jpg');

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

/**
 * OJBECTs : Sphere, plane and torus
 */
const sphere = new THREE.SphereGeometry(1, 64, 64);
const plane = new THREE.PlaneGeometry(2, 2, 64, 64);
const torus = new THREE.TorusGeometry(0.5, 0.3, 64, 128);
// const material = new THREE.MeshBasicMaterial({map: doorColor});
// Basic material
// material.color = new THREE.Color('#2fe94f');
// material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.2;
// material.side = THREE.DoubleSide;

// Normal material
// const material = new THREE.MeshNormalMaterial({map: doorColor});

// // Mesh Mat Cap material
// const material = new THREE.MeshMatcapMaterial({map: matcaps8});

// Mesh Dept Material
// const material = new THREE.MeshDepthMaterial({map: matcaps8}); // Probably for shadows

// Mesh Lambert Material
// const material = new THREE.MeshLambertMaterial({map: matcaps8}); // uses lights so, we need to add a light

// Mesh Phong Material
// const material = new THREE.MeshPhongMaterial({map: matcaps3}); // uses lights, also can reflect the ligth
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// Mesh Toon Material
// gradients5.minFilter = THREE.NearestFilter;
// gradients5.magFilter = THREE.NearestFilter;

// // Mesh Standard Material
// const material = new THREE.MeshStandardMaterial(); // uses lights, also can reflect the ligth
// material.roughness = 1;
// material.metalness = 1;
// material.map = doorColor;
// material.aoMap = doorAmbientOcclusion;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeight;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalness;
// material.roughnessMap = doorRoughness;
// material.normalMap = doorNormal;
// material.transparent = true;
// material.alphaMap = doorAlpha;

// gui.add(material, 'metalness', 0, 1, 0.00001);
// gui.add(material, 'roughness', 0, 1, 0.00001);

// Mesh Physical Material
const material = new THREE.MeshPhysicalMaterial(); // uses lights, also can reflect the ligth
material.roughness = 0;
material.metalness = 0;
// material.map = doorColor;
// material.aoMap = doorAmbientOcclusion;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeight;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalness;
// material.roughnessMap = doorRoughness;
// material.normalMap = doorNormal;
// material.transparent = true;
// material.alphaMap = doorAlpha;

gui.add(material, 'metalness', 0, 1, 0.00001);
gui.add(material, 'roughness', 0, 1, 0.00001);
gui.add(material, 'clearcoat', 0, 1, 0.00001); // Physical Material propertie - COAT
gui.add(material, 'clearcoatRoughness', 0, 1, 0.00001); // Physical Material propertie  - COAT

gui.add(material, 'sheen', 0, 1, 0.00001); // Physical Material propertie - SHEEN
gui.add(material, 'sheenRoughness', 0, 1, 0.00001); // Physical Material propertie - SHEEN
gui.addColor(material, 'sheenColor'); // Physical Material propertie - SHEEN

gui.add(material, 'iridescence', 0, 1, 0.0001); // Physical Material propertie - IRIDESCENCE
gui.add(material, 'iridescenceIOR', 1, 2.333, 0.0001); // Physical Material propertie - IRIDESCENCE
gui.add(material.iridescenceThicknessRange, '0', 1, 1000, 1); // Physical Material propertie - IRIDESCENCE
gui.add(material.iridescenceThicknessRange, '1', 1, 1000, 1); // Physical Material propertie - IRIDESCENCE

gui.add(material, 'transmission', 0, 1, 0.0001); // Physical Material propertie - TRANSMISION
gui.add(material, 'ior', 1, 10, 0.0001); // Physical Material propertie - TRANSMISION
gui.add(material, 'thickness', 1, 10, 0.0001); // Physical Material propertie - TRANSMISION






/**
 * lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 1);
scene.add(ambientLight)
// Point ligth
const point = new THREE.PointLight('#ffffff', 30, 15);
point.position.x = 1;
point.position.y = 3;
point.position.z = 4;
scene.add(point);


/**
 * MAPS - Environment of scene
 */

const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/environmentMap/2k.hdr', (envMap)=> {
    console.log(envMap);
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = envMap;
    scene.environment = envMap;
});


const sphereMesh = new THREE.Mesh(sphere, material);
const planeMesh = new THREE.Mesh(plane, material);
const torusMesh = new THREE.Mesh(torus, material);
sphereMesh.position.x = -2;
torusMesh.position.x = 2;
scene.add(sphereMesh, planeMesh, torusMesh);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphereMesh.rotation.y = 0.1 * elapsedTime;
    planeMesh.rotation.y = 0.1 * elapsedTime;
    torusMesh.rotation.y = 0.1 * elapsedTime;
    
    sphereMesh.rotation.x = - 0.15 * elapsedTime;
    planeMesh.rotation.x = - 0.15 * elapsedTime;
    torusMesh.rotation.x = - 0.15 * elapsedTime;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()