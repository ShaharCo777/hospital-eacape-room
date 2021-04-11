import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const LoadeObj = (
  scene,
  objName,
  scale = {
    x: 0.1,
    y: 0.1,
    z: 0.1,
  },
  position = {
    x: 0,
    y: 0,
    z: 0,
  },
  background = null,
  type = "obj",
  der = "front"
) => {
  const texture = background
    ? new THREE.TextureLoader().load(`/assets/${background}`)
    : null;
  const lambert = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    map: texture,
  });

  const objLoader = type === "obj" ? new OBJLoader() : new GLTFLoader();
  let routeY = -Math.PI / 2;
  if (der !== "front") {
    if (der !== "back")
      der === "left" ? (routeY = Math.PI) : (routeY = -Math.PI);
    else {
      routeY = Math.PI / 2;
    }
  }
  objLoader.setPath("./assets/");
  objLoader.load(
    `${objName}.${type}`,
    (obj) => {
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = lambert;
        }
        obj.scale.set(scale.x, scale.y, scale.z);
        obj.rotation.y = routeY;
        obj.position.set(position.x, position.y, position.z);
      });
      scene.add(obj);
    },
    (xhr) => {
      //Download Progress
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      //Error CallBack
      console.log("An error happened" + error);
    }
  );

  //   mtlLoader.setBaseUrl("./assets/");
  //   mtlLoader.load("skydome.jpeg", (materials) => {
  //     materials.preload();
  //     console.log("Material loaded");
  //     //Load Object Now and Set Material

  //         const texture = new THREE.TextureLoader().load(
  //           "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  //           (texture) => {
  //             //Update Texture
  //             // obj.material.map = texture;
  //             // obj.material.needsUpdate = true;
  //             console.log(texture);
  //             return texture;
  //           },
  //   (xhr) => {
  //     //Download Progress
  //     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  //   },
  //   (error) => {
  //     //Error CallBack
  //     console.log("An error happened" + error);
  //   }
  // );
};

export default LoadeObj;
