// import React, { Component } from "react";
// import * as THREE from "three";
// import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";

// import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";

// import LoadeObj from "./LoadeObj";
// import LoadeRoom from "./LoadeRoom";

// class Room extends Component {
//   componentDidMount() {
//     const width = this.mount.clientWidth;
//     const height = this.mount.clientHeight;
//     this.scene = new THREE.Scene();

//     //Add Renderer
//     this.renderer = new THREE.WebGLRenderer({ antialias: true });
//     this.renderer.setClearColor("#263238");
//     this.renderer.setSize(width, height);
//     this.mount.appendChild(this.renderer.domElement);

//     //add Camera
//     const fov = 70;
//     const aspect = window.innerWidth / window.innerHeight;
//     const near = 0.1;
//     const far = 1000.0;
//     this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     // this.camera.position.set(0, 300, 0);
//     this.camera.position.set(10, 20, -30);
//     this.camera.lookAt(0, 50, 150);

//     //Camera Controls
//     const controls = new PointerLockControls(
//       this.camera,
//       this.renderer.domElement
//     );
//     // controls.activeLook = true;
//     // // controls.movementSpeed = 1;
//     // controls.lookSpeed = 0.4;
//     // controls.movementSpeed = 20;
//     // controls.noFly = true;
//     // controls.lookVertical = true;
//     // controls.constrainVertical = true;
//     // controls.verticalMin = 1.0;
//     // controls.verticalMax = 2.0;
//     // controls.lon = -150;
//     // controls.lat = 120;
//     // controls.autoForward = true;

//     // controls.target.set(0, 0, 0);
//     // controls.listenToKeyEvents(window);

//     // controls.autoRotate = false;
//     // controls.keyPanSpeed = 10;
//     // controls.screenSpacePanning = false;

//     // controls.maxPolarAngle = 1.5;
//     // controls.minPolarAngle = 1.5;
//     // controls.maxAzimuthAngle = 3; //limit X roution
//     // controls.minAzimuthAngle = 0;

//     // controls.update(1);

//     //LIGHTS
//     var lights = [];
//     lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
//     lights[1] = new THREE.PointLight(0xffffff, 1, 0);
//     lights[2] = new THREE.PointLight(0xffffff, 1, 0);
//     lights[0].position.set(0, 200, 0);
//     lights[1].position.set(100, 200, 100);
//     lights[2].position.set(-100, -200, -100);
//     this.scene.add(lights[0]);
//     this.scene.add(lights[1]);
//     this.scene.add(lights[2]);

//     LoadeRoom(this.scene, 200, 200, 200);
//     LoadeObj(
//       this.scene,
//       "bed",
//       { x: 0.25, y: 0.2, z: 0.25 },
//       { x: -60, y: 0, z: 60 },
//       "Preview Image.jpg"
//     );
//     LoadeObj(
//       this.scene,
//       "armchair",
//       { x: 0.25, y: 0.2, z: 0.25 },
//       { x: -50, y: 0, z: 70 }
//     );
//     LoadeObj(
//       this.scene,
//       "freedom",
//       { x: 0.15, y: 0.1, z: 0.15 },
//       { x: -60, y: 0, z: 100 },
//       "skydome.jpeg"
//     );
//     LoadeObj(
//       this.scene,
//       "hospital_folding_table",
//       { x: 0.35, y: 0.3, z: 0.35 },
//       { x: 60, y: 0, z: 60 }
//     );
//     LoadeObj(
//       this.scene,
//       "medicineBottle",
//       { x: 1.25, y: 1.2, z: 1.25 },
//       { x: 60, y: 0, z: 60 }
//     );

//     this.renderScene();
//     //start animation
//     this.start();
//   }

//   addRoom() {
//     // -----Step 1--------
//     const geometry = new THREE.BoxGeometry(5, 5, 5);
//     const material = new THREE.MeshBasicMaterial({
//       color: "#0F0",
//     });
//     this.cube = new THREE.Mesh(geometry, material);
//     new THREE.TextureLoader().load(
//       "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//       (texture) => {
//         //Update Texture
//         this.cube.material.map = texture;
//         this.cube.material.needsUpdate = true;
//       },
//       (xhr) => {
//         //Download Progress
//         console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//       },
//       (error) => {
//         //Error CallBack
//         console.log("An error happened" + error);
//       }
//     );
//     // this.scene.add(this.cube);
//   }

//   addModels() {
//     // -----Step 4--------
//     //Loading 3d Models
//     //Loading Material First
//     const mtlLoader = new MTLLoader();
//     mtlLoader.setBaseUrl("./assets/");
//     mtlLoader.load("freedom.png", (materials) => {
//       materials.preload();
//       console.log("Material loaded");
//       //Load Object Now and Set Material
//       const objLoader = new OBJLoader();
//       objLoader.setMaterials(materials);
//       objLoader.load(
//         "./assets/bed.obj",
//         (bed) => {
//           bed.scale.set(0.25, 0.2, 0.25);
//           bed.rotation.y = -Math.PI;
//           const bed1 = bed;
//           bed1.position.set(-60, 0, 60);
//           this.scene.add(bed1);
//         },
//         (xhr) => {
//           console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//         },
//         // called when loading has errors
//         (error) => {
//           console.log("An error happened" + error);
//         }
//       );
//       objLoader.load(
//         "./assets/bed.obj",
//         (bed) => {
//           bed.scale.set(0.25, 0.2, 0.25);
//           bed.rotation.y = -Math.PI;
//           const bed1 = bed;
//           bed1.position.set(-60, 0, 40);
//           this.scene.add(bed1);
//         },
//         (xhr) => {
//           console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//         },
//         // called when loading has errors
//         (error) => {
//           console.log("An error happened" + error);
//         }
//       );
//     });
//   }

//   componentWillUnmount() {
//     this.stop();
//     this.mount.removeChild(this.renderer.domElement);
//   }
//   start = () => {
//     if (!this.frameId) {
//       this.frameId = requestAnimationFrame(this.animate);
//     }
//   };
//   stop = () => {
//     cancelAnimationFrame(this.frameId);
//   };
//   animate = () => {
//     // -----Step 3--------
//     //Rotate Models
//     if (this.cube) this.cube.rotation.y += 0.01;
//     // if (this.bed1) this.bed1.rotation.y += 0.01;

//     this.renderScene();
//     this.frameId = window.requestAnimationFrame(this.animate);
//   };
//   renderScene = () => {
//     if (this.renderer) this.renderer.render(this.scene, this.camera);
//   };

//   render() {
//     return (
//       <div
//         style={{ width: "100vw", height: "100vh" }}
//         ref={(mount) => {
//           this.mount = mount;
//         }}
//       >
//         {/* <Object3D rotation={{ y: Math.PI }}>
//       {this.props.children}
//     </Object3D> */}
//       </div>
//     );
//   }
// }
// export default Room;
