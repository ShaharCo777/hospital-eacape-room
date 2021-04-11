import React, { Component } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";

import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";

import LoadeObj from "./LoadeObj";
import LoadeRoom from "./LoadeRoom";

class Room extends Component {
  componentDidMount() {
    this.initScene();
    this.setUpControls();

    //LIGHTS
    var lights = [];
    lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

    LoadeRoom(this.scene, 200, 200, 200);
    LoadeObj(
      this.scene,
      "bed",
      { x: 0.5, y: 0.35, z: 0.5 },
      { x: 60, y: 0, z: 60 },
      "Preview Image.jpg"
    );
    LoadeObj(
      this.scene,
      "bed",
      { x: 0.5, y: 0.35, z: 0.5 },
      { x: -30, y: 0, z: 60 },
      "Preview Image.jpg"
    );
    LoadeObj(
      this.scene,
      "table_drawers1",
      { x: 0.8, y: 0.8, z: 0.5 },
      { x: 15, y: 0, z: 80 },
      null,
      "obj",
      "left"
    );
    LoadeObj(
      this.scene,
      "freedom",
      { x: 0.15, y: 0.1, z: 0.15 },
      { x: 26, y: 23, z: 80 },
      "skydome.jpeg",
      "obj",
      "left"
    );
    LoadeObj(
      this.scene,
      "medicineBottle",
      { x: 2.25, y: 2.2, z: 2.25 },
      { x: 15, y: 28, z: 80 },
      null,
      "obj",
      "left"
    );
    LoadeObj(
      this.scene,
      "door_low02",
      { x: 0.27, y: 0.27, z: 0.3 },
      { x: -60, y: 0, z: -100 },
      null,
      "obj",
      "front"
    );
    LoadeObj(
      this.scene,
      "hospital_folding_table",
      { x: 0.7, y: 0.4, z: 0.35 },
      { x: 0, y: 20, z: -80 },
      "skydome.jpeg",
      "obj",
      "left"
    );
    LoadeObj(
      this.scene,
      "sofa",
      { x: 0.8, y: 0.6, z: 0.7 },
      { x: 80, y: 13, z: -60 },
      "skydome.jpeg",
      "obj",
      "front"
    );
    LoadeObj(
      this.scene,
      "skeletons",
      { x: 0.08, y: 0.08, z: 0.08 },
      { x: 0, y: 10, z: 40 },
      "Preview Image.jpg",
      "obj",
      "left"
    );
    LoadeObj(
      this.scene,
      "Covid19",
      { x: 8, y: 8, z: 8 },
      { x: 0, y: 120, z: 0 },
      "skydome.jpeg",
      "obj"
    );
    LoadeObj(
      this.scene,
      "wheel-chair",
      { x: 1.45, y: 1, z: 1.45 },
      { x: -70, y: 0, z: 80 },
      null,
      "obj",
      "back"
    );

    this.buttonRef.addEventListener("click", () => {
      this.controls.lock();
    });
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    window.addEventListener("resize", this.resizeWindowHandler);
    this.animate();
  }

  //Setting up the Scene

  initScene = () => {
    this.scene = new THREE.Scene();

    //add Camera
    const fov = 70;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 1000.0;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(10, 40, -30);
    this.camera.lookAt(0, 50, 150);

    // this.camera.position.z = 9;

    //Add Renderer
    // const width = this.mount.clientWidth;
    // const height = this.mount.clientHeight;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // this.renderer.setClearColor("#263238");

    // this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.mountRef.appendChild(this.renderer.domElement);
  };

  //Setting Up First Person Controls
  setUpControls = () => {
    this.controls = new PointerLockControls(this.camera, document.body);
    this.controls.addEventListener("lock", () => {
      this.buttonRef.style.opacity = "0";
      this.buttonRef.style.pointerEvents = "none";
    });
    this.controls.addEventListener("unlock", () => {
      this.buttonRef.style.opacity = "1";
      this.buttonRef.style.pointerEvents = "all";
    });

    //Helper for Key Camera Movements
    this.raycaster = new THREE.Raycaster(
      new THREE.Vector3(),
      new THREE.Vector3(0, -1, 0),
      0,
      10
    );
    this.objects = [];
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;
    this.prevTime = performance.now();
    this.velocity = new THREE.Vector3();
    this.direction = new THREE.Vector3();
  };

  resizeWindowHandler = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  //Adding the Per Frame Rendering
  animate = () => {
    requestAnimationFrame(this.animate);
    this.playerMovment();
    this.renderer.render(this.scene, this.camera);
  };

  onKeyDown = (event) => {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = true;

        break;

      case 37: // left
      case 65: // a
        this.moveLeft = true;
        break;

      case 40: // down
      case 83: // s
        this.moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        this.moveRight = true;
        break;

      default:
        return;
    }
  };

  onKeyUp = (event) => {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = false;
        break;

      case 37: // left
      case 65: // a
        this.moveLeft = false;
        break;

      case 40: // down
      case 83: // s
        this.moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        this.moveRight = false;
        break;

      default:
        return;
    }
  };

  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );

  addModels() {
    //Loading 3d Models
    const mtlLoader = new MTLLoader();
    mtlLoader.setBaseUrl("./assets/");
    mtlLoader.load("freedom.png", (materials) => {
      materials.preload();
      console.log("Material loaded");
      //Load Object Now and Set Material
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(
        "./assets/bed.obj",
        (bed) => {
          bed.scale.set(0.25, 0.2, 0.25);
          bed.rotation.y = -Math.PI;
          const bed1 = bed;
          bed1.position.set(-60, 0, 60);
          this.scene.add(bed1);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        (error) => {
          console.log("An error happened" + error);
        }
      );
      objLoader.load(
        "./assets/bed.obj",
        (bed) => {
          bed.scale.set(0.25, 0.2, 0.25);
          bed.rotation.y = -Math.PI;
          const bed1 = bed;
          bed1.position.set(-60, 0, 40);
          this.scene.add(bed1);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        (error) => {
          console.log("An error happened" + error);
        }
      );
    });
  }

  playerMovment = () => {
    if (this.controls.isLocked === true) {
      this.raycaster.ray.origin.copy(this.controls.getObject().position);
      console.log(this.controls.getObject().position);

      // this.raycaster.ray.origin.y -= 10;

      var intersections = this.raycaster.intersectObjects(this.objects, true);
      var onObject = intersections.length > 0;

      let time = performance.now();
      let delta = (time - this.prevTime) / 1000;

      this.velocity.x -= this.velocity.x * 10.0 * delta;
      this.velocity.z -= this.velocity.z * 10.0 * delta;
      this.velocity.y -= 9.8 * 100 * delta;

      this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
      this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
      this.direction.normalize();

      if (onObject === true) {
        this.velocity.y = Math.max(0, this.velocity.y);
      }

      if (this.moveForward || this.moveBackward)
        this.velocity.z -= this.direction.z * 150.0 * delta;

      if (this.moveLeft || this.moveRight)
        this.velocity.x -= this.direction.x * 150.0 * delta;

      //To Stop Controls from moving out in Z direction
      if (this.controls.getObject().position.z > 25) {
        this.controls.getObject().position.z = 25;
      } else if (this.controls.getObject().position.z < -24) {
        this.controls.getObject().position.z = -24;
      }

      // To stop controls from moving out in X direction
      if (this.controls.getObject().position.x > 25) {
        this.controls.getObject().position.x = 25;
      } else if (this.controls.getObject().position.x < -25) {
        this.controls.getObject().position.x = -25;
      }

      this.controls.moveForward(-this.velocity.z * delta);
      this.controls.moveRight(-this.velocity.x * delta);
      // this.controls.getObject().position.y += this.velocity.y * delta;

      if (this.controls.getObject().position.y < 10) {
        this.velocity.y = 0;
        // this.controls.getObject().position.y = 0;
      }

      this.prevTime = time;
    }
  };

  //Cleaning up
  componentWillMount() {
    window.removeEventListener("resize", this.resizeWindowHandler);
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <>
        <button
          className="btn"
          type="button"
          ref={(ref) => (this.buttonRef = ref)}
        >
          Start The Game
        </button>
        <div
          style={{ width: "100vw", height: "100vh" }}
          ref={(ref) => (this.mountRef = ref)}
        ></div>
      </>
    );
  }
}
export default Room;
