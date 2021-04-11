import React, { Component } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const LoadeRoom = (scene, width = 150, long = 150, height = 150) => {
  //make floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(width, long, 10, 10),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
    })
  );
  floor.rotation.x = -Math.PI / 2;

  //make walls
  // wall1
  const wall1 = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height, 10, 10),
    new THREE.MeshStandardMaterial({
      color: "red",
      side: THREE.DoubleSide,
    })
  );
  wall1.rotation.x = 0;
  wall1.position.set(0, height / 2, long / -2);

  // wall2
  const wall2 = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height, 10, 10),
    new THREE.MeshStandardMaterial({
      color: "green",
      side: THREE.DoubleSide,
    })
  );
  wall2.rotation.x = 0;
  wall2.position.set(0, height / 2, long / 2);

  // wall3
  const wall3 = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height, 10, 10),
    new THREE.MeshStandardMaterial({
      color: "blue",
      side: THREE.DoubleSide,
    })
  );
  wall3.rotation.y = -Math.PI / 2;
  wall3.position.set(width / 2, height / 2, 0);

  // wall4
  const wall4 = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height, 10, 10),
    new THREE.MeshStandardMaterial({
      color: "pink",
      side: THREE.DoubleSide,
    })
  );
  wall4.rotation.y = -Math.PI / 2;
  wall4.position.set(width / -2, height / 2, 0);

  scene.add(floor, wall1, wall2, wall3, wall4);

  // -----Step 2--------
  //LOAD TEXTURE and on completion apply it on SPHERE
};

export default LoadeRoom;
