import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

document.body.appendChild(
  renderer.domElement
);

const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

camera.position.set(
  10,
  8,
  12
);

camera.lookAt(0, 0, 0);

// ライト
const light = new THREE.PointLight(
  0xffffff,
  300,
  100
);

light.position.set(
  5,
  8,
  5
);

scene.add(light);

const ambientLight =
  new THREE.AmbientLight(
    0xffffff,
    2
  );

scene.add(ambientLight);

// 床
const planeGeo =
  new THREE.PlaneGeometry(
    20,
    20,
    30,
    30
  );

const planeMat =
  new THREE.MeshBasicMaterial({
    color: 0x666600,
    wireframe: true
  });

const plane =
  new THREE.Mesh(
    planeGeo,
    planeMat
  );

plane.rotation.x =
  -Math.PI / 2;

scene.add(plane);

// 車輪クラス
class Wheel extends THREE.Object3D {

  constructor(
    radius,
    width,
    color,
    x,
    y,
    z
  ) {

    super();

    const geometry =
      new THREE.CylinderGeometry(
        radius,
        radius,
        width,
        16
      );

    const material =
      new THREE.MeshPhongMaterial({
        color: color,
        wireframe: true
      });

    this.mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    this.mesh.rotation.x =
      Math.PI / 2;

    this.position.set(
      x,
      y,
      z
    );

    this.add(this.mesh);
  }

  rotateWheel(speed) {
    this.rotation.z += speed;
  }

}
// ToyTrainクラス
class ToyTrain extends THREE.Group {

  constructor(color) {

    super();

    const body =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          1,
          1,
          4,
          16
        ),
        new THREE.MeshPhongMaterial({
          color: color,
          wireframe: true
        })
      );

    body.rotation.z =
      Math.PI / 2;

    body.position.set(
      0,
      1,
      0
    );

    this.add(body);

    const cabin =
      new THREE.Mesh(
        new THREE.BoxGeometry(
          2,
          3,
          2
        ),
        new THREE.MeshPhongMaterial({
          color: color,
          wireframe: true
        })
      );

    cabin.position.set(
      2,
      2,
      0
    );

    this.add(cabin);

    const chimney =
      new THREE.Mesh(
        new THREE.CylinderGeometry(
          0.3,
          0.3,
          1,
          16
        ),
        new THREE.MeshPhongMaterial({
          color: color,
          wireframe: true
        })
      );

    chimney.position.set(
      -1.5,
      2.2,
      0
    );

    this.add(chimney);

    this.wheels = [];

    const wheel1 =
      new Wheel(
        0.9,
        0.3,
        0xff0000,
        2.0,
        1.0,
        -1.1
      );

    const wheel2 =
      new Wheel(
        0.9,
        0.3,
        0xff0000,
        2.0,
        1.0,
        1.1
      );

    const wheel3 =
      new Wheel(
        0.55,
        0.25,
        0xffff00,
        -1.0,
        0.45,
        -1.1
      );

    const wheel4 =
      new Wheel(
        0.55,
        0.25,
        0xffff00,
        0.2,
        0.45,
        -1.1
      );

    const wheel5 =
      new Wheel(
        0.55,
        0.25,
        0xffff00,
        -1.0,
        0.45,
        1.1
      );

    const wheel6 =
      new Wheel(
        0.55,
        0.25,
        0xffff00,
        0.2,
        0.45,
        1.1
      );

    this.add(wheel1);
    this.add(wheel2);
    this.add(wheel3);
    this.add(wheel4);
    this.add(wheel5);
    this.add(wheel6);

    this.wheels.push(
      wheel1,
      wheel2,
      wheel3,
      wheel4,
      wheel5,
      wheel6
    );

    const customPivot =
      new THREE.Vector3(
        2.0,
        0,
        0
      );

    this.children.forEach(
      (child) => {
        child.position.sub(
          customPivot
        );
      }
    );
  }

  update() {

    this.rotation.y +=
      0.01;

    this.wheels.forEach(
      (wheel) => {
        wheel.rotateWheel(
          0.05
        );
      }
    );

  }

}

// 5台生成
const train1 =
  new ToyTrain(
    0x00ff00
  );

const train2 =
  new ToyTrain(
    0x00ffff
  );

const train3 =
  new ToyTrain(
    0xff00ff
  );

const train4 =
  new ToyTrain(
    0xff8800
  );

const train5 =
  new ToyTrain(
    0xffffff
  );

train1.position.set(
  0,
  0,
  0
);

train2.position.set(
  4,
  0,
  4
);

train3.position.set(
  -4,
  0,
  4
);

train4.position.set(
  4,
  0,
  -4
);

train5.position.set(
  -4,
  0,
  -4
);

scene.add(train1);
scene.add(train2);
scene.add(train3);
scene.add(train4);
scene.add(train5);

function animate() {

  requestAnimationFrame(
    animate
  );

  train1.update();
  train2.update();
  train3.update();
  train4.update();
  train5.update();

  controls.update();

  renderer.render(
    scene,
    camera
  );

}

animate();

window.addEventListener(
  "resize",
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

  }
);